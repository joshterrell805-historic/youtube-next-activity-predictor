
var fs = require('fs'),
    Promise = require('bluebird');

var pReaddir = Promise.promisify(fs.readdir);

module.exports =
    pReaddir('data/activity')
    .filter(function(filename) {
      return filename[0] !== '.';
    })
    .map(function(filename) {
      return filename.substr(0, filename.length - '.csv'.length);
    });
