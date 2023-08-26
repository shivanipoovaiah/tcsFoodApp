import React, {useState} from 'react';
import { useContext } from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import { Context } from '../../components/global_context/globalContext';
import {loginStyle} from './login.style';

export const LoginScreen = ({navigation}) => {
  const globalContext = useContext(Context);
  const {isLoggedIn, setIsLoggedIn, domain, userObj, setUserObj, 
    accessToken, setAccessToken, refreshToken, setRefreshToken
  } = globalContext;

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passView, setPassView] = useState(true);
  const [apiError, setApiError] = useState('');
  function toRegisterPage() {
    navigation.navigate('Register');
  }
  function handleLogin() {
    if(!email){
      setEmailError('* Email ID Required')
    } else if(!email.toLowerCase().match((
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))) {
      setEmailError('* Invalid Email ID');
    } else {
      setEmailError('')
    }

    if(!password) {
      setPasswordError('* Password Required')
    } else {
      setPasswordError('');
      if(!emailError && !passwordError) {
        login();

      }
    }
  }
  function login() {
    const body = JSON.stringify({
      "email": email,
      "password": password
    })
    fetch(`${domain}/dj-rest-auth/login/`, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: body
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        else {
          throw response.json();
        }
      })
      .then(json => {
        console.log(json)
        setAccessToken(json.access_token)
        setRefreshToken(json.refresh_token)
        setUserObj(json.user)
        setIsLoggedIn(true)
        setApiError('')
        navigation.navigate('Home');
      })
      .catch(error => {
        setApiError('Invalid Email/Password. Please try again!')
        console.log(error);
      });
  }
  return (
    <SafeAreaView style={loginStyle.content}>
      <View style={loginStyle.view}>
        <Image style={loginStyle.tcsLogo} source={require('./images/TCSNewLogo.png')} />
        <Text style={loginStyle.appTitle1} >FOOD <Text style={loginStyle.appTitle2} >APP</Text></Text>
        
        <Image style={loginStyle.appLogo} source={require('./images/fork-knife.png')} />
        <Text style={loginStyle.loginTitle} >LOGIN</Text>
        {
          apiError ?
          <Text style={loginStyle.errors}>{apiError}</Text>
          :null
        }
        <Text style={loginStyle.emailLabel} >Email ID</Text>
        {
          emailError ?
          <Text style={loginStyle.errors}>{emailError}</Text>
          :null
        }
        <TextInput 
          style={loginStyle.inputBox}
          keyboardType="email-address"
          onChangeText={email => setEmail(email)}
          value={this.email}
          defaultValue={email}
        ></TextInput>
        <Text style={loginStyle.passwordLabel} >Password</Text>
        {
          passwordError ?
          <Text style={loginStyle.errors}>{passwordError}</Text>
          :null
        }
        <TextInput 
         style={loginStyle.inputBox}
         onChangeText={password => setPassword(password)}
         secureTextEntry={passView}
         value={this.password}
         defaultValue={password}
          right={
            <TextInput.Icon
              name="eye-off-outline"
              color={loginStyle.icon.color}
              onPress={() => setPassView(!passView)}
            />
          }
        ></TextInput>
        <Button
          mode="contained"
          style={loginStyle.loginBtn}
          onPress={() => handleLogin()}>
          <Text style={loginStyle.loginBtnText}>LOGIN</Text>
        </Button>
        <Text style={loginStyle.registerBtn}  onPress={() => toRegisterPage()}>Register</Text>
        <Image style={loginStyle.vector3} source={require('./images/Vector2.png')} />
      </View>
    </SafeAreaView>
  );
};