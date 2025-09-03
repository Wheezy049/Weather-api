require("dotenv").config();
const express = require("express");
const weatherRouter = require("./routes/weather");
const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/weather", weatherRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
