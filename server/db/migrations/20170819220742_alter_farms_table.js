exports.up = function(knex, Promise) {
  return knex.schema.alterTable("farms", (table) => {
    table.dropColumn("slot_01");
    table.dropColumn("slot_02");
    table.dropColumn("slot_03");
    table.dropColumn("slot_04");
    table.dropColumn("slot_05");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("farms", (table) => {
    table.string('slot_01').defaultTo('AAPL');
    table.string('slot_02').defaultTo('MSFT');
    table.string('slot_03').defaultTo('NVDA');
    table.string('slot_04').defaultTo('FB');
    table.string('slot_05').defaultTo('GOOG');
  });
};
