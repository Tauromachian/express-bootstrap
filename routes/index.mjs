import { Router } from "express";

let router = Router();

/* GET home page. */
router.get("/", function (_, res) {
  res.render("index", { title: "Express" });
});

export default router;
