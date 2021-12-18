"use strict";

module.exports = (usersRepository) => ({
  getUser: async (req, h) => {

    const result = await usersRepository.getUser(req.params.id);
    return JSON.stringify(result);
  },
  getAllUsers: async (req, h) => {

    const payload = req.payload;

    if (typeof payload.name !== "string") {
      return h.response("Please set up correct name").code(400);
    }

    const [ userId ] = await usersRepository.createUser(payload.name);
    return h.response({ status: "created", id: userId }).code(201);
  }
});
