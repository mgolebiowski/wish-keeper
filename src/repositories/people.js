"use strict";

const formatFriend = (output, record) => {
  output.name = record.name;
  output.id = record.id;
  if (!output.presents) {
    output.presents = [];
  }

  // eslint-disable-next-line no-unused-vars
  const { user_id, person_id, name, ...thePresent } = record;
  output.presents.push(thePresent);
  return output;
};

module.exports = function PeopleRepository(conn) {

  return ({
    getAllUsersFriends: (userId) => conn("People")
      .innerJoin("Presents", "Presents.person_id", "People.id")
      .where("user_id", userId)
      .then((records) => records.reduce(formatFriend, {})),
    addFriendToTheUser: (userId, name) => conn("People").returning("id").insert({ user_id: userId, name }),
    removeFriendFromTheUser: (friendId) => conn("People").where("id", friendId).del()
  });
};
