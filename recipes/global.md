# Global

## TL;DR

Add a `<script>` tag with its `src` pointing to the minified file.

## Steps

1. Add the minified files to your public static assets folder. You can do this by running `npm i notyf` and then copy the files `node_modules/notyf/notyf.min.js|css`. After pasting the files in your assets folder, your code structure will look similar to this:

```
index.html

- assets
 - js
  - notyf.min.js
 - css
  - notyf.min.css

- node_modules
 - notyf
  - notyf.min.js
  - notyf.min.css
```

You can safely delete the `node_modules` folder after this step.

2. Open your `index.html` file
3. Add the styles in the head of the document and the script before closing the `<body>`. Make sure your custom scripts are imported **after** importing Notyf. 

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        ...
        <link href="path/to/notyf.min.css" rel="stylesheet">
    </head>
    <body>
        <button id="send-button">Send</button>
        ...
        <script src="path/to/notyf.min.js" type="application/javascript"></script>
        <script type="application/javascript">
          var notyf = new Notyf({
            duration: 5000 // Set your global Notyf configuration here
          });
        </script>
        <script src="scripts/your-custom-script.js" type="application/javascript"></script>
    </body>
</html>
```

4. Use Notyf in your custom script with the recently registered global:

```javascript
document.getElementById('send-button')
  .addEventListener('click', function() {
    notyf.error('Please fill out all the fields in the form');
  });
```
