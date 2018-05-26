'use strict';
/* eslint camelcase: 0 */
// const singleMovie = {
//   adult: false,
//   backdropPath: '/c2Ax8Rox5g6CneChwy1gmu4UbSb.jpg',
//   genreIds: [28, 12, 878, 14,],
//   id: 140607,
//   original_language: 'en',
//   original_title: 'Star Wars: The Force Awakens',
//   overview: 'Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.',
//   popularity: 49.408373,
//   poster_path: '/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg',
//   release_date: '2015-12-15',
//   title: 'Star Wars: The Force Awakens',
//   video: false,
//   vote_average: 7.5,
//   vote_count: 7965,
// };

const events = require('./events.js');
const apiKeys = require('./apiKeys.js');

(function startApp () {
  $('#myMovies').hide();
  $('#authScreen').hide();
  apiKeys.retrieveKeys();
  events.pressEnter();
  events.myLinks();
  // dom.domString([singleMovie, singleMovie, singleMovie, singleMovie,]);
})();
