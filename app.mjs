import express from "express";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import logger from "morgan";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

import { config } from "dotenv";

import path from "node:path";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

config();

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  const liveReloadServer = livereload.createServer({
    exts: ["html", "css", "js", "hbs"],
  });

  liveReloadServer.watch([
    path.join(__dirname, "public"),
    path.join(__dirname, "views"),
  ]);

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
}

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
