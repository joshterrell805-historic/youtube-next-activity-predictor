#!/bin/node

/**
 * Download user activity for every user in data/users.csv.
 */

var users = require('./users'),
    csv = require('csv'),
    fs = require('fs'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    pYoutubeLatestHistoryFromChannelId =
        require('./pYoutubeLatestHistoryFromChannelId.js');

var pReaddir = Promise.promisify(fs.readdir),
    pWriteFile = Promise.promisify(fs.writeFile),
    pStringifyCsv = Promise.promisify(csv.stringify);

process.chdir(__dirname);

pReaddir('data/activity')
.filter(function(filename) {
  return filename[0] !== '.';
})
.map(function(filename) {
  return filename.substr(0, filename.length - '.csv'.length);
})
.then(function(downloadedChannelIds) {
  return users.pLoad()
  .map(function(user) {
    if (!_.contains(downloadedChannelIds, user.channelId)) {
      return pYoutubeLatestHistoryFromChannelId(user.channelId)
      .map(function(event) {
        return [event.publishedAt, event.type];
      })
      .then(function(events) {
        events.unshift(['publishedAt', 'type']);
        return events;
      })
      .then(pStringifyCsv)
      .then(function(eventsString) {
        return pWriteFile('data/activity/' + user.channelId + '.csv',
            eventsString);
      });
    }
  })
})
.done();
