#Notyf
Notyf is a dead simple, responsive, vanilla javascript notification plugin. No jQuery required.

**Demo:** [carlosroso.com/notyf](http://carlosroso.com/notyf/)

![demo gif](https://media.giphy.com/media/l2SpZitHNMHjic8Mw/giphy.gif)

##Installation
Install the [npm package](https://www.npmjs.com/package/notyf):
```
npm install --save notyf
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
##Usage

```javascript
//Create an instance of Notyf
var notyf = new Notyf();

//Display an alert notification
notyf.alert('You must fill out the form before moving forward');

//Display a success notification
notyf.confirm('Your changes have been successfully saved!');
```
##Options
You can set some options when creating a Notyf instance.
####`new Notyf([options])`

Param | Type | Default | Details
------------ | ------------- | ------------- | -------------
delay | `Number` | 2000 | Number of miliseconds the notification must be shown
alertIcon | `String` | *Custom Notyf icon* | CSS class of the icon shown in an alert notification
confirmIcon | `String` | *Custom Notyf icon* | CSS class of the icon shown in a success notification

This is an example of setting Notyf with a 1s delay and FontAwesome [alert](http://fontawesome.io/icon/exclamation-circle/) and [success](http://fontawesome.io/icon/check-circle-o/) icons (be sure to [include FontAwesome](http://fontawesome.io/get-started/) in your project):
```javascript
var notyf = new Notyf({
  delay:1000,
  alertIcon: 'fa fa-exclamation-circle',
  confirmIcon: 'fa fa-check-circle'  
})
```

##Licence
Notyf is under [MIT licence](https://opensource.org/licenses/mit-license.php)
