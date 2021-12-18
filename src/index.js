"use strict";

require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Knex = require("knex");

const KnexConfig = require("../knexfile");
const UsersRepository = require("./repositories/users");

const initUsersRoutes = require("./routes/users");

const init = async () => {

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0"
  });

  const connection = Knex(KnexConfig);
  const usersRepository = UsersRepository(connection);

  initUsersRoutes(server, usersRepository);

  await server.start();
  console.log("Server running on", server.info.uri);
};

process.on("unhandledRejection", (err) => {

  console.log(err);
  process.exit(1);
});

init();
