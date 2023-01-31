const Router = require("express");
const router = new Router();
const genreController = require("../controllers/genreController");

router.get("/", genreController.getAll);
router.post("/", genreController.create);

module.exports = router;
