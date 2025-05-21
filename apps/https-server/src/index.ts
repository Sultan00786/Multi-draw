import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Hellow World",
  });
});

const port = 8000;

app.listen(port, () => {
  console.log(`https-server running at port ${port}`);
});
