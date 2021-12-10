"use strict";

exports.up = async function (knex) {

  knex.connection.database = "wish_keeper";

  await knex.schema.createTable("Users", (table) => {

    table.increments();
    table.string("name");
  });

  await knex.schema.createTable("People", (table) => {

    table.increments();
    table.integer("user_id").unsigned().notNullable();
    table.string("name");
    table.foreign("user_id").references("id").inTable("Users");
  });

  await knex.schema.createTable("Presents", (table) => {

    knex.connection.database = "wish_keeper";

    table.increments();
    table.integer("person_id").unsigned().notNullable();
    table.foreign("person_id").references("id").inTable("People");

    table.string("title");
    table.string("description");
    table.boolean("is_active");

    table.timestamps();
  });
};

exports.down = async function (knex) {

  await knex.schema.dropTable("Presents");
  await knex.schema.dropTable("People");
  await knex.schema.dropTable("Users");
};
