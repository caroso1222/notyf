# Notyf
[![npm version](https://badge.fury.io/js/notyf.svg)](https://badge.fury.io/js/notyf)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)
[![npm downloads](https://img.shields.io/npm/dm/notyf.svg)](https://npmjs.org/notyf)

Notyf is a dead simple, responsive, a11y compatible, vanilla javascript notification plugin. No jQuery required.

**Demo:** [carlosroso.com/notyf](http://carlosroso.com/notyf/)

![demo gif](https://media.giphy.com/media/l2SpZitHNMHjic8Mw/giphy.gif)

## Installation

### npm
```
npm install --save notyf
```
### Bower
```
bower install --save notyf
```
Now add it to your project:
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
## Usage

### Basic

```javascript
// Create an instance of Notyf
var notyf = new Notyf();

// Display an error notification
notyf.error('You must fill out the form before moving forward');

// Display a success notification
notyf.success('Your changes have been successfully saved!');
```

### CommonJS

When importing Notyf via CommonJS modules, for example for Vue or Angular on top of Webpack, you can import the module as shown below:
```javascript
// Import Notyf using CommonJS require
var Notyf = require('notyf');
import 'notyf/dist/notyf.min.css';

// Create an instance of Notyf
var notyf = new Notyf()

// Display an error notification 
notyf.error('Please fill out the form')
```

## Options
You can set some options when creating a Notyf instance.

#### `new Notyf([options])`

Param | Type | Default | Details
------------ | ------------- | ------------- | -------------
duration | `Number` | 2000 | Number of miliseconds the notification must be shown
errorIcon | `String` | *Custom Notyf icon* | CSS class of the icon shown in an error notification
successIcon | `String` | *Custom Notyf icon* | CSS class of the icon shown in a success notification

This is an example of setting Notyf with a 1s duration and FontAwesome [error](http://fontawesome.io/icon/exclamation-circle/) and [success](http://fontawesome.io/icon/check-circle-o/) icons (be sure to [include FontAwesome](http://fontawesome.io/get-started/) in your project):
```javascript
var notyf = new Notyf({
  duration:1000,
  errorIcon: 'fa fa-exclamation-circle',
  successIcon: 'fa fa-check-circle'  
})
```

## Contributing

Run `npm run watch` and open the browser a `localhost:8080`. 

## Licence
Notyf is under [MIT licence](https://opensource.org/licenses/mit-license.php)
