import axios from "axios";

const DEFAPI_BASE = "https://api.defapi.ai";
const DEFAPI_KEY = process.env.DEFAPI_KEY;

export async function startVideo(prompt) {
  const response = await axios.post(
    `${DEFAPI_BASE}/api/sora2/gen`,
    {
      prompt,
      hd: true
    },
    {
      headers: {
        Authorization: `Bearer ${DEFAPI_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data; // should include task_id / jobId
}

export async function getVideoStatus(jobId) {
  const response = await axios.get(
    `${DEFAPI_BASE}/api/task/query`,
    {
      params: { task_id: jobId },
      headers: {
        Authorization: `Bearer ${DEFAPI_KEY}`
      }
    }
  );

  return response.data;
}
