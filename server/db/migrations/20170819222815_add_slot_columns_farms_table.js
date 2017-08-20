exports.up = function(knex, Promise) {
  return knex.schema.alterTable("farms", (table) => {
    table.json("slot_01").defaultTo(JSON.stringify({ name: "AAPL", collected_at: null}));
    table.json("slot_02").defaultTo(JSON.stringify({ name: "MSFT", collected_at: null}));
    table.json("slot_03").defaultTo(JSON.stringify({ name: "NVDA", collected_at: null}));
    table.json("slot_04").defaultTo(JSON.stringify({ name: "FB", collected_at: null}));
    table.json("slot_05").defaultTo(JSON.stringify({ name: "GOOG", collected_at: null}));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("farms", (table) => {
    table.dropColumn("slot_01");
    table.dropColumn("slot_02");
    table.dropColumn("slot_03");
    table.dropColumn("slot_04");
    table.dropColumn("slot_05");
  });
};
