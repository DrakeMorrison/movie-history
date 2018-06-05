'use strict';
const tmdb = require('./tmdb.js');
const firebaseApi = require('./firebaseApi.js');
const {checkLoginStatus,} = require('./auth.js');

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
    firebaseApi.setConfig(data.firebase);
    firebase.initializeApp(data.firebase);
    checkLoginStatus();
  }).catch(console.error.bind(console));
}

module.exports = {
  retrieveKeys,
};
