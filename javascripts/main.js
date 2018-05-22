const singleMovie = {
  adult: false,
  backdropPath: '/c2Ax8Rox5g6CneChwy1gmu4UbSb.jpg',
  genreIds: [28, 12, 878, 14,],
  id: 140607,
  originalLanguage: 'en',
  originalTitle: 'Star Wars: The Force Awakens',
  overview: 'Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.',
  popularity: 49.408373,
  posterPath: '/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg',
  releaseDate: '2015-12-15',
  title: 'Star Wars: The Force Awakens',
  video: false,
  voteAverage: 7.5,
  voteCount: 7965,
};

const events = require('./events.js');
const dom = require('./dom.js');

(function startApp () {
  $('#myMovies').hide();
  $('#authScreen').hide();
  // retrieveKeys();
  dom.domString([singleMovie, singleMovie, singleMovie, singleMovie,]);
  events.myLinks();
})();
