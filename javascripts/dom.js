const domString = function (movieArray) {
  let str = '';
  $(movieArray).each(function (i, movie) {
    if (i === 0) {
      str += `<div class='row'>`;
    }
    str +=   `<div class='col-sm-6 col-md-4'>`;
    str +=    `<div class='thumbnail'>`;
    str +=      `<img src='...' alt='...'>`;
    str +=      `<div class='caption'>`;
    str +=        `<h3>Thumbnail label</h3>`;
    str +=        `<p>...</p>`;
    str +=        `<p><a href='#' class='btn btn-primary' role='button'>Review</a> <a href='#' class='btn btn-default' role='button'>Wishlist</a></p>`;
    str +=      `</div>`;
    str +=    `</div>`;
    str +=   `</div>`;
    if ((i + 1) % 3 === 0) {
      str += `</div>`;
      str += `<div class='row'>`;
    }
  });
  printToDom(str, '#movies');
};

const printToDom = (str, id) => $(id).html(str);

module.exports = {
  domString,
  printToDom,
};
