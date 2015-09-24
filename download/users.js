var csv = require('csv'),
    fs = require('fs'),
    Promise = require('bluebird');

var pReadFile = Promise.promisify(fs.readFile),
    pWriteFile = Promise.promisify(fs.writeFile),
    pParseCsv = Promise.promisify(csv.parse),
    pStringifyCsv = Promise.promisify(csv.stringify);

exports.pLoad = function pLoad() {
  return pReadFile('data/users.csv')
  .then(pParseCsv)
  .filter(function(row, index) {
    return index !== 0;
  })
  .map(function(row) {
    return {username: row[0], channelId: row[1]};
  });
};

exports.pSave = function pSave(users) {
  return Promise.resolve(users)
  .map(function(user) {
    return [user.username, user.channelId];
  })
  .then(function(users) {
    users.unshift(['username', 'channelId']);
    return users;
  })
  .then(pStringifyCsv)
  .then(function(csvString) {
    return pWriteFile('data/users.csv', csvString);
  })
};

if (!module.parent) {
  exports.pLoad()
  .then(function(users) {
    console.log(users);
    return users;
  })
  .then(exports.pSave)
  .done();
}
