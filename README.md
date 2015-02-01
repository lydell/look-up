# look-up [![NPM version](https://badge.fury.io/js/look-up.svg)](http://badge.fury.io/js/look-up)

> Like findup-sync and supports the same features but 20x-40x faster on avg.

## Install with [npm](npmjs.org)

```bash
npm i look-up --save
```

See the [benchmarks](#run-benchmarks) or [tests](./test.js).

## Usage

```js
var lookup = require('look-up');
lookup(pattern, {cwd: cwd, ...});
```

- `pattern` **{String|Array}**: glob pattern for the file to find
- `options` **{Object}**: options to pass to minimatch
    + `cwd` **{String}**: the directory to start looking (upwards) from


**Examples:**

```js
lookup('**/c/package.json', { cwd: 'fixtures/a/b/c/d/e/f/g' });
//=> 'fixtures/a/b/c/package.json'
```

Pass options to [minimatch]

```js
lookup('one.txt', { cwd: 'fixtures/a/b/c/d/e/f/g', matchBase: true });
//=> 'fixtures/a/b/c/d/one.txt'
```

## Running benchmarks

Install dev dependencies:

```bash
npm i -d && npm run benchmark
```

Benchmarks were run on [mac and windows](https://github.com/jonschlinkert/look-up/issues/1). look-up is 20-50x faster than [findup-sync] on avg.

```bash
#1: deep-close
  findup x 904 ops/sec ±2.00% (86 runs sampled)
  lookup x 36,579 ops/sec ±1.34% (91 runs sampled)

#2: deep-far
  findup x 123 ops/sec ±2.12% (78 runs sampled)
  lookup x 26,860 ops/sec ±1.01% (93 runs sampled)

#3: nested
  findup x 266 ops/sec ±2.20% (81 runs sampled)
  lookup x 18,829 ops/sec ±1.59% (92 runs sampled)

#4: non-glob
  findup x 5,229 ops/sec ±1.99% (89 runs sampled)
  lookup x 72,916 ops/sec ±1.54% (91 runs sampled)

#5: shallow
  findup x 171 ops/sec ±2.83% (78 runs sampled)
  lookup x 18,955 ops/sec ±1.47% (91 runs sampled)
```

## Running tests

Install dev dependencies:

```bash
npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/look-up/issues).

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on January 31, 2015._

[minimatch]: http://github.com/isaacs/minimatch
[findup-sync]: https://github.com/cowboy/node-findup-sync