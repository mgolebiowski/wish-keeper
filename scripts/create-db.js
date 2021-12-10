"use strict";

const createDatabase = async function () {

  const config = require(process.cwd() + "/knexfile");

  const knex = require("knex")(config);

  await knex.raw(`CREATE DATABASE ${process.env.DB_NAME}`);
  await knex.destroy();
};

createDatabase();
