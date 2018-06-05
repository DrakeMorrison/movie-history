'use strict';

const events = require('./events.js');
const apiKeys = require('./apiKeys.js');

(function startApp () {
  $('#myMovies').hide();
  $('#search').hide();
  apiKeys.retrieveKeys();
  events.pressEnter();
  events.myLinks();
  events.saveMovieToWishListEvent();
  events.filterEvents();
  events.authEvents();
})();
