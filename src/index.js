"use strict";

require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Knex = require("knex");

const KnexConfig = require("../knexfile");
const UsersRepository = require("./repositories/users");

const init = async () => {

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0"
  });

  const connection = Knex(KnexConfig);
  const usersRepository = UsersRepository(connection);

  server.route({
    method: "GET",
    path: "/users/{id}",
    handler: async (req, h) => {

      const result = await usersRepository.getUser(req.params.id);
      return JSON.stringify(result);
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {

  console.log(err);
  process.exit(1);
});

init();
