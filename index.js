'use strict';

const assert = require('assert');
const fs = require('fs');
const is = require('is-type-of');
const isMatch = require('lodash.ismatch');

/**
 * assert file with pattern
 *
 * @param {String} file - file path
 * @param {String|Regex|Array<String|Regex>} pattern - check rule
 * @example
 * ```js
 *   assertFile(`${fixtures}/package.json`);
 *   assertFile(`${fixtures}/package.json`, { name: 'example' });
 *   assertFile(`${fixtures}/README`, /x = y/);
 *   assertFile(`${fixtures}/README`, [ 'abc', /\d+/ ]);
 * ```
 */
function ok(file, pattern) {
  _assert({ file, pattern });
}

/**
 * The opposite assertion of `assertFile()`.
 *
 * @param {String} file - file path
 * @param {String|Regex|Array<String|Regex>} pattern - rule should not be matched
 * @example
 * ```js
 *   assertFile.fail(`${fixtures}/package.json`);
 *   assertFile.fail(`${fixtures}/package.json`, { name: 'example' });
 *   assertFile.fail(`${fixtures}/README`, /x = y/);
 *   assertFile.fail(`${fixtures}/README`, [ 'abc', /\d+/ ]);
 * ```
 */
function fail(file, pattern) {
  _assert({ file, pattern, isOpposite: true });
}

function _assert({ file, pattern, isOpposite = false }) {
  const prefix = `file \`${file}\` should${isOpposite ? ' not' : ''}`;

  // only check file exists if `pattern` is not provided
  if (pattern === undefined) {
    return assert(fs.existsSync(file) !== isOpposite, `${prefix} exists`);
  }

  // whether file is exists before check pattern
  // `notExpect('file', 'path/to/README', /name/)` is treat as require file exists
  assert(fs.existsSync(file), `file \`${file}\` should exists before check ${isOpposite ? 'opposite ' : ''}rule \`${_inspect(pattern)}\``);

  // read file content with cache
  let content = fs.readFileSync(file, 'utf-8');

  // check pattern list
  for (const p of [].concat(pattern)) {
    if (is.string(p)) {
      // if pattern is `string`, then test `includes`
      assert(content.includes(p) !== isOpposite, `${prefix} includes \`${_inspect(p)}\` with content \`${_inspect(content)}\``);
    } else if (is.regexp(p)) {
      assert(p.test(content) !== isOpposite, `${prefix} match rule \`${_inspect(p)}\` with content \`${_inspect(content)}\``);
    } else {
      // if pattern is `json`, then convert content to json and check whether contains pattern
      content = is.string(content) ? JSON.parse(content) : content;
      assert(isMatch(content, p) !== isOpposite, `${prefix} contains \`${_inspect(p)}\` with content \`${_inspect(content)}\``);
    }
  }
}

function _inspect(obj) {
  const type = {}.toString.call(obj).replace(/^\[object (.*)\]$/, '$1');
  /* istanbul ignore next */
  if (is.buffer(obj)) obj = obj.toString();
  // escape \n to \\n for good view in terminal
  if (is.string(obj)) obj = obj.replace(/\n/g, '\\n');
  // stringify if object
  if (!is.regexp(obj) && is.object(obj)) obj = JSON.stringify(obj);
  return `${obj}(${type})`;
}

module.exports = ok;
module.exports.ok = ok;
module.exports.fail = fail;
