/* Make a request to a Youtube API endoint.
 */
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
  pRequestYoutube('channels', {part: 'id', forUsername: 'vsauce'})
  .then(function(res) {
    console.log(util.inspect(res, {colors: true}));
  });
}
