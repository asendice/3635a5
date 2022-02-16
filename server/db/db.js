const Sequelize = require("sequelize");
require('dotenv').config();
const db = new Sequelize(process.env.DATABASE_URL || process.env.LOCAL_URL, {
  logging: false
});

module.exports = db;
