exports.up = function (knex, Promise) {
  return knex.schema.alterTable('chatrooms', (table) => {
    table.boolean('isActive').defaultTo(true).alter();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('chatrooms', (table) => {
    table.boolean('isActive').alter();
  });
};
