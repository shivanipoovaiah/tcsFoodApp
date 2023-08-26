import React, {useState, useContext} from "react";
import {Text, View, TouchableHighlight, Image} from 'react-native';
import { Context } from "../global_context/globalContext";
import { boxStyle } from "./history.style";
import {  theme } from "../../../App.style";
import * as Progress from 'react-native-progress';
import { historyStyle } from "../../screens/history/history.style";

export const BoxComponent = (props) => {
  const new_ripe = Math.round((props.ripe + Number.EPSILON) * 100)
    let ripe_text = ''
    let spinner = ''
    if(new_ripe <= 20) {
        ripe_text = 'Raw';
        spinner = '#EB5406'
    } else if(new_ripe <= 40) {
        ripe_text = 'Not ripe';
        spinner = '#FFAE42';
    } else if(new_ripe <= 60) {
        ripe_text = 'Little ripe';
        spinner = '#FFD700';
    } else if(new_ripe <= 80) {
        ripe_text = 'Ideally ripe';
        spinner = '#9ACD32';
    } else {
        ripe_text = 'Extremely ripe';
        spinner = theme.colors.primary;
    }
    function toResultPage() {
        props.navigation.navigate('Result', {record_id: props.id}) // pass the record id
    }

    return (
      <TouchableHighlight style={{paddingBottom:10}} onPress = {() => toResultPage()}>
      <View style={boxStyle.box}>
        <View style={{ flex: 0.7, padding: 8}} >
        <Image
        style={{height: 85, width: 85, borderRadius: 10}}
        source={{uri:props.image}}
        />
        </View>
        <View style={{ flex: 2, flexDirection: "row", padding: 10}} >
            <View style={{ flex: 2, flexDirection: "column", marginTop: 8,}} >
                <Text style={boxStyle.itemText}>{props.fruit}</Text>
                <Text style={boxStyle.itemText}>{props.days} Days Left</Text>
                <Text style={boxStyle.itemText}>{ripe_text} : {new_ripe} %</Text>
            </View>
            <View style={{ flex: 1}} >
            <Progress.Circle
                animated={true}
                color={spinner}
                textStyle={historyStyle.progressText}
                borderColor={'#D9D9D9'}
                thickness={10}
                showsText={false}
                unfilledColor={'#D9D9D9'}
                direction={'counter-clockwise'}
                progress={props.ripe}
                size={70}  />
            </View>
        </View>
      </View>
  </TouchableHighlight>
    )
}