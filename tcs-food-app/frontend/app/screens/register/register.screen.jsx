import React, {useState, useContext} from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {Context} from '../../components/global_context/globalContext';
import {loginStyle} from '../login/login.style';
import {registerStyle} from './register.style';

export const RegisterScreen = ({navigation}) => {
  const globalContext = useContext(Context);
  const {setIsLoggedIn, setUserObj, domain} = globalContext;
  const [fname, setFname] = useState('');
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passView, setPassView] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [conPass, setConPass] = useState('');
  const [conPassView, setConPassView] = useState(true);
  const [apiError, setApiError] = useState('');
  function toLoginPage() {
    navigation.navigate('Login');
  }
  function handleSubmit() {
    if (!fname) setFnameError('* First Name Required');
    else setFnameError('');

    if (!lname) setLnameError('* Last Name Required');
    else setLnameError('');

    if (!email) {
      setEmailError('* Email ID Required');
    } else if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setEmailError('* Invalid Email ID');
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('* Password Required');
    } else if (
      !password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    ) {
      setPasswordError(
        '* Password must have atleast 8 characters: 1 lowercase, 1 uppercase, 1 number and 1 special character',
      );
    } else if (!conPass || password !== conPass) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
      if (!emailError && !passwordError && !fnameError && !lnameError) {
        register();
      }
    }
  }
  function register() {
    const body = JSON.stringify({
      email: email,
      password1: password,
      password2: conPass,
      firstname: fname,
      lastname: lname,
      is_retailer: false,
    });
    console.log(body);
    fetch(`${domain}/dj-rest-auth/registration/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: body,
    })
      .then(response => {
        if (response.status === 201) return response.json();
        else throw response.json();
      })
      .then(data => {
        console.log(data);
        setApiError('');
        setUserObj(data.user);
        setIsLoggedIn(true);
        navigation.navigate('Home');
      })
      .catch(error => {
        error
          ? setApiError('Error: Email ID already exists.')
          : setApiError('');
      });
  }
  return (
    <SafeAreaView style={registerStyle.content}>
      <ScrollView style={registerStyle.scrollView}>
        <View style={registerStyle.view}>
          <Image
            style={loginStyle.tcsLogo}
            source={require('../login/images/TCSNewLogo.png')}
          />
          <Text style={loginStyle.appTitle1}>
            FOOD <Text style={loginStyle.appTitle2}>APP</Text>
          </Text>

          <Image
            style={loginStyle.appLogo}
            source={require('../login/images/fork-knife.png')}
          />
          <Text style={loginStyle.loginTitle}>REGISTER</Text>
          {apiError ? (
            <Text style={loginStyle.errors}>{apiError}</Text>
          ) : null}
          <View style={registerStyle.form}>
            <Text style={loginStyle.emailLabel}>First Name</Text>
            {fnameError ? (
              <Text style={loginStyle.errors}>{fnameError}</Text>
            ) : null}
            <TextInput
              style={loginStyle.inputBox}
              onChangeText={fname => setFname(fname)}
              value={this.fname}
              defaultValue={fname}></TextInput>
            <Text style={loginStyle.emailLabel}>Last Name</Text>
            {lnameError ? (
              <Text style={loginStyle.errors}>{lnameError}</Text>
            ) : null}
            <TextInput
              style={loginStyle.inputBox}
              onChangeText={lname => setLname(lname)}
              value={this.lname}
              defaultValue={lname}></TextInput>
            <Text style={loginStyle.emailLabel}>Email ID</Text>
            {emailError ? (
              <Text style={loginStyle.errors}>{emailError}</Text>
            ) : null}
            <TextInput
              style={loginStyle.inputBox}
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
              value={this.email}
              defaultValue={email}></TextInput>
            <Text style={loginStyle.emailLabel}>Password</Text>
            {passwordError ? (
              <Text style={loginStyle.errors}>{passwordError}</Text>
            ) : null}
            <TextInput
              style={loginStyle.inputBox}
              onChangeText={password => setPassword(password)}
              secureTextEntry={passView}
              value={this.password}
              defaultValue={password}
              right={
                <TextInput.Icon
                  name="eye-off-outline"
                  color={registerStyle.icon.color}
                  onPress={() => setPassView(!passView)}
                />
              }></TextInput>
            <Text style={loginStyle.emailLabel}>Confirm Password</Text>
            <TextInput
              style={loginStyle.inputBox}
              onChangeText={conPass => setConPass(conPass)}
              secureTextEntry={conPassView}
              value={this.conPass}
              defaultValue={conPass}
              right={
                <TextInput.Icon
                  name="eye-off-outline"
                  color={registerStyle.icon.color}
                  onPress={() => setConPassView(!conPassView)}
                />
              }></TextInput>
            <Button
              mode="contained"
              style={loginStyle.loginBtn}
              onPress={() => handleSubmit()}>
              {' '}
              <Text style={loginStyle.loginBtnText}>REGISTER</Text>
            </Button>
            <Text style={loginStyle.registerBtn} onPress={() => toLoginPage()}>
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
