# React

## TL;DR

Create a [Context](https://reactjs.org/docs/context.html) to share the global Notyf instance through the component tree. 

## Steps

1. Import the minified stylesheet in `App.js`:

```javascript
import React, { Component } from 'react';
import './App.css';
import 'notyf/notyf.min.css';

class App extends Component { ... }
```

2. Create a file called `NotyfContext.js`.
3. Add the following content to that file:

```javascript
import React  from 'react'
import { Notyf } from 'notyf';

export default React.createContext(
  new Notyf({
    duration: 5000 // Set your global Notyf configuration here
  })
);
```

4. Use Notyf with a Context Consumer in your component. The following is an example of a component called `Card.jsx`:

```jsx
// For React >= 16.8 (Hooks)
import React, { useContext } from 'react'
import NotyfContext from './path/to/NotyfContext';


export function Card() {
  const notyf = useContext(NotyfContext);
  
  return (
    <div>
      <button onClick={() => notyf.error('Please fill out all the fields in the form')}>Send</button>
    </div>
  );
}
```

```jsx
// For React < 16.8 (No Hooks)
import React from 'react'
import NotyfContext from './path/to/NotyfContext';

export function Card() {
  return (
    <NotyfContext.Consumer>
      {notyf => (
        <div>
          <button onClick={() => notyf.error('Please fill out all the fields in the form')}>Send</button>
        </div>
      )}
    </NotyfContext.Consumer>
  );
}

export default Card;

```

**Note:** We're purposely not using `<NotyfContext.Provider>` in the root component. This allows React to inject the default value for every Context consumer. The default value is what we defined in the argument of `createContext`.
