const dom = require('./dom.js');

let tmdbKey = '';

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

function searchMovies (searchText) { // needs work
  searchTMDB(searchText).then(function (data) {
    console.error(data);
  });
}

function setKey (str) {
  tmdbKey = str;
}

function showResults (array) {
  dom.domString(array);
}

module.exports = {
  setKey,
  showResults,
  searchMovies,
};
