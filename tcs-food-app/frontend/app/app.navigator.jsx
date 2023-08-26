import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {HomeScreen} from './screens/home/home.screen';
import {LoginScreen} from './screens/login/login.screen';
import {RegisterScreen} from './screens/register/register.screen';
import {ResultScreen} from './screens/result/result.screen';
import { ScanScreen } from './screens/scan/scan.screen';
import ScanQRScreen from './screens/scan/scanQR.screen';
import {QRResultScreen } from './screens/result/resultQR.screen';
import { ProfileScreen } from './screens/profile/profile.screen';
import { Context } from './components/global_context/globalContext';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const globalContext = useContext(Context);
  const { isLoggedIn, userObj} = globalContext;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        {(!isLoggedIn || !userObj)?
          <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          </>
           :
          <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="QRScan" component={ScanQRScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="QRResult" component={QRResultScreen} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
