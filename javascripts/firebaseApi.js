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

module.exports = {
  saveMovieToWishList,
  setConfig,
  getAllMovies,
};
