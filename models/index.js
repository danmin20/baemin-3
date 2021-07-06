const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.sqlite",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, Sequelize);

module.exports = db;
