import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import { historyStyle } from './history.style';
import { HeaderComponent } from '../../components/header/header.component';
import { Context } from '../../components/global_context/globalContext';
import { useContext } from 'react';

export const HistoryScreen =({navigation}) => {
  const globalContext = useContext(Context);
  const { userObj} = globalContext;
  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderComponent title={`Welcome, ${userObj.firstname} ${userObj.lastname}`} navigation={navigation}/>
        
        <View style={historyStyle.container}>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
