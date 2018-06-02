'use strict';
const tmdb = require('./tmdb.js');
const firebaseApi = require('./firebaseApi.js');
const dom = require('./dom.js');

const myLinks = function (e) {
  $(document).on('click', function (e) {
    if (e.target.id === 'auth-btn') {
      $('#authScreen').show();
      $('#myMovies').hide();
      $('#search').hide();
    } else if (e.target.id === 'myMovies-btn') {
      getAllMoviesEvent();
      deleteMovieEvent();
      $('#myMovies').show();
      $('#authScreen').hide();
      $('#search').hide();
    } else if (e.target.id === 'search-btn') {
      $('#search').show();
      $('#authScreen').hide();
      $('#myMovies').hide();
    }
  });
};

function pressEnter () {
  $(document).on('keydown', function (e) {
    if (e.keyCode === 13) {
      const input = encodeURI($('#search-bar-input').val());
      tmdb.showResults(input);
    }
  });
}

function saveMovieToWishListEvent () {
  $(document).on('click', '.wish-btn', function (e) {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd = {
      'title': movieToAddCard.find('.movie-title').text(),
      'overview': movieToAddCard.find('.movie-overview').text(),
      'poster_path': movieToAddCard.find('.movie-poster_path').data('poster'),
      'rating': 0,
      'isWatched': false,
    };
    firebaseApi.saveMovieToWishList(movieToAdd)
      .then(function () {
        movieToAddCard.remove();
      }).catch(function (error) {
        console.error('error in saving movie', error);
      });
  });
}

function getAllMoviesEvent () {
  firebaseApi.getAllMovies().then(function (results) {
    dom.domString(results, tmdb.getImageConfig(), '#savedMovies', true);
  }).catch(console.error.bind(console));
}

function deleteMovieEvent () {
  $(document).on('click', '.delete-btn', function (e) {
    const fbMovieId = $(e.target).closest('.movie').data('firebaseId');
    firebaseApi.deleteMovie(fbMovieId).then(function () {
      getAllMoviesEvent();
    });
  });
}

module.exports = {
  myLinks,
  pressEnter,
  saveMovieToWishListEvent,
};
