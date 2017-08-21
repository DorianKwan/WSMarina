exports.up = function(knex, Promise) {
  return knex.schema.createTable("bets", (table) => {
    table.increments();
    table.string("ticker");
    table.bigint("wager");
    table.integer('user_id').unsigned();
    table.foreign('user_id').references("users.id");
    table.boolean("direction");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("bets");
};
