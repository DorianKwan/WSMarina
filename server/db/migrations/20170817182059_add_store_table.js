
exports.up = function(knex, Promise) {
  return knex.schema.createTable('flairs', (table) => {
    table.increments();
    table.string('image');
    table.integer('cost');
    table.string('name');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flairs');
};
