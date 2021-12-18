"use strict";

module.exports = function UsersRepository(conn) {

  return ({
    getAllUsers: () => conn.select().from("Users"),
    getUser: (id) => conn("Users").where("id", id),
    createUser: (name) => conn("Users").returning("id").insert({ name })
  });
};
