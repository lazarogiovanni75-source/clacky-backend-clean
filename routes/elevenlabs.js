import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Test endpoint
router.get("/test", async (req, res) => {
  try {
    // Minimal test to verify API key works
    const response = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
      },
    });
    const data = await response.json();
    res.json({ voices: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router; 