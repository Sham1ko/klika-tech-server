const {Singer} = require("../models/models");
const ApiError = require("../error/ApiError");
class SingerController {
  async getAll(req, res) {
    const singers = await Singer.findAll();
    return res.json(singers);
  }

  async create(req, res) {
    const {name} = req.body;
    const singer = await Singer.create({name});
    return res.json(singer);
  }
}

module.exports = new SingerController();
