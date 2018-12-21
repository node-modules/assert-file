# assert-file

assert file utilities

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/assert-file.svg?style=flat-square
[npm-url]: https://npmjs.org/package/assert-file
[travis-image]: https://img.shields.io/travis/node-modules/assert-file.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/assert-file
[codecov-image]: https://codecov.io/gh/node-modules/assert-file/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/node-modules/assert-file
[david-image]: https://img.shields.io/david/node-modules/assert-file.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/assert-file
[snyk-image]: https://snyk.io/test/npm/assert-file/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/assert-file
[download-image]: https://img.shields.io/npm/dm/assert-file.svg?style=flat-square
[download-url]: https://npmjs.org/package/assert-file

## Installation

```bash
npm i --save assert-file
```

## Usage

```js
const assertFile = require('assert-file');

// `ok()` is alias of `assertFile()`, `fail()` is the opposite of `assertFile()`
const { ok, fail } = assertFile;

// check whether file exists
assertFile(`${fixtures}/package.json`);

// check string includes
assertFile(`${fixtures}/README.md`, 'hello');

// check with regex
assertFile(`${fixtures}/README.md`, /hello/);

// check json includes
assertFile(`${fixtures}/package.json`, { name: 'rule_file' });

// support multiple rule
assertFile(`${fixtures}/README.md`, [ 'hello', /world/ ]);

// opposite assertion
assertFile.fail(`${fixtures}/package.json`);
assertFile.fail(`${fixtures}/package.json`, { name: 'example' });
assertFile.fail(`${fixtures}/README`, /x = y/);
assertFile.fail(`${fixtures}/README`, [ 'abc', /\d+/ ]);
```
