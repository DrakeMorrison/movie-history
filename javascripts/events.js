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
      updateMovieEvent();
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
    if (e.keyCode === 13 && $('#search').is(':visible')) { // test
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
    }).catch(console.error.bind(console));
  });
}

function updateMovieEvent () {
  $(document).on('click', '.updateMovieToWatched', function (e) {
    const movieToUpdateCard = $(e.target).closest('.movie');
    const movieToUpdateId = $(movieToUpdateCard).data('firebaseId');
    const updatedMovie = {
      'title': movieToUpdateCard.find('.movie-title').text(),
      'overview': movieToUpdateCard.find('.movie-overview').text(),
      'poster_path': movieToUpdateCard.find('.movie-poster_path').data('poster'),
      'rating': 0,
      'isWatched': true,
    };
    firebaseApi.updateMovie(updatedMovie, movieToUpdateId)
      .then(function () {
        getAllMoviesEvent();
      })
      .catch(console.error.bind(console));
  });
}

function filterEvents () {
  $('#filterButtons').on('click', function (e) {
    const target = e.target.id;
    switch (target) {
      case 'wishlist':
        showWishlistMovies();
        break;
      case 'watched':
        showWatchedMovies();
        break;
      case 'all':
        getAllMoviesEvent();
        break;
    }
  });
}

function showWatchedMovies () {
  firebaseApi.getWatchedMovies().then(function (results) {
    dom.domString(results, tmdb.getImageConfig(), '#savedMovies', true);
  }).catch(console.error.bind(console));
}

function showWishlistMovies () {
  firebaseApi.getWishlistMovies().then(function (results) {
    dom.domString(results, tmdb.getImageConfig(), '#savedMovies', true);
  }).catch(console.error.bind(console));
}

function authEvents () {
  $('#sign-in-btn').click(function (e) {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const pass = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .catch(function (error) {
        $('#signin-error-msg').text(error.message);
        $('#signin-error').removeClass('hide');
        console.error.bind(console);
      });
  });

  $('#register-link').click(function () {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  $('#signin-link').click(function () {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });

  $('#logout').click(function () {
    firebase.auth().signOut()
      .then(function () {
        $('#authScreen').show();
        $('#myMovies').hide();
        $('#search').hide();
      })
      .catch(console.error.bind(console));
  });

  $('#register-btn').click(function () {
    const email = $('#registerEmail').val();
    const pass = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .catch(function (error) {
        $('#register-error-msg').text(error.message);
        $('#register-error').removeClass('hide');
        console.error.bind(console);
      });
  });
}

module.exports = {
  myLinks,
  pressEnter,
  saveMovieToWishListEvent,
  filterEvents,
  authEvents,
  deleteMovieEvent,
  updateMovieEvent,
  getAllMoviesEvent,
};
