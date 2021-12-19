"use strict";

module.exports = (peopleRepository, presentsRepository) => ({
  getAllUsersFriends: async (req, h) => {
    return await peopleRepository.getAllUsersFriends(req.params.id);
  },
  addFriendToTheUser: async (req, h) => {
    const payload = req.payload;
    if (typeof payload.name !== "string") {
      return h.response("Please set up correct name").code(400);
    }

    const response = await peopleRepository.addFriendToTheUser(req.params.id, payload.name);
    return h.response({ status: "created", response }).code(201);
  },
  removeFriend: async (req, h) => {
    const friendId = req.params.id;
    await presentsRepository.removeAllPresentsForFriend(friendId);
    await peopleRepository.removeFriendFromTheUser(friendId);

    return h.response({ status: "deleted" });
  },
  addPresent: async (req, h) => {
    const { title, description } = req.payload;

    const [ friendId ] = await presentsRepository.addNewPresent(req.params.id, title, description);
    return h.response({ status: "created", id: friendId }).code(201);
  },
  getAllPresents: async (req, h) => {
    return await presentsRepository.getAllPresentsForFriend(req.params.id);
  }
});
