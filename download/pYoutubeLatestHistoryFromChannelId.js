module.exports = pYoutubeLatestHistoryFromChannelId;

var pRequestYoutube = require('./pRequestYoutube'),
    _ = require('lodash');

// this is the hard top-limit from youtube
// https://developers.google.com/youtube/v3/docs/activities/list
var maxResults = 50;

function pYoutubeLatestHistoryFromChannelId(channelId) {
  return pRequestYoutube('activities', {part: 'snippet', channelId: channelId,
      maxResults: maxResults}, true)
  .then(function(res) {
    return _.pluck(res.items, 'snippet');
  });
}

if (!module.parent) {
  var util = require('util');
  var channelId = process.argv[2] || 'UC6nSFpj9HTCZ5t-N3Rm3-HA';
  pYoutubeLatestHistoryFromChannelId(channelId)
  .then(function(res) {
    console.log(util.inspect(res, false, null));
  })
  .done();
}
