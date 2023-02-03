const {Song, Singer, Genre} = require("../models/models");
const ApiError = require("../error/ApiError");
const Sequelize = require("sequelize");

class SongController {
  async getAll(req, res, next) {
    const {singerId, genreId, year, sort, page, count} = req.query;
    const paramQuerySQL = {};
    let limit = 10;
    let offset = 0;

    // filtering - [singerId]
    paramQuerySQL.where = {};
    if (singerId) {
      paramQuerySQL.where.singerId = singerId;
    }

    if (genreId) {
      paramQuerySQL.where.genreId = genreId;
    }

    if (year) {
      paramQuerySQL.where.year = year;
    }

    // sorting
    if (sort !== "" && typeof sort !== "undefined") {
      let query;
      let words = sort.split(" ");
      if (words[1] !== "DESC") {
        if (words[0] == "singerName") {
          query = [["singer", "name", "ASC"]];
        }
        if (words[0] == "genreName") {
          query = [["genre", "name", "ASC"]];
        }
        if (words[0] == "name") {
          query = [["name", "ASC"]];
        }
        if (words[0] == "year") {
          query = [["year", "ASC"]];
        }
        if (words[0] == "id") {
          query = [["id", "ASC"]];
        }
      } else {
        if (words[0] == "singerName") {
          query = [["singer", "name", "DESC"]];
        }

        if (words[0] == "genreName") {
          query = [["genre", "name", "DESC"]];
        }
        if (words[0] == "name") {
          query = [["name", "DESC"]];
        }
        if (words[0] == "year") {
          query = [["year", "DESC"]];
        }
        if (words[0] == "id") {
          query = [["id", "DESC"]];
        }
      }

      paramQuerySQL.order = query;
    }

    // pagination
    if (page && count) {
      limit = count;
      offset = (page - 1) * limit;
      paramQuerySQL.limit = limit;
      paramQuerySQL.offset = offset;
    } else {
      paramQuerySQL.limit = limit;
      paramQuerySQL.offset = offset;
    }

    try {
      let songs = await Song.findAll({
        include: [
          {
            model: Singer,
            as: "singer",
            attributes: ["id", "name"],
          },
          {
            model: Genre,
            as: "genre",
            attributes: ["id", "name"],
          },
        ],
        attributes: ["id", "name", "year"],
        ...paramQuerySQL,
      });

      let metadata = {};
      metadata.sort = sort;
      metadata.pagination = {
        totalPages: 1000,
        currentPage: 1,
        count: limit,
      };

      return res.json({songs, metadata});
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async create(req, res) {
    const {name, year, singerId, genreId} = req.body;
    const song = await Song.create({name, year, singerId, genreId});
    return res.json(song);
  }

  async getYears(req, res) {
    const years = await Song.findAll({
      order: [["year", "ASC"]],
      attributes: [Sequelize.fn("DISTINCT", Sequelize.col("year")), "year"],
    });
    return res.json(years);
  }
}

module.exports = new SongController();
