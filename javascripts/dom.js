'use strict';
const domString = function (movieArray, config, whereToPrint) {
  let str = '';
  $(movieArray).each(function (i, movie) {
    if (i % 3 === 0) {
      str += `<div class='row'>`;
    }
    str +=   `<div class='col-sm-6 col-md-4'>`;
    str +=    `<div class='thumbnail movie'>`;
    str +=      `<img class='movie-poster_path' src="${config.base_url}/w342/${movie.poster_path}" alt='...' data-poster='${movieArray[i].poster_path}'>`;
    str +=      `<div class='caption'>`;
    str +=        `<h3 class='movie-title'>${movie.original_title ? movie.original_title : movie.title}</h3>`;
    str +=        `<p class='movie-overview'>${movie.overview}</p>`;
    str +=        `<p><a href='#' class='btn btn-primary' role='button'>Review</a> <a class='btn btn-default wish-btn' role='button'>Wishlist</a></p>`;
    str +=      `</div>`;
    str +=    `</div>`;
    str +=   `</div>`;
    if (i % 3 === 2) {
      str += `</div>`;
    }
  });
  printToDom(str, whereToPrint);
};

const printToDom = (str, id) => $(id).html(str);

module.exports = {
  domString,
  printToDom,
};
