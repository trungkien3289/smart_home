import React from 'react'
import { Store } from 'redux';
import { IAppState } from './store/rootReducer';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import ScreenDashboard from './screens/dashboard/dashboard';
import PingNetworkScreen from './screens/ping-network/ping';
interface IProps {
    store: Store<IAppState>;
  }

  interface IState{

  }

export class App extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
    }
    render(){
        return (
            <Provider store={this.props.store}>
            <BrowserRouter>
            <Switch>
            <Route path='/dashboard' component={ScreenDashboard}></Route>
            <Route exact path='/ping' component={PingNetworkScreen}></Route>
            <Redirect from="/" to="/dashboard" />
            </Switch>
            </BrowserRouter>
        </Provider>);
    }
}