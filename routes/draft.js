
import express from "express";
import { generateDraft } from "../services/openai.js";
import axios from "axios";

const router = express.Router();

router.post("/create", async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.CLACKY_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const draftText = await generateDraft(req.body);

  const draftId = Date.now().toString();

  await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
    draftId,
    draftText
  });

  res.json({
    draftId,
    status: "pending_approval"
  });
});

export default router;
