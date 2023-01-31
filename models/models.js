const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const Singer = sequelize.define("singer", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true},
});

const Genre = sequelize.define("genre", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true},
});

const Song = sequelize.define("song", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true},
  year: {type: DataTypes.INTEGER, allowNull: false},
});

Singer.hasMany(Song);
Song.belongsTo(Singer);

Genre.hasMany(Song);
Song.belongsTo(Genre);

module.exports = {
  Singer,
  Genre,
  Song,
};
