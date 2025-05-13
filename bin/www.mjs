import { config } from "dotenv";
import debug from "debug";
import http from "http";

import app from "../app.mjs";

config();

debug.enable(process.env.DEBUG);
const log = debug("express-bootstrap:server");

const DEFAULT_PORT = 3000;

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || DEFAULT_PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false. */

function normalizePort(val) {
  let port = Number(val);

  if (Number.isNaN(port)) {
    log("Invalid port: " + port);

    return DEFAULT_PORT;
  }

  if (port < 0) {
    log("Invalid port: " + port);

    return DEFAULT_PORT;
  }

  return port;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") throw error;

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  const actionByErrorCode = {
    EACCES: () => log(bind + " requires elevated privileges"),
    EADDRINUSE: () => log(bind + " is already in use"),
  };

  const action = actionByErrorCode[error.code];

  if (!action) throw error;

  action();
  process.exit(1);
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  log("Listening on " + bind);
}
