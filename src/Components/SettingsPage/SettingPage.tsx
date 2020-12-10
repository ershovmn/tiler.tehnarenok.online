import React, { useState } from 'react'
import './SettingPage.css'
import ToggleButton from '../ToggleButton/ToggleButton'
import SettingsStore from '../../Store/SettingsStore'

const SettingPage = () => {
    let settings = SettingsStore.useContainer()

    console.log(settings, JSON.stringify(settings))

    let [devMode, setDevMode] = useState(false)

    return (
        <div className='settings-main'>
            <header>
                <h1>Settings</h1>
                <img onClick={() => window.history.back()} alt='close' src={require('../../img/close_svg.svg')} />
            </header>
            <input placeholder={content['name'].name[settings.lang]} value={settings.name} type='text' onChange={(e) => settings.setName(e.target.value)}></input>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <h2>{content['theme'].name[settings.lang]}</h2>
                <ToggleButton 
                    onChange={settings.anotherTheme} 
                    isOn={settings.theme === 0}
                    width={'13%'}
                />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <h2>{content['devmode'].name[settings.lang]}</h2>
                <ToggleButton 
                    onChange={(isOn) => settings.setDevMode(isOn)} 
                    isOn={settings.devMode}
                    width={'13%'}
                />
            </div>
            <div>
                <h2>{content['lang'].name[settings.lang]}</h2>
                <select value={settings.lang} onChange={(e) => settings.setLang(e.target.value)}>
                    <option value='ru'>Русский</option>
                    <option value='en'>English</option>
                </select>
            </div>
        </div>
    )
}

interface HashTable<T> {
    [key: string] : T
}

const content : HashTable<{name: HashTable<string>}> = {
    'name': {
        name: {'ru': 'Имя пользователя', 'en': 'your nickname'},
    },
    'theme': {
        name: {'ru': 'Темная тема', 'en': 'Dark theme'},
    },
    'devmode': {
        name: {'ru': 'Режим разработчика', 'en': 'Developer mode'}
    },
    'lang': {
        name: {'ru': 'Язык', 'en': 'Language'}
    }
}

export default SettingPage