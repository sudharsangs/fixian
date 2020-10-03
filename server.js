const express = require("express");
const mongoose = require("mongoose");
const FakeDb = require("./fake-db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const users = require("./routes/users");
// const profile = require("./routes/api/profile");
const stores = require("./routes/stores");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
  })
  .catch(err => {
    console.log("mongoose", err);
  });

//Use Routes
app.use("/api/users", users);
app.use("/api/stores", stores);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use((error, request, response, next) => {
  response.status(500).json({
    errors: [{ detail: error }]
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
