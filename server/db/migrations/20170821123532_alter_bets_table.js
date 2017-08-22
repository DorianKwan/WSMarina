exports.up = function(knex, Promise) {
  return knex.schema.alterTable("bets", (table) => {
    table.decimal("start_price");
    table.timestamp("created_at");
    table.timestamp("collected_at").defaultTo(null);
    table.integer("payout").defaultTo(null);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("bets", (table) => {
    table.dropColumn("start_price");
    table.dropColumn("created_at");
    table.dropColumn("collected_at");
    table.dropColumn("payout");
  });
};
