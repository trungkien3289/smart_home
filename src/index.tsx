import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {App} from './App'

// Import the store function and statenpm 
import initApp from './store/rootReducer';
import './index.css';
import { hot } from 'react-hot-loader'

// Generate the store
const store = initApp();
// render Root component into React
// Apply hot loader for development mode
// if(process.env.NODE_ENV === "development"){
//   hot(module)(render())
// }else{
//   render()
// }

hot(module)(ReactDOM.render(<App store={store} />, document.getElementById(
  'root'
) as HTMLElement));

