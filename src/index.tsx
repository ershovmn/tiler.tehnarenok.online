import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import SettingPage from './Components/SettingsPage/SettingPage'
import './index.css'
import { Provider } from 'react-gstore';
import SettingsStore from './Store/SettingsStore'
import NewGameStore from './Store/NewGameStore'

// import Home from './Components/Home/Home'
// import GamePage from './Components/GamePage/GamePage'
// import Loading from './Components/Loading/Loading'
// import About from './Components/About/About'

const Home = React.lazy(() => import('./Components/Home/Home'))
const GamePage = React.lazy(() => import('./Components/GamePage/GamePage'))
const Loading = React.lazy(() => import('./Components/Loading/Loading'))
const About = React.lazy(() => import('./Components/About/About'))

interface RootComponentProps {
    children?: React.ReactNode
}

const loadStores = () => {
    const settingsStoreDefault = {theme: 1, name: ''}
    const settingsStoreString = localStorage.getItem('SettingsStoreTiler4_0')

    let settingsState = settingsStoreString ? JSON.parse(settingsStoreString) : settingsStoreDefault

    return {settingsState}
}

const RootComponent = (props : RootComponentProps) => {
    let settings = SettingsStore.useContainer()
    if (settings.theme === 0) {
        document.body.style.color = 'white'
        document.body.style.backgroundColor = '#333333'
        document.body.style.setProperty('--bg', '#333333')
        document.body.style.setProperty('--tc', 'white')
    } else {
        document.body.style.color = '#000000'
        document.body.style.backgroundColor = '#ffffff'
        document.body.style.setProperty('--bg', '#ffffff')
        document.body.style.setProperty('--tc', '#000000')
    }
    return <>{props.children}</>
}

console.log(process.env)

ReactDOM.render(
    <React.StrictMode>
        <Provider containers={[
            {container: SettingsStore},
            {container: NewGameStore}
        ]}>
            <RootComponent>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/game' component={GamePage}/>
                        <Route exact path='/settings' component={SettingPage}/> 
                        <Route exact path='/loading' component={Loading} />
                        <Route exact path='/about' component={About} />
                    </Switch>
                </Router>
            </RootComponent>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
