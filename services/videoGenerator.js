import axios from "axios";

const DEFAPI_BASE = process.env.DEFAPI_BASE;
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

  return response.data;
}

export async function getVideoStatus(jobId) {
  const response = await axios.get(
    `${DEFAPI_BASE}/api/sora2/status/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${DEFAPI_KEY}`
      }
    }
  );

  return response.data;
}
