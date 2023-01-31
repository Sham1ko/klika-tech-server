const {Genre} = require("../models/models");
const ApiError = require("../error/ApiError");
class genreController {
  async getAll(req, res) {
    const genres = await Genre.findAll();
    return res.json(genres);
  }

  async create(req, res) {
    const {name} = req.body;
    const genre = await Genre.create({name});
    return res.json(genre);
  }
}

module.exports = new genreController();
