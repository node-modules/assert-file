'use strict';

const path = require('path');
const assert = require('assert');
const assertFile = require('..');
const { ok, fail } = assertFile;

describe('test/index.test.js', () => {
  const fixtures = path.join(__dirname, 'fixtures');

  it('should work', () => {
    assert(ok === assertFile);

    ok(`${fixtures}/package.json`);
    ok(`${fixtures}/package.json`, { name: 'rule_file' });
    ok(`${fixtures}/package.json`, [{ name: 'rule_file' }, { version: '1.0.0' }]);
    ok(`${fixtures}/README.md`, 'hello');
    ok(`${fixtures}/README.md`, /hello/);
    ok(`${fixtures}/README.md`, [ 'hello', /world/ ]);
    fail(`${fixtures}/no-exist.json`);
    fail(`${fixtures}/README.md`, 'some');
    fail(`${fixtures}/README.md`, /some/);
    fail(`${fixtures}/README.md`, [ 'some', /some/ ]);
  });

  it('should throw', () => {
    assert.throws(() => {
      ok(`${fixtures}/no-exist.json`);
    }, /no-exist\.json.*should exists/);

    assert.throws(() => {
      ok(`${fixtures}/package.json`, { name: 'no-exist' });
    }, /package\.json.*should contains.*"name":"no-exist".*with content .*"name":"rule_file"/);

    assert.throws(() => {
      ok(`${fixtures}/package.json`, 'hello');
    }, /package\.json.*should includes.*hello/);

    assert.throws(() => {
      ok(`${fixtures}/package.json`, /hello/);
    }, /package\.json.*should match rule.*hello/);

    assert.throws(() => {
      ok(`${fixtures}/package.json`, [ 'hello', /hello/ ]);
    }, /package\.json.*should includes.*hello/);

    assert.throws(() => {
      fail(`${fixtures}/package.json`);
    }, /package\.json.*should not exists/);

    assert.throws(() => {
      fail(`${fixtures}/package.json`, { name: 'rule_file' });
    }, /package\.json.*should not contains/);
  });
});
