import express from "express";
import { startVideo, getVideoStatus } from "../services/videoGenerator.js";

const router = express.Router();

router.post("/start", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await startVideo(prompt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/status/:jobId", async (req, res) => {
  try {
    const result = await getVideoStatus(req.params.jobId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
