# NUXT

## TL;DR

Install and config Notyf for [Nuxt](https://nuxtjs.org/)

Example in [Codesandbox](https://codesandbox.io/s/nuxt-notyf-s0ugc).

## Steps


1. Add `notyf.js` in 📁 plugins
2. In `notyf.js` add :
```javascript
import { Notyf } from "notyf";
import Vue from "vue";

const notyf = new Notyf();

Object.defineProperty(Vue.prototype, "$notyf", { value: notyf });

```
3. In the `nuxt.config.js` file.
4. Import the minified stylesheet and the created plugin:

```javascript
export default {
...
css: ["notyf/notyf.min.css"],
...
plugins: [{ src: "~/plugins/notyf.js", ssr: false }],
}
...

```

5. In your Vue component you can call `this.$notyf`.

```html
<template>
  <div @click="onClick" class="button--green">Notyf</div>
</template>

<script>
export default {
  methods: {
    onClick() {
       this.$notyf.success("All you need is Love");
    }
  }
}
</script>
```
