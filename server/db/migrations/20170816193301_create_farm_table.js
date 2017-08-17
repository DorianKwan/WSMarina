
exports.up = function(knex, Promise) {
  return knex.schema.createTable('farms', (table) => {
    table.increments();
    table.string('slot_01').defaultTo('AAPL');
    table.string('slot_02').defaultTo('MSFT');
    table.string('slot_03').defaultTo('NVDA');
    table.string('slot_04').defaultTo('FB');
    table.string('slot_05').defaultTo('GOOG');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('farms');
};
