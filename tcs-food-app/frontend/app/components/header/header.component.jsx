import React, {useState, useContext} from "react";
import { Appbar, Menu } from 'react-native-paper';
import { Context } from "../global_context/globalContext";
import { headerStyle } from "./header.style";

export const HeaderComponent = (props) => {
    const globalContext = useContext(Context);
    const {domain, setUserObj, setIsLoggedIn, accessToken, setAccessToken} = globalContext;
    const [visible, setVisible] = useState(false);
    const closeMenu = () => setVisible(false);
    const openMenu = (v) => setVisible(true);
    function toProfilePage() {
        props.navigation.navigate('Profile')
    }

    function toHomePage() {
        props.navigation.navigate('Home')
    }
    
    function handleLogout() {
        if(accessToken === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4ODgyMzg3LCJpYXQiOjE2Njg4ODIwODcsImp0aSI6ImJkYjg1MjEzYTU4YzRjMzU4MGZjNjNkYzM1MjJkNWY5IiwidXNlcl9pZCI6Mn0.twQgOsfltbQM3971RcoNIVO_yiKUZbnZsO_o4B3xOuU') console.log('CORECT TOKN')
        const body = JSON.stringify({});
        fetch(`http://10.0.2.2:8000/dj-rest-auth/logout/`, {
            method: 'POST',
            headers: new Headers(
                {
                    "Authorization": `JWT ${accessToken}`,
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json;charset=utf-8"
                }
            ),
            body: {},
        })
        .then(response => {
            console.log(response)
            if(response.ok) {
              return response.json();
            }
            else {
              throw response.json();
            }
          })
        .then(data => {
            console.log(data)
            setApiError('');
            setAccessToken('');
            setUserObj('');
            setIsLoggedIn(false);
        })
        .catch(error => {
            console.log(error);
        });
        setIsLoggedIn(false)
    }
    return (
        <Appbar style={headerStyle.content}>
            <Appbar.Content title={props.title} style={headerStyle.content}>
            </Appbar.Content>
            <Menu visible={visible}
                style={headerStyle.menu}
                onDismiss={closeMenu}
                anchor={
                <Appbar.Action icon={require("./images/user.png")} onPress={openMenu} />
                }>
                <Menu.Item
                onPress={() => toHomePage()}
                title="Home"
                />
                <Menu.Item
                onPress={() => toProfilePage()}
                title="Profile"
                />
                <Menu.Item
                    onPress={() => handleLogout()}
                    title="Logout"
                />
            </Menu>
        </Appbar>
    )
}