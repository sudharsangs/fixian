const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
