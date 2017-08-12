// -- Messages
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('messages', function(table){
      table.uuid('id');
      table.text('content');
      table.foreign('user_id').references('chatrooms.id');
      table.date('timestamp');
      table.foreign('chatroom_id').references('chatrooms.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('messages')
  ])
};

// -- Chatrooms
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('chatrooms', function(table){
      table.uuid('id');
      table.string('name', 16);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('chatrooms')
  ])
};

// -- Bets 
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('bets', function(table){
      table.uuid('id');
      table.int('rep_wagered').notNullable();
      table.foreign('pool_id').references('pools.id');
      table.foreign('user_id').references('users.id');
      table.int('rep_won').nullable();
      table.bool('up');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bets')
  ])
};

