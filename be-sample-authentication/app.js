
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const http = require("http"); 


process.env.DOTENV_SILENT = 'true';
require("dotenv").config();
console.log(`🌱 Environment loaded: ${process.env.NODE_ENV || "development"}`);
console.log(`🧩 DB_HOST: ${process.env.DB_HOST || "(not set)"}`);

// Routes & Config
const indexRouter = require("./src/routes/index");
const { urlValidation, handleErrors } = require("./error");

const app = express();

// === Middleware ===
const allowedOrigins = [
  "http://localhost:3000"
];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json()); // built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

// Error Handling
app.use(urlValidation);
app.use(handleErrors);

module.exports = app;
