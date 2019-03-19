# Angular

## TL;DR

Create an injection token and a factory. Provide the token using the factory. Inject the dependency in your components.

## Steps

1. Open `angular.json` and import the minified stylesheet as an external asset (`.projects.#project-name#.architect.build.options.styles`):

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "projects": {
    "hello-world": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.css",
              "./node_modules/notyf/notyf.min.css"
            ],
            "scripts": []
          },
```
2. Create a file called `notyf.token.ts`. I recommend you to create this file in your `shared/utils` folder.
3. Add the following content to that file:

```typescript
import { InjectionToken } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 5000 // Set your global Notyf configuration here
  });
}
```
4. Open `app.module.ts` and add the token in the providers array:

```typescript
import { NOTYF, notyfFactory } from './path/to/notyf.token';

@NgModule({
  declarations: [ ... ],
  imports: [ ... ],
  providers: [
    { provide: NOTYF, useFactory: notyfFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

5. Open the component or service where you want to use Notyf (e.g. `app.component.ts`).
6. Inject the dependency in the constructor. Use it anywhere within the component:
```typescript
import { Inject } from '@angular/core';
import { NOTYF } from './path/to/notyf.token';
import { Notyf } from 'notyf';

constructor(@Inject(NOTYF) private notyf: Notyf) { }

alert() {
  this.notyf.error('Please fill out all the fields in the form');
}
```
