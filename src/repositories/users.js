"use strict";

module.exports = function UsersRepository(conn) {

  return ({
    getAllUsers: () => conn.select().from("Users"),
    getUser: (id) => conn("Users").where("id", id)
  });
};
