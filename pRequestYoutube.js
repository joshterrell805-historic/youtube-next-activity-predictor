module.exports = pRequestYoutube;

var request = require('request-promise'),
    _ = require('lodash'),
    querystring = require('querystring');

var apiKey = process.env.GOOGLE_API_KEY;

function pRequestYoutube(endpoint, options) {
  _.defaults(options, options, {key: apiKey});
  return request('https://content.googleapis.com/youtube/v3/' + endpoint + '?' +
      querystring.stringify(options))
  .then(JSON.parse);
}

if (!module.parent) {
  var util = require('util');
  var endpoint = process.argv[2] || 'channels';
  var options = process.argv[3] ? JSON.parse(process.argv[3]) :
      {part: 'id', forUsername: 'vsauce'};
  pRequestYoutube(endpoint, options)
  .then(function(res) {
    console.log(util.inspect(res, false, null));
  })
  .done();
}
