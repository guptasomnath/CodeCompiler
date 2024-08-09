const express = require("express");
const { ApiResponse } = require("./helper/ApiResponse");
const { compileCode } = require("./helper/compileCode");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/compile", async (req, res) => {
  const code = req.body.code || null;
  const pLanguageKey = req.body.type || null;
  
  if (!code) {
    return res
      .status(400)
      .json(ApiResponse(400, "Please write some code first"));
  }
  if (!pLanguageKey) {
    return res.status(400).json(ApiResponse(400, "select one language"));
  }

  try {
    await compileCode(code, pLanguageKey, res);
    return;
  } catch (error) {}

});

app.listen(3000, () => console.log("http://localhost:3000"));
