import React, {useContext, useState} from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView, ScrollView, View, Image } from 'react-native';
import { resultStyle } from './result.style';
import {  theme } from "../../../App.style";
import { Context } from '../../components/global_context/globalContext';
import { HeaderComponent } from '../../components/header/header.component';
import * as Progress from 'react-native-progress';

export const ResultScreen = ({route, navigation}) => {
    const globalContext = useContext(Context);
    const {domain} = globalContext;
    // the record id is stored in the route
    console.log("recordId:" +route.params.record_id)
    const [data, setData] = useState("");
    // generate result url with record id
    const resultUrl = `${domain}/backend/getResult/` + route.params.record_id
    // if data is null or empty, fetch data with result url from backend and set data
    if(data == null || data === "") {
        fetch(resultUrl, {
            method: "GET",
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
            })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            setData(json)
        })
        .catch((error) => console.log(error))
    }
    const {image, fruit, ripe_percentage, days_left} = data;
    const new_ripe = Math.round((ripe_percentage + Number.EPSILON) * 100)
    let ripe_text = ''
    let spinner = ''
    // set ripe text and spinner color based on ripe data
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
    console.log(data)

    return(
        <SafeAreaView style={resultStyle.content}>
            <ScrollView style={resultStyle.scrollView}>
            <HeaderComponent title='' navigation={navigation}/>
            <View style={resultStyle.view}>
                <View style={resultStyle.headerRectangleShape}>
                    <Text style={resultStyle.headerText}>RESULT:{fruit}</Text>
                </View>
                <View style={resultStyle.imageContainer}>
                    <View  style={resultStyle.left}>
                        <View  style={resultStyle.leftTop}>
                            <Image  style={resultStyle.icon}
                                source={require('./images/left-top.png')}
                            />
                        </View>
                        <View  style={resultStyle.leftBottom}>
                        <Image  style={resultStyle.icon}
                            source={require('./images/left-bottom.png')}
                        />
                        </View>
                    </View>
                    <View style={resultStyle.imageFlex}>
                        <Image
                            style={resultStyle.image}
                            source={{uri: image }}
                        />
                    </View>
                    <View  style={resultStyle.right}>
                        <View style={resultStyle.rightTop}>
                            <Image  style={resultStyle.icon}
                                source={require('./images/right-top.png')}
                            />
                        </View>
                        <View style={resultStyle.rightBottom}>
                        <Image  style={resultStyle.icon}
                            source={require('./images/right-bottom.png')}
                        />
                        </View>
                    </View>
                </View>
                <View style={resultStyle.resultRectangleShape}>
                    <View style={resultStyle.resultHeader}>
                        <Text style={resultStyle.headerText}>Results</Text>
                    </View>
                    <Text style={resultStyle.resultText}>
                        {ripe_text}
                    </Text>
                    <View style={resultStyle.days}>
                        <Progress.Circle
                        animated={true}
                        color={spinner}
                        textStyle={resultStyle.progressText}
                        borderColor={'#D9D9D9'}
                        thickness={30}
                        showsText={true}
                        unfilledColor={'#D9D9D9'}
                        direction={'counter-clockwise'}
                        progress={ripe_percentage} 
                        size={200}  />
                        <Text style={resultStyle.titleText}>
                        Ripe Percentage: {new_ripe} %
                    </Text>
                    </View>
                    <View style={resultStyle.days}>
                        <Text style={resultStyle.baseText}>{ days_left}</Text>
                        <Text style={resultStyle.baseText}>
                            Days Left
                        </Text>
                    </View>
                    <View style={resultStyle.days}>
                        <Text style={resultStyle.baseText}>Humidity</Text>
                        <Text style={resultStyle.baseText}> 80%
                        </Text>
                    </View>
                    <View style={resultStyle.days}>
                        <Text style={resultStyle.baseText}> Temperature</Text>
                        <Text style={resultStyle.baseText}>
                            25&deg; C
                        </Text>
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}