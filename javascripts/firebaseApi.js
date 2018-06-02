'use strict';

let firebaseConfig = {};

function setConfig (input) {
  firebaseConfig = input;
}

function saveMovieToWishList (newMovie) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/movies.json`,
      data: JSON.stringify(newMovie),
    })
      .done(function (uniqueKey) {
        resolve(uniqueKey);
      })
      .fail(function (error) {
        reject(error);
      });
  });
}

function getAllMovies () {
  const allMoviesArray = [];
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json`,
    })
      .done(function (allMoviesObject) {
        if (allMoviesObject !== null) {
          Object.keys(allMoviesObject).forEach(function (fbKey) {
            allMoviesObject[fbKey].id = fbKey;
            allMoviesArray.push(allMoviesObject[fbKey]);
          });
        }
        resolve(allMoviesArray);
      })
      .fail(function (error) {
        reject(error);
      });
  });
}

function deleteMovie (movieId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
    })
      .done(function () {
        resolve();
      })
      .fail(function (error) {
        reject(error);
      });
  });
}

function updateMovie (modifiedMovie, movieId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
      data: JSON.stringify(modifiedMovie),
    })
      .done(function (modifiedMovie) {
        resolve(modifiedMovie);
      })
      .fail(function () {
        reject(modifiedMovie);
      });
  });
}

function getWatchedMovies () {
  const allMoviesArray = [];
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="isWatched"&equalTo=true`,
    })
      .done(function (allMoviesObject) {
        if (allMoviesObject !== null) {
          Object.keys(allMoviesObject).forEach(function (fbKey) {
            allMoviesObject[fbKey].id = fbKey;
            allMoviesArray.push(allMoviesObject[fbKey]);
          });
        }
        resolve(allMoviesArray);
      })
      .fail(function (error) {
        reject(error);
      });
  });
}

module.exports = {
  saveMovieToWishList,
  setConfig,
  getAllMovies,
  deleteMovie,
  updateMovie,
  getWatchedMovies,
};
