import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import logger from "morgan";

import { config } from "dotenv";

import { initLivereload } from "./config/livereload.mjs";

import indexRouter from "./routes/index.mjs";
import usersRouter from "./routes/users.mjs";

config();

let app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// view engine setup
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

initLivereload(app);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
