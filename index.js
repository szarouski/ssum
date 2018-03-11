#!/usr/bin/env node
const crypto = require('crypto');
const path = require("path");
const fs = require("fs");
const input = process.argv[2];
const algorithm = process.argv[3] || 'sha256';

if (input === '--help') {
  console.log(`usage examples: 'ssum', 'ssum ~/downloads', 'ssum ~/downloads/file sha512'`);
  console.log(`ssum [path] [sha256|sha512|sha1|md5|...], default path is '.', default algorithm is sha256`);
  console.log(`supported algorithms depend on system, use 'openssl list-message-digest-algorithms' to check`);
  process.exit(0);
}

console.log('Calculating checksum');
[
  input || '.',
  x => path.join(process.cwd(), x),
  x =>
    isDir(x) ?
    fs.readdirSync(x).map(y => path.join(x, y)).filter(not(isDir)) :
      [x],
  xs => xs.map(getHashAsync),
  xs => Promise.all(xs)
]
.reduce((x, f) => f(x))
.then(xs =>
  xs.map(([path, hash]) => `${hash} - ${path}`).concat('Done').join('\n'))
.then(x => console.log(x))
.catch(e => console.error(e));


function isDir(x) {
  return fs.lstatSync(x).isDirectory();
}

function not(fn) {
  return function (...args) {
    return !fn.call(this, ...args);
  }
}

function getHashAsync(path) {
  return new Promise((res, rej) => {
    const hash = crypto.createHash(algorithm);
    fs.createReadStream(path)
    .on('error', e => rej(e))
    .on('data', (data) => {
      hash.update(data);
    })
    .on('end', () => {
      res([path, hash.digest('hex')]);
    });
  });
}