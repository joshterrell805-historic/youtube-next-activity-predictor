/**
 * Console script for getting all youtube commenters on a page
 * 1. visit a youtube video with comments in a private window (important
 *    so your username doesn't end up in output).
 * 2. scroll down until comments load.
 * 2. paste code below into the javascript console.
 * 3. csv is printed to console to go in data/users.csv
 **/

var links = document.getElementsByTagName('a');
links = Array.prototype.slice.call(links);
var urls = links.reduce(function(urls, link) {
  if (link.getAttribute) {
    var href = link.getAttribute('href');
    if (href && (href.indexOf('/channel/') === 0 ||
        href.indexOf('/user/') === 0)) {
      if (urls.indexOf(href) === -1) {
        urls.push(href);
      }
    }
  }

  return urls;
}, []);
var csv = urls.map(function(url) {
  var idx = url.indexOf('/', 1);
  var val = url.substr(idx + 1);
  if (url.indexOf('/c') === 0) {
    return ',' + val;
  } else {
    return val + ',';
  }
}).join('\n');
console.log(csv);
