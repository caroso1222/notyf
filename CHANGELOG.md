# 3.0.4

## Fix

- Fix responsive issue. [#30](https://github.com/caroso1222/notyf/issues/30)

# 3.0.3

## Fix

- Fix IIFE bundle as it was not exposing the main entry point only but the full namespace instead.

# 3.0.0

## Features

* Improve a11y support with the new a11y announcer
* Implement a more extensible, yet simple and scalable API
* Complete up to date TypeScript typings

## Miscellaneous

* Migrate codebase to TypeScript
* Add appropriate support for module bundlers by exposing different artifacts (ES6, CommonJS, minified IIFE)
* Add e2e tests with Cypress
* Move to Rollup for the build workflow

## Breaking Changes

* Rename `delay` for `duration`. [#6](https://github.com/caroso1222/notyf/issues/6)
* Rename `alert` for `error`. [#22](https://github.com/caroso1222/notyf/issues/22)
* Rename `confirm` for `success`. [#22](https://github.com/caroso1222/notyf/issues/22)
* Remove option `confirmIcon`. [#22](https://github.com/caroso1222/notyf/issues/22)
* Remove option `alertIcon`. [#22](https://github.com/caroso1222/notyf/issues/22)
* Drop support for Bower

## Credits

* Big thanks to [@rijkvanzanten](https://github.com/rijkvanzanten), [@honzabilek4](https://github.com/honzabilek4) and [@ConsoleTVs](https://github.com/ConsoleTVs) for helping to shape out the API and new features of v3.

# 2.0.1

## Features

* Add entry point for CommonJS require. Now Notyf can be imported as `var Notyf = require('notyf')`

# 2.0.0

## Features

* Add support for AMD & CommonJS modules.

## Refactor

* Change CSS classes to adopt a better and cleaner BEM methodology.

## Bug Fixes

* The alert notification no longer interferes with the Bootstrap's `alert` class. 