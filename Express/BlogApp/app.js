require("dotenv").config();
const express = require("express");
require("./config/database").connect();
const app = express();
const blogRouter = require("./Routes/BlogRoutes.js");

// middleware
app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;
