"use strict";

const PeopleHandlers = require("../../handlers/people");

module.exports = (server, peopleRepository, presentsRepository) => {

  const handlers = PeopleHandlers(peopleRepository, presentsRepository);
  server.route({
    method: "GET",
    path: "/users/{id}/friends",
    handler: handlers.getAllUsersFriends
  });

  server.route({
    method: "POST",
    path: "/users/{id}/friends",
    handler: handlers.addFriendToTheUser
  });

  server.route({
    method: "DELETE",
    path: "/users/friends/{id}",
    handler: handlers.removeFriend
  });

  server.route({
    method: "POST",
    path: "/users/friends/{id}/presents",
    handler: handlers.addPresent
  });

  server.route({
    method: "GET",
    path: "/users/friends/{id}/presents",
    handler: handlers.getAllPresents
  });
};
