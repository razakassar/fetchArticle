const express = require("express");
const articleRouter = express.Router();

const {
  authenticate
} = require("../controllers/authenticationController.js");

const {
  getArticles,
} = require("../controllers/articleController.js");

articleRouter.get("/", authenticate(), getArticles);

module.exports = articleRouter;
