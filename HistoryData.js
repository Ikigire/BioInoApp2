import * as React from "react";
import {Text, View, Image } from "react-native";
import styles from './Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const s = require("./Styles")

function HistoryData() {
    return(
        <View style={{fontSize: 20, flex: 1, paddingHorizontal: 30, marginHorizontal: 30, textAlign: 'left', justifyContent: 'left', justifyContent: "center"}}>
        <Text>{'Cantidad'}</Text>
        <Image source={require('./assets/co2gra.jpg')} style={{ width: 270, height: 250 }} />
        <Text>{'Tiempo \n'}</Text>
        <Text>{'Sensor Valor Actual \n'}</Text>
        <Text>{'03                550PPM'}</Text>
        </View>
        
    );
}

export default HistoryData;