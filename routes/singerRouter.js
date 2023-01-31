const Router = require("express");
const router = new Router();
const singerController = require("../controllers/singerController");

router.get("/", singerController.getAll);
router.post("/", singerController.create);

module.exports = router;
