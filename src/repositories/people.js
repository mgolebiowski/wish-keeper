"use strict";

module.exports = function PeopleRepository(conn) {

  return ({
    getAllUsersFriends: (userId) => conn("People").where("userId", userId),
    addFriendToTheUser: (userId, name) => conn("People").insert({ userId, name })
  });
};
