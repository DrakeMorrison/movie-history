const dom = require('./dom.js');

let tmdbKey = '';

let imgConfig = '';

function searchTMDB (searchText) { // needs work
  return new Promise((resolve, reject) => {
    $.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&include_adult=false&query=${searchText}`)
      .done((data) => {
        resolve(data);
      })
      .fail((err) => {
        reject(`ERROR:`, err);
      });
  });
}

// function searchMovies (searchText) { // needs work
//   searchTMDB(searchText).then(function (data) {
//     console.error(data);
//   });
// }

function setKey (str) {
  tmdbKey = str;
  getConfig();
}

function showResults (searchText) {
  searchTMDB(searchText)
    .then(function (result) {
      dom.domString(result.results, imgConfig);
    })
    .catch(console.error.bind(console));
}

function tmdbConfiguration () {
  return new Promise(function (resolve, reject) {
    $.get(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`)
      .done((data) => {
        resolve(data);
      })
      .fail((err) => {
        reject('ERRORL', err);
      });
  });
}

function getConfig () {
  tmdbConfiguration().then(function (results) {
    imgConfig = results.images;
  })
    .catch(console.error.bind(console));
}

module.exports = {
  setKey,
  showResults,
  // searchMovies,
};
