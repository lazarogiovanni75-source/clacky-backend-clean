import express from "express";
import axios from "axios";
import { startVideo, getVideoStatus } from "./services/videoGenerator.js";
import draftRoutes from "./routes/draft.js";
import approvalRoutes from "./routes/approval.js";

const app = express();
app.use(express.json());

// Video endpoints
app.post("/video/start", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await startVideo(prompt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/video/status/:jobId", async (req, res) => {
  try {
    const result = await getVideoStatus(req.params.jobId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Other routes
app.use("/draft", draftRoutes);
app.use("/approval", approvalRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Clacky backend is alive");
});

// Example chat endpoint
app.post('/chat', (req, res) => {
  const { message, userId } = req.body;
  console.log('Incoming chat:', message, 'from', userId);
  res.json({
    reply: `Server received your message: "${message}"`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
