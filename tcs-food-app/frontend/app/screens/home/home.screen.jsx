import React from 'react';
import {SafeAreaView, ScrollView, Text, View, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import { homeStyle } from './home.style';
import { HeaderComponent } from '../../components/header/header.component';
import { BoxComponent } from '../../components/history_box/history.box';
import { Context } from '../../components/global_context/globalContext';
import { useContext, useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native'


export const HomeScreen =({navigation}) => {
  const globalContext = useContext(Context);
  const { isLoggedIn, userObj, domain} = globalContext;
  const historyUrl = `${domain}/backend/getHistory/` + userObj.pk
  // const historyUrl = `${domain}/backend/getHistory/` + 2
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused()

  // fecth the data from history service
  const fetchData = async () => {
    try {
        const response = await fetch(historyUrl);
        const json = await response.json();
        console.log(json);
        setData(json)
		} catch (error) {
        console.log("error", error);
		}
    setLoading(false);
};
  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const renderItem = ({ item }) => {
    // console.log(item)
    return (
      <BoxComponent id={item.id} image={item.image} days={item.days_left} fruit={item.fruit} ripe={item.ripe_percentage} navigation={navigation}/>
    );
  };

  return (
    <>
    <SafeAreaView >
        <HeaderComponent title={`Welcome, ${userObj.firstname} ${userObj.lastname}`} navigation={navigation}/>
        <View style={{padding: 10}}>
        {loading && <Text>Loading..</Text>}
      {data && (
        <>
        <Text> PREVIOUS SCANS</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{padding: 10}}
          scrollEnabled={true}
        />
        </>
      )}
        </View>
    </SafeAreaView>
    <View style={homeStyle.footer}>

      <Button
      style={homeStyle.button}
      icon="line-scan"
      mode="contained"
      onPress={() => {
        navigation.navigate('Scan');
      }}>
      Scan Food
    </Button>
    <View style={{paddingLeft: 10}}>
    <Button
      style={homeStyle.button}
      icon="data-matrix-scan"
      mode="contained"
      onPress={() => {
        navigation.navigate('QRScan');
      }}>
      Scan QR code
    </Button>
    </View>

  </View></>
  );
};
