"use strict";

module.exports = function PresentsRepository(conn) {

  return ({
    getAllPresentsForFriend: (friendId) => conn("Presents").where("person_id", friendId),
    removeAllPresentsForFriend: (friendId) => conn("Presents").where("person_id", friendId).del(),
    addNewPresent:
        (friendId, title, description) => {
          return conn("Presents").returning("id").insert({
            title,
            description,
            person_id: friendId,
            is_active: true,
            created_at: conn.fn.now(),
            updated_at: conn.fn.now()
          });
        }
  });
};
