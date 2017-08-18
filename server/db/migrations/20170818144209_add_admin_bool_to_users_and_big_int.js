exports.up = function (knex, Promise) {
  return knex.schema.alterTable('users', (table) => {
    table.bigint('rep').defaultTo(5000).alter();
    table.boolean('admin').defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('admin');
    table.int('rep').defaultTo(5000).alter();
  });
};
