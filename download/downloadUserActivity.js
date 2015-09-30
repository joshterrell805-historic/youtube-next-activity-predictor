#!/bin/node

/**
 * Download user activity for every user in data/users.csv.
 */

var users = require('./users'),
    pDownloadedChannelIds = require('./pDownloadedChannelIds.js'),
    pDownloadUserActivity = require('./pDownloadUserActivity');

process.chdir(__dirname);

pDownloadedChannelIds
.then(function(downloadedChannelIds) {
  return users.pLoad()
  .map(function(user) {
    return pDownloadUserActivity(user.channelId, downloadedChannelIds);
  })
})
.done();
