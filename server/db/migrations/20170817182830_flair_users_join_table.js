exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_flairs', (table) => {
    table.increments();
    table.integer("flair_id");
    table.foreign("flair_id").references("id").inTable("flairs");
    table.integer("user_id");
    table.foreign("user_id").references("id").inTable("users");
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("user_flairs", function (table) {
    table.dropForeign("user_id", "user_flairs_user_id_foreign");
    table.dropForeign("flair_id", "user_flairs_flair_id_foreign");
  });
};
