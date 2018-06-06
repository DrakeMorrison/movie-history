'use strict';

let firebaseConfig = {};
let uid = '';

function setUID (input) {
  uid = input;
}

function setConfig (input) {
  firebaseConfig = input;
}

function saveMovieToWishList (newMovie) {
  newMovie.uid = uid;
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
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
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
  modifiedMovie.uid = uid;
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
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done(function (allMoviesObject) {
        if (allMoviesObject !== null) {
          Object.keys(allMoviesObject).forEach(function (fbKey) {
            if (allMoviesObject[fbKey].isWatched) {
              allMoviesObject[fbKey].id = fbKey;
              allMoviesArray.push(allMoviesObject[fbKey]);
            }
          });
        }
        resolve(allMoviesArray);
      })
      .fail(function (error) {
        reject(error);
      });
  });
}

function getWishlistMovies () {
  const allMoviesArray = [];
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done(function (allMoviesObject) {
        if (allMoviesObject !== null) {
          Object.keys(allMoviesObject).forEach(function (fbKey) {
            if (!allMoviesObject[fbKey].isWatched) {
              allMoviesObject[fbKey].id = fbKey;
              allMoviesArray.push(allMoviesObject[fbKey]);
            }
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
  getWishlistMovies,
  setUID,
};
