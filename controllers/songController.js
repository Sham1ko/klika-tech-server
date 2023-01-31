const {Song, Singer, Genre} = require("../models/models");
const ApiError = require("../error/ApiError");

class SongController {
  async getAll(req, res, next) {
    const {filter, sort, page} = req.query;
    const paramQuerySQL = {};
    let limit;
    let offset;

    // filtering - [category]
    if (filter !== "" && typeof filter !== "undefined") {
      const query = filter.category.split(",").map((item) => ({
        [Op.eq]: item,
      }));

      paramQuerySQL.where = {
        id_category: {[Op.or]: query},
      };
    }

    // sorting
    if (sort !== "" && typeof sort !== "undefined") {
      let query;
      if (sort.charAt(0) !== "-") {
        query = [[sort, "ASC"]];
      } else {
        query = [[sort.replace("-", ""), "DESC"]];
      }

      paramQuerySQL.order = query;
    }

    // pagination
    if (page !== "" && typeof page !== "undefined") {
      if (page.size !== "" && typeof page.size !== "undefined") {
        limit = page.size;
        paramQuerySQL.limit = limit;
      }

      if (page.number !== "" && typeof page.number !== "undefined") {
        offset = page.number * limit - limit;
        paramQuerySQL.offset = offset;
      }
    } else {
      limit = 25; // limit 25 item
      offset = 0;
      paramQuerySQL.limit = limit;
      paramQuerySQL.offset = offset;
    }

    try {
      let songs = await Song.findAll(
        {
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
        },
        paramQuerySQL
      );

      return res.json(songs);
    } catch (error) {
      next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res) {
    const {name, year, singerId, genreId} = req.body;
    const song = await Song.create({name, year, singerId, genreId});
    return res.json(song);
  }
}

module.exports = new SongController();
