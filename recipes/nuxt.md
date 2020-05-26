# NUXT

## TL;DR

Install and config Notif for [Nuxt](https://nuxtjs.org/)

Exemple in [Codesandbox](https://codesandbox.io/s/nuxt-notyf-s0ugc).

## Steps


1. Add `notif.js` in 📁 plugins
2. In `notif.js` add :
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

```

4.In your Vue component you can call `this.$notyf`.

```
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
