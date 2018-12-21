// Type definitions for assert-file
// Project: https://github.com/node-modules/assert-file

type ExpectedType = string | RegExp;

/**
 * Assert file
 *
 * @param {String} file - file path
 * @param {String|RegExp|Array} [pattern] - test pattern
 *
 * @example
 * ```js
 *   assertFile(`${fixtures}/package.json`); // check whether file exists
 *   assertFile(`${fixtures}/README.md`, 'hello'); // check string includes
 *   assertFile(`${fixtures}/README.md`, /hello/); // check with regex
 *   assertFile(`${fixtures}/package.json`, { name: 'rule_file' }); // check json includes
 *   assertFile(`${fixtures}/README.md`, [ 'hello', /world/ ]); // support multiple rule
 * ```
 */
export function ok(file: string, pattern?: ExpectedType | ExpectedType[]): this;

/**
 * The opposite assertion of assert file
 *
 * @param {String} file - file path
 * @param {String|RegExp|Array} [pattern] - test pattern
 *
 * @example
 * ```js
 *   assertFile.fail(`${fixtures}/package.json`);
 *   assertFile.fail(`${fixtures}/package.json`, { name: 'example' });
 *   assertFile.fail(`${fixtures}/README`, /x = y/);
 *   assertFile.fail(`${fixtures}/README`, [ 'abc', /\d+/ ]);
 * ```
 */
export function fail(file: string, pattern?: ExpectedType | ExpectedType[]): this;

export default ok;
