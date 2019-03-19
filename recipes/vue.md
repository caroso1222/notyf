# Vue

## TL;DR

Use `provide` in `main.js` to provide a global Notyf instance. Use `inject` in your components to consume the dependency.

## Steps

1. Open the `main.js` file.
2. Import the minified stylesheet and create the dependency provider:

```javascript
import Vue from 'vue'
import App from './App.vue'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

Vue.config.productionTip = false

new Vue({
  provide: () => {
    return {
      notyf: new Notyf({
        duration: 5000 // Set your global Notyf configuration here
      })
    }
  },
  render: h => h(App),
}).$mount('#app')
```

3. Add `inject: ['notyf']` to your Vue component instance. Use Notyf as `this.notyf`.

```
<template>
  <button v-on:click="onClick">Send</button>
</template>

<script>
export default {
  inject: ['notyf'],
  methods: {
    onClick: function() {
      this.notyf.error('Please fill out all the fields in the form');
    }
  }
}
</script>
```
