"use strict";

require("dotenv").config();

const CONNECTION_URL = `${process.env.DB_URL}/${process.env.DB_NAME}`;

module.exports = {
  client: "pg",
  connection: CONNECTION_URL,
  migrations: {
    tableName: "knex_migrations"
  }
};
