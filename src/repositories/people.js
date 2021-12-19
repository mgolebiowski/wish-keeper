"use strict";

const formatFriend = (output, record) => {
  if (!output.length || output[output.length - 1].id !== record.friendId) {
    output.push({
      id: record.friendId,
      name: record.name,
      presents: []
    });
  }

  if ( record.id === null ) {
    return output;
  }

  // eslint-disable-next-line no-unused-vars
  const { user_id, person_id, name, friendId, ...thePresent } = record;
  output[output.length - 1].presents.push(thePresent);
  return output;
};

module.exports = function PeopleRepository(conn) {

  return ({
    getAllUsersFriends: (userId) => conn("People")
      .leftJoin("Presents", "Presents.person_id", "People.id")
      .select("People.id as friendId", "*")
      .where("user_id", userId)
      .then((records) => records.sort((rec1, rec2) => rec1.friendId - rec2.friendId).reduce(formatFriend, [])),
    addFriendToTheUser: (userId, name) => conn("People").returning("id").insert({ user_id: userId, name }),
    removeFriendFromTheUser: (friendId) => conn("People").where("id", friendId).del()
  });
};
