#!/bin/node

/**
 * Associate channelIds for users missing channelIds in data/users.csv.
 */

var users = require('./users')
    pYoutubeChannelIdFromUsername =
        require('./pYoutubeChannelIdFromUsername.js');

process.chdir(__dirname);

users.pLoad()
.map(function(user) {
  return user.channelId !== '' ? user :
      pYoutubeChannelIdFromUsername(user.username)
      .then(function(channelId) {
        user.channelId = channelId;
        return user;
      });
})
.then(users.pSave)
.done();
