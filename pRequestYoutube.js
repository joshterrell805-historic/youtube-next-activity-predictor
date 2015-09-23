module.exports = pRequestYoutube;

var request = require('request-promise'),
    _ = require('lodash'),
    querystring = require('querystring');

var apiKey = process.env.GOOGLE_API_KEY;

function pRequestYoutube(endpoint, options, allPages) {
  _.defaults(options, options, {key: apiKey});
  return request('https://content.googleapis.com/youtube/v3/' + endpoint + '?' +
      querystring.stringify(options))
  .then(JSON.parse)
  .then(function(res) {
    if (allPages && res.nextPageToken) {
      options = _.defaults({}, {pageToken: res.nextPageToken}, options);
      return pRequestYoutube(endpoint, options, true)
      .then(function(res2) {
        res.items = res.items.concat(res2.items);
        return res;
      });
    } else {
      return res;
    }
  });
}

if (!module.parent) {
  var util = require('util');
  var endpoint = process.argv[2] || 'channels';
  var options = process.argv[3] ? JSON.parse(process.argv[3]) :
      {part: 'id', forUsername: 'vsauce'};
  var allPages = process.argv[4] === 'true';
  pRequestYoutube(endpoint, options, allPages)
  .then(function(res) {
    console.log(util.inspect(res, false, null));
  })
  .done();
}
