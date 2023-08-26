import React from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {HeaderComponent} from '../../components/header/header.component';
import {resultStyle} from './result.style';
export const QRResultScreen = ({route, navigation}) => {
  const data = JSON.parse(route.params.data);
  // the qr code information is stored in the route
  console.log('QR data:' + data.image);

  return (
    <SafeAreaView style={resultStyle.content}>
      <ScrollView style={resultStyle.scrollView}>
        <HeaderComponent title="" navigation={navigation} />
        <View style={resultStyle.QRview}>
          <View style={resultStyle.resultQRShape}>
            <View style={resultStyle.resultHeader}>
              <Text style={resultStyle.headerText}>Food Info</Text>
            </View>
            <View style={resultStyle.qrinfo}>
              <Image style={resultStyle.qrimage} source={{uri: data.image}} />
            </View>
            <Text style={resultStyle.qrTitleText}>Name</Text>
            <View style={resultStyle.qrinfo}>
              <Text style={resultStyle.baseText}>{data.name}</Text>
            </View>
            <Text style={resultStyle.qrTitleText}>Place of Origin</Text>
            <View style={resultStyle.qrinfo}>
              <Text style={resultStyle.baseText}>{data.origin}</Text>
            </View>
            <Text style={resultStyle.qrTitleText}>Journey</Text>
            <View style={resultStyle.qrinfo}>
              <Text style={resultStyle.qrbaseText}> {data.journey}</Text>
            </View>
            <Text style={resultStyle.qrTitleText}>Distance Travelled</Text>
            <View style={resultStyle.qrinfo}>
              <Text style={resultStyle.qrbaseText}>
                {data.distance_travelled}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
