const Router = require("express");
const router = new Router();
const songRouter = require("./songRouter");
const singerRouter = require("./singerRouter");
const genreRouter = require("./genreRouter");

router.use("/song", songRouter);
router.use("/singer", singerRouter);
router.use("/genre", genreRouter);

module.exports = router;
