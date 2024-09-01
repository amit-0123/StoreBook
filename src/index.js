// React is the core library for building user interfaces in React.
import React from 'react';

// ReactDOM is the library used for rendering React components to the DOM.
import ReactDOM from 'react-dom/client';

// index.css is a stylesheet for your application.
import './index.css';

// App is the main component of your application, imported from the App.js file.
import App from './App';



// The ReactDOM.createRoot method is part of the new root API introduced in React 18.

// ReactDOM.createRoot is a method introduced in React 18 for creating a root to render the React component tree.

// here amit is a variable
const amit = ReactDOM.createRoot(document.getElementById('root'));
// amit.render is used to render the React component tree into the root which s present into the public->index.js file.
amit.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // The "public/index.html" file contains a div with the id of root. This is the element where your React application will be mounted.
  


  // this is very old one so don'nt use it
  
  // ReactDOM.render(
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>,
  //   document.getElementById('root')
  // );
