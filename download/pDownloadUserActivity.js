module.exports = pDownloadUserActivity;
var fs = require('fs'),
    _ = require('lodash'),
    pYoutubeLatestHistoryFromChannelId =
        require('./pYoutubeLatestHistoryFromChannelId.js');
    csv = require('csv'),
    Promise = require('bluebird');

var pWriteFile = Promise.promisify(fs.writeFile),
    pStringifyCsv = Promise.promisify(csv.stringify); 

function pDownloadUserActivity(channelId, downloadedChannelIds) {
  if (downloadedChannelIds && _.contains(downloadedChannelIds, channelId)) {
    return Promise.resolve();
  }
  return pYoutubeLatestHistoryFromChannelId(channelId)
  .map(function(event) {
    event.publishedAt = Date.parse(event.publishedAt)
    event.publishedAt = Math.floor(event.publishedAt / 1000)
    return event;
  })
  .then(function(events) {
    return _.chain(events)
    // if two events have the same timestamp, make sure they are always
    // sorted in the same order by type
    // (eg bulitin always comes before upload)
    .sortBy('type')
    .sortBy(function(event) {return -event.publishedAt})
    .value();
  })
  .map(function(event) {
    return [event.publishedAt, event.type];
  })
  .then(function(events) {
    events.unshift(['publishedAt', 'type']);
    return events;
  })
  .then(pStringifyCsv)
  .then(function(eventsString) {
    return pWriteFile('data/activity/' + channelId + '.csv', eventsString);
  });
}

if (module.parent === null) {
  process.chdir(__dirname);
  require('./pDownloadedChannelIds')
  .then(function(downloadedChannelIds) {
    return pDownloadUserActivity(process.argv[2], downloadedChannelIds);
  })
  .done();

}
