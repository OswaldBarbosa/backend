const express = require("express");
const dotenv = require("dotenv");
const taskRoutes = require("./src/routes/taskRoutes.js");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://frontend-production-5d8c.up.railway.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

module.exports = app;