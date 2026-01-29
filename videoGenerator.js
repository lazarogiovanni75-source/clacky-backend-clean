import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/generate/video", async (req, res) => {
  const { prompt } = req.body;

  // 1. Start video job
  const genResponse = await fetch("https://api.defapi.org/api/sora2/gen", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DEFAPI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt })
  });

  const genData = await genResponse.json();
  const taskId = genData.task_id;

  // 2. Poll for completion
  let videoData;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 3000)); // wait 3 seconds
    const statusResponse = await fetch(`https://api.defapi.org/api/task/query?task_id=${taskId}`, {
      headers: { "Authorization": `Bearer ${process.env.DEFAPI_KEY}` }
    });
    const statusData = await statusResponse.json();
    if (statusData.status === "success") {
      videoData = statusData;
      break;
    }
  }

  if (!videoData) return res.status(500).json({ error: "Video generation failed or timed out." });

  // 3. Return video URL to frontend
  res.json({ video_url: videoData.video_url });
});

export default app;
