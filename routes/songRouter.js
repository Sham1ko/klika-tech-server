const Router = require("express");
const router = new Router();
const songController = require("../controllers/songController");

router.get("/", songController.getAll);
router.post("/", songController.create);

module.exports = router;
