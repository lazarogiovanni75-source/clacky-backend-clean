import express from "express";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Clacky backend is alive");
});

const PORT = process.env.PORT || 3000;
app.post('/chat', (req, res) => {
  const { message, userId } = req.body;

  console.log('Incoming chat:', message, 'from', userId);
  res.json({
    reply: `Server received your message: "${message}"`
  });
});
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
