const myLinks = function (e) {
  $(document).on('click', function (e) {
    if (e.target.id === 'auth-btn') {
      $('#authScreen').show();
      $('#myMovies').hide();
      $('#search').hide();
    } else if (e.target.id === 'myMovies-btn') {
      $('#myMovies').show();
      $('#authScreen').hide();
      $('#search').hide();
    } else if (e.target.id === 'search-btn') {
      $('#search').show();
      $('#authScreen').hide();
      $('#myMovies').hide();
    }
  });
};

module.exports = {
  myLinks,
};
