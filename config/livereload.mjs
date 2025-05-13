import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import livereload from "livereload";
import connectLiveReload from "connect-livereload";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rootDirname = __dirname.split("/").slice(0, -1).join("/");

export function initLivereload(app) {
  if (process.env.NODE_ENV !== "development") return;

  const liveReloadServer = livereload.createServer({
    exts: ["html", "css", "js", "hbs"],
  });

  liveReloadServer.watch([
    path.join(rootDirname, "public"),
    path.join(rootDirname, "views"),
  ]);

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
}
