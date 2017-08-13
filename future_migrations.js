// -- Messages
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('messages', function(table){
      table.uuid('id').primary();
      table.text('content');
      table.foreign('user_id').references('users.id');
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

// -- chatrooms
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('chatrooms', function(table){
      table.uuid('id').primary();
      table.string('chatroom_name', 16);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('chatrooms')
  ])
};

// -- chatroom_users
// can find which user is is what chat here
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('chatroom_users', function(table){
      table.uuid('id').primary();
      table.foreign('chatroom_id').references('chatrooms.id');
      table.foreign('user_id').references('users.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('chatroom_users')
  ])
};


// -- Bets 
// list of bets, the stock the bet is on, date of creation of bet
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('bets', function(table){
      table.uuid('id').primary();
      table.date('date_created').defaultTo(knex.raw('now()'));
      // date now !!!!!
      table.foreign('stock_id').references('stocks_id');     
      // Or
      // table.string('ticker', 4).notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bets')
  ])
};

// -- stocks
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('stocks', function(table){
      table.uuid('id');
      table.string('company_ticker');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('stocks')
  ])
};

// -- Payouts 
// 
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('payouts', function(table){
      table.uuid('id').primary();
      table.foreign('bet_id').references('bets.id'); 
      table.date('date_of_payout').defaultTo(knex.raw('now()'));
      // the above hack should prevent potential errors or change date to dateTime
      table.foreign('user_id').references('users.id');
      table.int('amount');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('payouts')
  ])
};