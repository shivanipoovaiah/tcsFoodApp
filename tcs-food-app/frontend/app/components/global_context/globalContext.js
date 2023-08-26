import React, {useState, useEffect, useRef, createContext} from "react";
// import * as SecureStore from 'expo-secure-store';

const Context = createContext()

const Provider = ( {children} ) => {
    const [domain, setDomain] = useState("http://127.0.0.1:8000")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [userObj, setUserObj] = useState()
    const [appSettings, setAppSettings] = useState({})
    const [image, setImage] = useState("");

    function initAppSettings() {
        fetch(`${domain}/backend/`, {
            method: "GET",
        })
        .then(response => {
            if(response.ok) {
                console.log('Server is up!')
                return response.json()
            }
            else throw response.json()})
        .then(json => {
            console.log(json)
            setAppSettings(json)})
        .catch(error => {console.log(error);});
    }

    useEffect( () => {
        initAppSettings()
    }, [])

    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn,
        appSettings,
        setAppSettings,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        userObj,
        setUserObj,
        image,
        setImage
    }
    return <Context.Provider value={globalContext}>{children}</Context.Provider>
};

export {Context, Provider};