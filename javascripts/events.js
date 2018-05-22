const myLinks = function (e) {
  $('#auth-btn').on('click', function () {
    $('#authScreen').show();
    $('#myMovies').hide();
    $('#search').hide();
  });

  $('#myMovies-btn').on('click', function () {
    $('#myMovies').show();
    $('#authScreen').hide();
    $('#search').hide();
  });

  $('#search-btn').on('click', function () {
    $('#search').show();
    $('#authScreen').hide();
    $('#myMovies').hide();
  });
};

module.exports = {
  myLinks,
};
