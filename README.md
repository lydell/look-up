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

```bash
node benchmark
```

Benchmarks were run on [mac and windows](https://github.com/jonschlinkert/look-up/issues/1). look-up is 20-50x faster than [findup-sync] on avg.

![image](https://cloud.githubusercontent.com/assets/383994/5243412/e364fc7c-7911-11e4-989f-10d24bebcacc.png)


## Running tests

Install dev dependencies:

```bash
npm install -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/look-up/issues).

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on December 18, 2014._

[minimatch]: http://github.com/isaacs/minimatch
[findup-sync]: https://github.com/cowboy/node-findup-sync