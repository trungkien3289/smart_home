import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Import the store function and statenpm 
import configureStore, { IAppState } from './store/rootReducer';
import initApp from './store/rootReducer';
import './index.css';
// import { Switch } from '@material-ui/core';
import ScreenDashboard from './screens/dashboard/dashboard';
import PingNetworkScreen from './screens/ping-network/ping';
import { hot } from 'react-hot-loader'
interface IProps {
  store: Store<IAppState>;
}

/* 
Create a root component that receives the store via props
and wraps the App component with Provider, giving props to containers
*/
const Root: React.SFC<IProps> = props => {
  return (
   <Provider store={props.store}>
      <BrowserRouter>
       <Switch>
         <Route path='/dashboard' component={ScreenDashboard}></Route>
         <Route exact path='/ping' component={PingNetworkScreen}></Route>
         <Redirect from="/" to="/dashboard" />
         {/* <Route path='/login' component={Login}></Route>
         <Route path='/register' component={Register}></Route> */}
       </Switch>
       </BrowserRouter>
     </Provider>
 )
      
};

// Generate the store
const store = initApp();
const App = <Root store={store} />

// Render the App
ReactDOM.render(<Root store={store} />, document.getElementById(
  'root'
) as HTMLElement);
