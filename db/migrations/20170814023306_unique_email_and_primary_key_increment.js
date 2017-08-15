exports.up = function (knex, Promise) {

  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('username', 16).unique().notNullable();
      table.string('email', 40).unique().notNullable();
      table.string('password_digest').notNullable();
      table.text('bio');
      table.integer('rep').defaultTo(5000);
      table.date('date_of_birth');
      table.string('image');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.createTable('users', (table) => {
      table.uuid('id').primary();
      table.string('username', 16).unique().notNullable();
      table.string('email', 40).notNullable();
      table.string('password_digest').notNullable();
      table.text('bio');
      table.integer('rep').defaultTo(5000);
      table.date('date_of_birth');
      table.string('image');
    })
  ]);
};