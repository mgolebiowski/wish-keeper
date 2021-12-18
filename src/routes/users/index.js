"use strict";

const UsersHandlers = require("../../handlers/users");

module.exports = (server, usersRepository) => {

  const handlers = UsersHandlers(usersRepository);
  server.route({
    method: "GET",
    path: "/users/{id}",
    handler: handlers.getUser
  });

  server.route({
    method: "POST",
    path: "/users/new",
    handler: handlers.getAllUsers
  });
};
