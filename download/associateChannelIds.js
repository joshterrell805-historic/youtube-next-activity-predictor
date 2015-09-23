#!/bin/node

/**
 * Associate channelIds for users missing channelIds in data/users.csv.
 */

var csv = require('csv'),
    fs = require('fs'),
    Promise = require('bluebird'),
    pYoutubeChannelIdFromUsername =
        require('./pYoutubeChannelIdFromUsername.js');

var pReadFile = Promise.promisify(fs.readFile),
    pWriteFile = Promise.promisify(fs.writeFile),
    pParseCsv = Promise.promisify(csv.parse),
    pStringifyCsv = Promise.promisify(csv.stringify);

process.chdir(__dirname);

pReadFile('data/users.csv')
.then(pParseCsv)
.map(function(row, index) {
  if (index === 0) return row;
  if (row[1] === '') {
    return pYoutubeChannelIdFromUsername(row[0])
    .then(function(channelId) {
      return [row[0], channelId];
    });
  } else {
    return row;
  }
})
.then(pStringifyCsv)
.then(function(csvString) {
  return pWriteFile('data/users.csv', csvString);
})
.done();
