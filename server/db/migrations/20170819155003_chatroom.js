
exports.up = function(knex, Promise) {
  return knex.schema.createTable('chatrooms', (table) => {
    table.increments();
    table.string('name').unique().notNullable();
    table.integer("user_id");
    table.foreign("user_id").references("id").inTable("users");
    table.boolean('isActive').defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chatrooms');
};
