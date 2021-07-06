const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// require("dotenv").config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const { sequelize } = require("./models");

const app = express();
sequelize.sync();

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: 10,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", 3000);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(10));
app.use(sessionMiddleware);

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

// webSocket(server, app);
// sse(server);
