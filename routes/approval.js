import express from "express";

const router = express.Router();

router.get("/approval/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
