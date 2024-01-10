import React from 'react'
import { Pressable, Text, View, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import s from './../Styles'
import { findDeviceIcon } from '../utils/icon.utils'
import SensorInfo from './SensorInfo'
// const s = require("../Styles")


const Device = ({ device, navigation, showSensorInfo = false, interval = 5000, navigate = true}) => {
    if (!device) {
        return (
            <Text style={{ width: '100%', height: 80, fontSize: 14, textAlign: 'center' }}>
                No se recibío información de dispositivo
            </Text>
        );
    }
    const icon = findDeviceIcon(device.establecimiento, device.grupo);
    return (
        <Pressable style={s.card} onPress={() => { navigate ? navigation.navigate("Mqtt", {mac: device.idDispositivo}) : null }}>
            <Text style={s.card_title}> {device.nombreDispositivo} </Text>
            <View style={{display: 'flex', width: '100%', marginBottom:8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <MaterialCommunityIcons name={icon} size={40} color={'#fff'} />
                <View>
                    <Text style={[s.card_text, {textAlign: 'center'}]}> Ubicación: </Text>
                    <Text style={[s.card_text, {textAlign: 'center'}]}> {`${device.establecimiento} - ${device.grupo}`} </Text>
                    <Text style={[s.card_text, {textAlign: 'center'}]}> Modelo: </Text>
                    <Text style={[s.card_text, {textAlign: 'center'}]}> {device.modelo} </Text>
                </View>
            </View>
            <SensorInfo mac={device.idDispositivo} showSensorInfo={showSensorInfo} intervalTime={interval}/>
        </Pressable>
    )
}

export default Device