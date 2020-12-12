import React, { useEffect, useState } from 'react'
import { createContainer } from 'react-gstore'

// function saveToLocalStorage() {
//     return (target: Object, propertyName: string, descriptor: any) => {
//         const method = descriptor.value;
//         descriptor.value = function(...args : any[]) {
//             console.log(args)
//             let str = localStorage.getItem(propertyName)
//             let abc = str ? JSON.parse(str) : null
//             const result = method.apply(this, abc ? [abc] : args);
//             console.log(propertyName)
//             localStorage.setItem(propertyName, JSON.stringify(result)) 
//             return result;  
//         };
//     };
// }

// class Store {
//     @saveToLocalStorage()
//     useSettings(initialState = {theme: 0, name: '', lang: 'en', devMode: false}) {
//         let [theme, setTheme] = useState(initialState.theme)
//         let [name, setName] = useState(initialState.name)
//         let [devMode, setDevMode] = useState(initialState.devMode)
//         let [lang, setLang] = useState(initialState.lang)
//         let dark = () => setTheme(0)
//         let light = () => setTheme(1)
//         let anotherTheme = () => setTheme((theme + 1) % 2)

//         return {
//             theme, dark, 
//             light, anotherTheme,
//             name, setName,
//             lang, setLang,
//             devMode, setDevMode
//         }
//     }

//     @saveToLocalStorage()
//     call(initialState : any) {
//         return this.useSettings(initialState)
//     }
// }

const useSettings = (initialState = {theme: 0, name: '', lang: 'en', devMode: false}) => {
    let [theme, setTheme] = useState(initialState.theme)
    let [name, setName] = useState(initialState.name)
    let [devMode, setDevMode] = useState(initialState.devMode)
    let [lang, setLang] = useState(initialState.lang)
    let dark = () => setTheme(0)
    let light = () => setTheme(1)
    let anotherTheme = () => setTheme((theme + 1) % 2)

    return {
        theme, dark, 
        light, anotherTheme,
        name, setName,
        lang, setLang,
        devMode, setDevMode
    }
}

export default createContainer(useSettings, true)