const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();

const redisClient = require("../utility/redis.utility");
const indexRouter = require("../src/routes/index");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);


app.get("/api", (req, res) => {
  res.json({
    message: "🚀 API aktif di Vercel!",
    env: process.env.NODE_ENV,
  });
});

// ❌ Jangan import Redis lagi di sini
// Redis client sudah auto connect di utility

module.exports = app;
