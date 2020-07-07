# Svelte

## TL;DR

Configure rollup to import CSS files from `node_modules`. Create a singleton `notyf.js` with your configuration.

## Steps

1. After installing Notyf, install the rollup plugin to process CSS files.

```
npm i rollup-plugin-css-only
```

2. Configure the plugin in `rollup.config.js`. This will tell rollup to read the CSS imports and write them in a file called `vendor.css`.

```diff
+ import css from 'rollup-plugin-css-only';

export default {
  input: 'src/main.js',
  output: { ... },
  plugins: [
+   css({ output: 'public/build/vendor.css' }),
    svelte({
      ...
    }),
    ...
};
```

3. Add the CSS file to `index.html`.

```diff
<html lang="en">
<head>
  ...
+ <link rel='stylesheet' href='/build/vendor.css'>
  ...
  <script defer src='/build/bundle.js'></script>
</head>

<body>
</body>
</html>
```

4. Create a file named `notyf.js` with your Notyf configuration. This will be the singleton you'll use across the app to show notifications. Import the CSS in this file.

```javascript
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notyf = new Notyf({
  duration: 5000,
  dismissible: true,
});
```

5. Import it in your component. This is an example of how `App.svelte` would look like integrated with Notyf.

```
<script>
  import { notyf } from './notyf';

  function success() {
    notyf.success('It works!')
  }
</script>

<main>
  <button on:click={success}> Success </button>
</main>
```
