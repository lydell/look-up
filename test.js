/*!
 * look-up <https://github.com/jonschlinkert/look-up>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var should = require('should');
var norm = require('normalize-path');
var resolve = require('resolve');
var home = require('user-home');
// var lookup = require('findup-sync');
var lookup = require('./');

function normalize(fp) {
  return fp ? norm(path.relative('.', fp)) : null;
}

function npm(name) {
  return path.dirname(resolve.sync(name));
}

describe('lookup', function () {
  before(function () {
    fs.writeFileSync(home + '/_aaa.txt', '');
    fs.writeFileSync(home + '/_bbb.txt', '');
  });
  after(function () {
    fs.unlinkSync(home + '/_aaa.txt');
    fs.unlinkSync(home + '/_bbb.txt');
  });

  it('should throw when the first arg is not a string or array:', function () {
    (function() {
      lookup();
    }).should.throw('look-up expects a string or array as the first argument.')
  });

  it('should throw on bad paths when `verbose` is true:', function () {
    (function() {
      var res = lookup('{}', {verbose: true});
    }).should.throw('ENOENT, no such file or directory \'\'');
  });

  it('should work when no cwd is given', function () {
    normalize(lookup('package.json')).should.equal('package.json');
  });

  it('should support normal (non-glob) file paths:', function () {
    var normPath = normalize(lookup('package.json', {cwd: path.dirname(resolve.sync('normalize-path'))}))
    normPath.should.equal('node_modules/normalize-path/package.json');

    var isGlob = normalize(lookup('package.json', {cwd: path.dirname(resolve.sync('is-glob'))}))
    isGlob.should.equal('node_modules/is-glob/package.json');
  });

  it('should support glob patterns', function () {
    var opts = {cwd: 'fixtures/a/b/c/d/e/f/g'};
    normalize(lookup('**/c/package.json', opts)).should.equal('fixtures/a/b/c/package.json');
    normalize(lookup('c/package.json', opts)).should.equal('fixtures/a/b/c/package.json');
    normalize(lookup('**/one.txt', opts)).should.equal('fixtures/a/b/c/d/one.txt');
    normalize(lookup('**/two.txt', opts)).should.equal('fixtures/a/b/c/two.txt');

    var bs1 = normalize(lookup('b*.json', {cwd: npm('bootstrap')}));
    bs1.should.equal('node_modules/bootstrap/bower.json');

    var bs2 = normalize(lookup('p*.json', {cwd: npm('bootstrap')}));
    bs2.should.equal('node_modules/bootstrap/package.json');
  });

  it('should support arrays of glob patterns', function () {
    var opts = {cwd: 'fixtures/a/b/c/d/e/f/g'};
    normalize(lookup(['**/c/package.json'], opts)).should.equal('fixtures/a/b/c/package.json');
    normalize(lookup(['**/one.txt'], opts)).should.equal('fixtures/a/b/c/d/one.txt');
    normalize(lookup(['**/two.txt'], opts)).should.equal('fixtures/a/b/c/two.txt');
  });

  it('should support micromatch `matchBase` option:', function () {
    var opts = { matchBase: true, cwd: 'fixtures/a/b/c/d/e/f/g' };
    normalize(lookup('package.json', opts)).should.equal('fixtures/a/b/c/d/e/f/g/package.json');
    normalize(lookup('one.txt', opts)).should.equal('fixtures/a/b/c/d/one.txt');
    normalize(lookup('two.txt', opts)).should.equal('fixtures/a/b/c/two.txt');
  });

  it('should support micromatch `nocase` option:', function () {
    var opts = { cwd: 'fixtures/a/b/c' };
    normalize(lookup('one.*', opts)).should.equal('fixtures/a/b/one.txt');
    opts.nocase = true; // matches ONE
    normalize(lookup('one.*', opts)).should.equal('fixtures/a/b/c/one.txt');
  });

  it('should find files with absolute paths:', function () {
    var opts = { cwd: '/Users/jonschlinkert/dev/verb/verb' };
    normalize(lookup('package.json', opts)).should.equal('../../verb/verb/package.json');
    assert.equal(lookup('one.txt', opts), null);
    assert.equal(lookup('two.txt', opts), null);
  });

  it('should find files the cwd is a file name:', function () {
    normalize(lookup('package.json', { cwd: './package.json' })).should.equal('package.json');
    normalize(lookup('package.json', { cwd: 'p*e.json' })).should.equal('package.json');
  });

  it('should find files with absolute paths:', function () {
    lookup('_*b.txt', { cwd: home }).should.equal(home + '/' + '_bbb.txt');
  });

  it('should find files with absolute paths when the cwd is a file name:', function () {
    lookup('_*b.txt', { cwd: path.join(home, '_bbb.txt') }).should.equal(home + '/' + '_bbb.txt');
  });

  it('should recurse until it finds a file matching the given pattern:', function () {
    var opts = { cwd: 'fixtures/a/b/c/d/e/f/g' };
    lookup('_a*.txt', opts).should.equal(path.join(home, '_aaa.txt'));
    lookup('_aaa.*', {cwd: npm('is-glob')}).should.equal(home + '/_aaa.txt');
    lookup('_aaa.*', {cwd: 'node_modules/is-glob'}).should.equal(home + '/_aaa.txt');
  });

  it('should find files using tilde expansion:', function () {
    lookup('*.txt', { cwd: '~' }).should.equal(home + '/_aaa.txt');
    lookup('~/*.txt').should.equal(home + '/_aaa.txt');
  });

  it('should return `null` when no files are found:', function () {
    assert.equal(lookup('foo.json', {cwd: 'fixtures/a/b/c/d/e/f/g'}), null);
    assert.equal(lookup('foo.json', {cwd: 'fixtures/a/b/c/d/e/f/g', matchBase: true}), null);
  });
});
