
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flairs').del()
    .then(function () {
      // Inserts seed entries
      return knex('flairs').insert([
        { id: 1, image: 'http://cdn.promat-international.com/~/media/images/promat/segment/marine/page%20content/home%20page/yacht-icon.ashx?la=en&rev=22925bc513244afd9ddb07617350fdbf', cost: 5000, name: "Big Baller"},
        { id: 2, image: 'http://clipground.com/images/fishing-boat-clipart-16.jpg', cost: 2500, name: "Boss" },
        { id: 3, image: 'https://cdn3.iconfinder.com/data/icons/travel-and-tourism-3/512/yacht-512.png', cost: 1000, name: "Sail boat" },
        { id: 4, image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/rounded-glossy-black-icons-transport-travel/040671-rounded-glossy-black-icon-transport-travel-transportation-boat.png', cost: 500, name: "speed boat" },
        { id: 5, image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/58306-200.png', cost: 250, name: "Paper boat" }
      ]);
    });
};
