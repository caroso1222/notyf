# 3.10.0

## Feature

- Allow icons as HTML markup. [#101](https://github.com/caroso1222/notyf/pull/101)

# 3.9.0

## Chore

- Add support for UMD bundles. [#81](https://github.com/caroso1222/notyf/pull/81)

# 3.8.0

## Feature

- Add Notyf events. [#74](https://github.com/caroso1222/notyf/pull/74)
- Allow custom icon colors. [#77](https://github.com/caroso1222/notyf/pull/77)

## Fix

- Avoid toasts to shrink when stacked. [#70](https://github.com/caroso1222/notyf/pull/70)

# 3.7.0

## Feature

- Allow individual notifications to be dismissed programatically. [#63](https://github.com/caroso1222/notyf/pull/63)

# 3.6.0

## Feature

- Allow infinite duration for active notification. [#60](https://github.com/caroso1222/notyf/pull/60)

# 3.5.1

## Fix

- Fixed compatibility issues with IE11. [#44](https://github.com/caroso1222/notyf/issues/44)

# 3.5.0

## Feature

- Introduce `background`. Deprecate `backgroundColor`.[#55](https://github.com/caroso1222/notyf/issues/55)

# 3.4.0

## Feature

- Allow users to dismiss all the notifications [#40](https://github.com/caroso1222/notyf/issues/40)

# 3.3.0

## Feature

- Allow users to dismiss notifications via button [#13](https://github.com/caroso1222/notyf/issues/13)

# 3.2.0

## Feature

- Allow custom notification positioning [#36](https://github.com/caroso1222/notyf/issues/36)

# 3.1.0

## Feature

- Allow multiple class names

# 3.0.4

## Fix

- Fix responsive issue. [#30](https://github.com/caroso1222/notyf/issues/30)

# 3.0.3

## Fix

- Fix IIFE bundle as it was not exposing the main entry point only but the full namespace instead.

# 3.0.0

## Feature

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

* Big thanks to [@rijkvanzanten](https://github.com/rijkvanzanten), [@honzabilek4](https://github.com/honzabilek4) and [@ConsoleTVs](https://github.com/ConsoleTVs) for helping to shape out the API and new feature of v3.

# 2.0.1

## Feature

* Add entry point for CommonJS require. Now Notyf can be imported as `var Notyf = require('notyf')`

# 2.0.0

## Feature

* Add support for AMD & CommonJS modules.

## Refactor

* Change CSS classes to adopt a better and cleaner BEM methodology.

## Bug Fixes

* The alert notification no longer interferes with the Bootstrap's `alert` class. 