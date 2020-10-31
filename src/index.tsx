import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Home from './Components/Home'
import Home1 from './Components/Home1'
import GamePage from './Components/GamePage/GamePage'
import SettingPage from './Components/SettingsPage/SettingPage'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/h' component={Home1}/>
                <Route exact path='/game' component={GamePage}/>
                <Route exact path='/settings' component={SettingPage}/> 
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
