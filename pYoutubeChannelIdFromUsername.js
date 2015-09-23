module.exports = pYoutubeChannelIdFromUsername;

var pRequestYoutube = require('./pRequestYoutube');

function pYoutubeChannelIdFromUsername(username) {
  return pRequestYoutube('channels', {part: 'id', forUsername: username})
  .then(function(res) {
    if (res.pageInfo.totalResults === 0) {
      throw new Error('User does not exist');
    }
    return res.items[0].id;
  });
}

if (!module.parent) {
  var username = process.argv[2] || 'vsauce';
  pYoutubeChannelIdFromUsername(username)
  .then(console.log.bind(console))
  .done();
}
