const tmdb = require('./tmdb.js');

function apiKeys () {
  return new Promise((resolve, reject) => {
    $.get('/db/apiKeys.json')
      .done((data) => {
        resolve(data);
      })
      .fail((err) => {
        reject(`ERROR:`, err);
      });
  });
}

function retrieveKeys () {
  apiKeys().then(function (data) {
    tmdb.setKey(data);
  }).catch(console.error.bind(console));
}

module.exports = {
  retrieveKeys,
};
