var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//connect to local mongo db
const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://student001:OLbL89Fa1A3v6dGA@locallibrarycluster.lyfvtsg.mongodb.net/local_library?retryWrites=true&w=majority";

const mongoOptions = {
  user: "student001",
  pass: "fire#starter",
  authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connection is successful");
    }
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//path.join combines the pathways in the parameters into one url
//This example is saying to create the url localhost:<some number>/pulic
//...if you are using local host
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(9000);

module.exports = app;
