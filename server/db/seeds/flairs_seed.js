
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flairs').del()
    .then(function () {
      // Inserts seed entries
      return knex('flairs').insert([
        { id: 1, image: 'http://bestanimations.com/Money/Coins/gold-coins-animated-gif.gif', cost: 1000, name: "Cha-Ching" },
        { id: 2, image: 'https://media.giphy.com/media/ZUdFkBdpw3Tvq/giphy.gif', cost: 1000, name: "Spinning Coin" },
        { id: 3, image: 'http://www.flare.com/wp-content/uploads/2015/08/Im-Too-Cool-Do-Carlton-Carlton.gif', cost: 1500, name: "Happy Dance" },
        { id: 4, image: 'https://media.tenor.com/images/74090c93f4ee1dfa68839e154589bfa4/tenor.gif', cost: 2000, name: "Pay Day" },
        { id: 5, image: 'https://media.tenor.com/images/beb228e26a079833246f513a6cff6cff/tenor.gif', cost: 2000, name: "Rich Panda" },
        { id: 6, image: 'https://media.tenor.com/images/bbf211a950b564ab385e880ab436eff9/tenor.gif', cost: 2000, name: "Cat Boat" },
        { id: 7, image: 'http://clipground.com/images/fishing-boat-clipart-16.jpg', cost: 2500, name: "Boss" },
        { id: 8, image: 'https://media.giphy.com/media/9BaXac7BXBXCU/giphy.gif', cost: 2000, name: "Fancy Huh" },
        { id: 9, image: 'https://media.giphy.com/media/yi99YMXIigXG8/giphy.gif', cost: 2500, name: "Rich Life" },
        { id: 10, image: 'http://cdn.promat-international.com/~/media/images/promat/segment/marine/page%20content/home%20page/yacht-icon.ashx?la=en&rev=22925bc513244afd9ddb07617350fdbf', cost: 5000, name: "Big Baller"}
      ]);
    });
};
