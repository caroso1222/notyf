# Notyf
[![npm version](https://badge.fury.io/js/notyf.svg)](https://badge.fury.io/js/notyf)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)
[![npm downloads](https://img.shields.io/npm/dm/notyf.svg)](https://npmjs.org/notyf)
[![size](https://img.shields.io/bundlephobia/minzip/notyf.svg?color=54CA2F&style=popout)](https://npmjs.org/notyf)


Notyf is a dead simple, responsive, a11y compatible, dependency-free, vanilla javascript toast library.

![demo gif](https://user-images.githubusercontent.com/3689856/54656011-0751e900-4a92-11e9-9c0c-0b7984c62e9d.gif)

## Features

- 📱 Responsive
- 👓 A11Y compatible
- 🔥 Strongly typed codebase (TypeScript Typings readily available)
- ⚡️ 3 types of bundles exposed: ES6, CommonJS and IIFE (for vanilla, framework-free usage).
- 🎯 End-to-end testing with Cypress
- 🎸 Easily plugable to modern frameworks. Recipes available to integrate with React, Angular and Vue.
- ✨ Optional ripple-like fancy revealing effect
- 😈 Simple but highly extensible API. Create your own toast types and customize them.
- 🎃 Support to render custom HTML content within the toasts
- 🐣 Tiny footprint (<2K gzipped)

**Demo:** [carlosroso.com/notyf](http://carlosroso.com/notyf/)

## Installation

```
npm i notyf
```

## Usage

This section explains the base case using the minified bundle. See the [quick recipes](recipes/README.md) section for instructions to plug Notyf into Angular, React or Vue.

Add the css and js files to your main document:

```html
<html>
  <head>
    ...
    <link rel="stylesheet" type="text/css" href="/path/to/notyf.min.css">
  </head>
  <body>
    ...
    <script src="/path/to/notyf.min.js" type="text/javascript"></script>
  </body>
</html>
```

### Basic

```javascript
// Create an instance of Notyf
var notyf = new Notyf();

// Display an error notification
notyf.error('You must fill out the form before moving forward');

// Display a success notification
notyf.success('Your changes have been successfully saved!');
```

### With module bundlers

Notyf ships with an ES6 bundle referenced from the `module` key of its package.json. This is the file that module bundlers like Webpack will use when using the package. `Notyf` is exported as a class under the `notyf` namespace. Typings are also available.

```javascript
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React and Vue

// Create an instance of Notyf
const notyf = new Notyf();

// Display an error notification 
notyf.error('Please fill out the form');
```

## API
You can set some options when creating a Notyf instance.

### `new Notyf([options])`

Param | Type | Default | Details
------------ | ------------- | ------------- | -------------
duration | `number` | 2000 | Number of miliseconds before hiding the notification
ripple | `boolean` | True | Whether to show the notification with a ripple effect
types | `INotyfNotificationOptions[]` | Success and error toasts | Array with individual configurations for each type of toast

### INotyfNotificationOptions

Configuration interface for each individual toast.

Param | Type  | Details
------------ | ------------- | -------------
type | `string` | Notification type for which this configuration will be applied
className | `string` | Custom class name to be set in the toast wrapper element
duration | `number` | 2000 | Number of miliseconds before hiding the notification
icon | `INotyfIcon | false` | An object which the properties of the icon to be rendered. 'false' hides the icon.
backgroundColor | `string` | Background color of the toast
message | `string` | Message to be rendered inside of the toast. Becomes the default message when used in the global config.
ripple | `boolean` | Whether or not to render the ripple at revealing

### INotyfIcon

Configuration interface to define an icon

Param | Type | Details
------------ | ------------- | -------------
className | `string` | Custom class name to be set in the icon element
tagName | `string` | HTML5 tag used to render the icon
text | `string` | Inner text rendered within the icon (useful when using [ligature icons](https://css-tricks.com/ligature-icons/))

## Examples

### Global configuration

This is an example of setting Notyf with a 1s duration, custom duration and color for the error toast, and a new custom toast called 'warning' with a [ligature material icon](https://google.github.io/material-design-icons/):

```javascript
const notyf = new Notyf({
  duration: 1000,
  types: [
    {
      type: 'warning',
      backgroundColor: 'orange',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'warning'
      }
    },
    {
      type: 'error',
      backgroundColor: 'indianred',
      duration: 2000
    }
  ]
});
```

### Custom toast type

Register a new toast type and use it by referencing its type name:

```javascript
const notyf = new Notyf({
  types: [
    {
      type: 'info',
      backgroundColor: 'blue',
      icon: false
    }
  ]
});

notyf.open({
  type: 'info',
  message: 'Send us <b>an email</b> to get support'
});
```

### Default types with custom configurations

The default types are 'success' and 'error'. You can use them simply by passing a message as its argument, or you can pass a settings object in case you want to modify its behaviour.

```javascript
const notyf = new Notyf();

notyf.error({
  message: 'Accept the terms before moving forward',
  duration: 9000,
  icon: false
})
```

## Recipes

Notyf is well supported in all of the modern frameworks such as Angular, React or Vue. [Check out the recipes](recipes/README.md) and learn how to integrate the library to your application.

## Contributing

Please see the [contributing](contributing.md) document and read the contribution guidelines. Thanks in advance for all the help!

## Licence

Notyf is under [MIT licence](https://opensource.org/licenses/mit-license.php)
