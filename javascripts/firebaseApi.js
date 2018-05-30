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

module.exports = {
  saveMovieToWishList,
  setConfig,
};
