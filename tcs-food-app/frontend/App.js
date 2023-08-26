/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createContext, useState} from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './App.style';
import AppNavigator from './app/app.navigator';
import { Provider as ContextProvider} from './app/components/global_context/globalContext';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <ContextProvider>
        <AppNavigator></AppNavigator>
      </ContextProvider>
    </PaperProvider>
  );
};


export default App;
