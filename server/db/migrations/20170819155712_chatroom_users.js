
exports.up = function(knex, Promise) {
  return knex.schema.createTable('chatroomusers', (table) => {
    table.increments();
    table.integer("user_id");
    table.foreign("user_id").references("id").inTable("users");
    table.integer("chatroom_id");
    table.foreign("chatroom_id").references("id").inTable("chatrooms");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chatroomusers');
};
