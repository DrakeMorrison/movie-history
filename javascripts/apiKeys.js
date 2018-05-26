const tmdb = require('./tmdb.js');

function apiKeys () {
  return new Promise((resolve, reject) => {
    $.get('./db/apiKeys.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(`ERROR:`, err);
      });
  });
}

function retrieveKeys () {
  apiKeys().then(function (data) {
    tmdb.setKey(data.tmdb.apiKey);
    firebase.initializeApp(data.firebase);
  }).catch(console.error.bind(console));
}

module.exports = {
  retrieveKeys,
};
