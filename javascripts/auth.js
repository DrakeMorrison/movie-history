'use strict';

const {getAllMoviesEvent, deleteMovieEvent, updateMovieEvent,} = require('./events.js');
const {setUID,} = require('./firebaseApi.js');

function checkLoginStatus () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      setUID(user.uid);
      getAllMoviesEvent();
      deleteMovieEvent();
      updateMovieEvent();
      $('#myMovies').show();
      $('#authScreen').hide();
      $('#search').hide();
      $('#myMovies-btn, #search-btn, #logout').removeClass('hide');
      $('#auth-btn').addClass('hide');
    } else {
      // No user is signed in.
      $('#myMovies-btn, #search-btn, #logout').addClass('hide');
      $('#auth-btn').removeClass('hide');
    }
  });

}

module.exports = {
  checkLoginStatus,
};
