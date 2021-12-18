"use strict";

require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Knex = require("knex");

const KnexConfig = require("../knexfile");
const UsersRepository = require("./repositories/users");

const initUsersRoutes = require("./routes/users");

const init = async () => {

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0"
  });

  await server.register(Jwt);

  server.auth.strategy("auth0-jwt-strategy", "jwt", {
    keys: {
      uri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,
      algorithms: [ "RS256" ]
    },
    verify: {
      aud: "wish-keeper-api",
      iss: process.env.AUTH_ISSUER,
      sub: false
    },
    validate: false
  });

  server.auth.default("auth0-jwt-strategy");

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
