import express from "express";

const router = express.Router();

// Temporary in-memory storage for approvals
const approvals = {}; // key: draftId, value: { draft, status }

// Create a new approval entry
router.post("/create", (req, res) => {
  const { draftId, draftText } = req.body;
  if (!draftId || !draftText) {
    return res.status(400).json({ error: "draftId and draftText are required" });
  }

  approvals[draftId] = { draft: draftText, status: "pending" };
  res.json({ message: "Draft submitted for approval", draftId });
});

// Approve a draft
router.post("/approve", (req, res) => {
  const { draftId } = req.body;
  if (!approvals[draftId]) {
    return res.status(404).json({ error: "Draft not found" });
  }

  approvals[draftId].status = "approved";
  res.json({ message: "Draft approved", draftId });
});

// Reject a draft
router.post("/reject", (req, res) => {
  const { draftId } = req.body;
  if (!approvals[draftId]) {
    return res.status(404).json({ error: "Draft not found" });
  }

  approvals[draftId].status = "rejected";
  res.json({ message: "Draft rejected", draftId });
});

// Check draft status
router.get("/status/:draftId", (req, res) => {
  const draft = approvals[req.params.draftId];
  if (!draft) {
    return res.status(404).json({ error: "Draft not found" });
  }
  res.json(draft);
});

export default router;
