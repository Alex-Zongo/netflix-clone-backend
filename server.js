const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 5000;

const loginRouter = require("./routes/login");
app.use("/", loginRouter);
const registerRouter = require("./routes/register");
app.use("/", registerRouter);
const addtomylist = require("./routes/addtomylist");
app.use("/", addtomylist);
const getmylist = require("./routes/getmylist");
app.use("/", getmylist);

// port listening
app.listen(port, () => {
  console.log(`server listenning on port: ${port}`);
});
