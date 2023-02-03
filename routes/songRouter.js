const Router = require("express");
const router = new Router();
const songController = require("../controllers/songController");

router.get("/", songController.getAll);
router.post("/", songController.create);
router.get("/years", songController.getYears);

module.exports = router;
