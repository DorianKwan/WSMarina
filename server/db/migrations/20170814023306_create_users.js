exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('password_digest').notNullable();
    table.text('bio');
    table.integer('rep').defaultTo(5000);
    table.date('date_of_birth');
    table.string('image');
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
