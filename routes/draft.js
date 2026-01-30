import express from "express";
import { generateDraft } from "../services/openai.js";

const router = express.Router();

// Generate a new draft
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const draft = await generateDraft(prompt);
    res.json({ draft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
