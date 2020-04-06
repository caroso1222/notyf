# Notyf
[![npm version](https://badge.fury.io/js/notyf.svg)](https://badge.fury.io/js/notyf)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)
[![npm downloads](https://img.shields.io/npm/dm/notyf.svg)](https://npmjs.org/notyf)
[![size](https://img.shields.io/bundlephobia/minzip/notyf.svg?color=54CA2F&style=popout)](https://npmjs.org/notyf)


Notyf is a dead simple, responsive, a11y compatible, dependency-free, vanilla javascript toast library.

![demo gif](https://user-images.githubusercontent.com/3689856/78058753-635e7700-734e-11ea-9902-2dc5a60a065e.gif)

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
- 🐣 Tiny footprint (<3K gzipped)
- 👴🏽 Works on IE11

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

### `new Notyf(options: INotyfOptions)`

Param | Type | Default | Details
------------ | ------------- | ------------- | -------------
duration | `number` | 2000 | Number of miliseconds before hiding the notification. Use `0` for infinite duration.
ripple | `boolean` | true | Whether to show the notification with a ripple effect
position | [`INotyfPosition`](#inotyfposition) | `{x:'right',y:'bottom'}` | Viewport location where notifications are rendered
dismissible | `boolean` | false | Whether to allow users to dismiss the notification with a button
types | [`INotyfNotificationOptions[]`](#inotyfnotificationoptions) | Success and error toasts | Array with individual configurations for each type of toast

### `dismissAll()`

Dismiss all the active notifications.

```javascript
const notyf = new Notyf();
notyf.success('Address updated');
notyf.error('Please fill out the form');
notyf.dismissAll();
```

## Interfaces

### INotyfPosition

Viewport location where notifications are rendered.

Param | Type | Details
------------ | ------------- | -------------
x | `left \| center \| right` | x-position
y | `top \| center \| bottom` | y-position

### INotyfNotificationOptions

Configuration interface for each individual toast.

Param | Type  | Details
------------ | ------------- | -------------
type | `string` | Notification type for which this configuration will be applied
className | `string` | Custom class name to be set in the toast wrapper element
duration | `number` | 2000 | Number of miliseconds before hiding the notification
icon | [`INotyfIcon \| false`](#inotyficon) | An object with the properties of the icon to be rendered. 'false' hides the icon.
background | `string` | Background color of the toast
message | `string` | Message to be rendered inside of the toast. Becomes the default message when used in the global config.
ripple | `boolean` | Whether or not to render the ripple at revealing
dismissible | `boolean` | Whether to allow users to dismiss the notification with a button

### INotyfIcon

Icon configuration

Param | Type | Details
------------ | ------------- | -------------
className | `string` | Custom class name to be set in the icon element
tagName | `string` | HTML5 tag used to render the icon
text | `string` | Inner text rendered within the icon (useful when using [ligature icons](https://css-tricks.com/ligature-icons/))

## Examples

### Global configuration

The following example configures Notyf with the following settings:
- 1s duration
- Render notifications in the top-right corner
- New custom notification called 'warning' with a [ligature material icon](https://google.github.io/material-design-icons/)
- Error notification with custom duration, color and dismiss button

```javascript
const notyf = new Notyf({
  duration: 1000,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    {
      type: 'warning',
      background: 'orange',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'warning'
      }
    },
    {
      type: 'error',
      background: 'indianred',
      duration: 2000,
      dismissible: true
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
      background: 'blue',
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

Please see the [contributing](CONTRIBUTING.md) document and read the contribution guidelines. Thanks in advance for all the help!

## Licence

Notyf is under [MIT licence](https://opensource.org/licenses/mit-license.php)
