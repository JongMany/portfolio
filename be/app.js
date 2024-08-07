var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();

/* Swagger */
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerJsdocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    // servers: [
    //   {
    //     url: "http://localhost:3000",
    //   },
    // ],
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const openAPISpecification = swaggerJsdoc(swaggerJsdocOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openAPISpecification));

/* CORS 설정 */
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* Route */
app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api", require("./routes/api"));
app.use("/api/projects", require("./routes/projects"));

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

module.exports = app;
