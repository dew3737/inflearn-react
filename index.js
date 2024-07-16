const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
require("dotenv").config();
const mongoUri = process.env.REACT_APP_MONGOURI;
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 안녕");
});

app.post("/register", async (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client 가져오면
  // 데이터 베이스에 넣어준다.

  try {
    const user = new User(req.body);
    const userInfo = await user.save();
    res.status(200).json({ success: true, userInfo });
  } catch (err) {
    res.json({ success: false, err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
