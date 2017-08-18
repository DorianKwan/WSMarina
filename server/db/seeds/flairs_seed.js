
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flairs').del()
    .then(function () {
      // Inserts seed entries
      return knex('flairs').insert([
        { id: 1, image: 'http://cdn.promat-international.com/~/media/images/promat/segment/marine/page%20content/home%20page/yacht-icon.ashx?la=en&rev=22925bc513244afd9ddb07617350fdbf', cost: 5000, name: "Big Baller"},
        { id: 2, image: 'https://media.tenor.com/images/bbf211a950b564ab385e880ab436eff9/tenor.gif', cost: 4000, name: "Cat boat" },
        { id: 3, image: 'http://clipground.com/images/fishing-boat-clipart-16.jpg', cost: 2500, name: "Boss" },
        { id: 4, image: 'https://cdn3.iconfinder.com/data/icons/travel-and-tourism-3/512/yacht-512.png', cost: 1000, name: "Sail boat" }
      ]);
    });
};
