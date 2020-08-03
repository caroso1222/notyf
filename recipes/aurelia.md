# Aurelia

## TL;DR
* option 1: configure Notyf once, and inject the same instance into the components that uses it.
* option 2: create a new instance of Notyf if you want to use different options.

## Steps for global configuration

1. Import the minified stylesheet and create the dependency provider in `main.ts` or `main.js`:

```javascript
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

...
...
...

// using registerSingleton with lambda to allow lazy injection
aurelia.container.registerSingleton(Notyf,
  () => new Notyf({
    duration: 5000 // Set your global Notyf configuration here
  })
);

aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
```

2. Add `@lazy(Notyf) private getNotyf: () => Notyf` to your component constructor. Use Notyf as `this.getNotyf()`.

```javascript
import {autoinject} from 'aurelia-framework';
import {lazy} from 'aurelia-framework';
import {Notyf} from 'notyf';

@autoinject()
export class Test
{
  constructor(@lazy(Notyf) private getNotyf: () => Notyf) {}

  notifyStuff()
  {
    this.getNotyf().success("Hello World!!!");
  }
}
```

## Steps for single use
1. Import the minified stylesheet in `main.ts` or `main.js`:
```javascript
import 'notyf/notyf.min.css';
```
2. import Notyf in a component, create an instance and use immediately.
```javascript
import {Notyf} from 'notyf';
export class Test
{
  notifyStuff()
  {
    const notyf = new Notyf(); // configure at will
    notyf.success("Hello World!!!");
  }
}
```