import React from 'react'
import { Pressable, Text, View, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import s from './../Styles'
import { findDeviceIcon } from '../utils/icon.utils'
import SensorInfo from './SensorInfo'
// const s = require("../Styles")


const Device = ({ device }) => {
    if (!device) {
        return (
            <Text style={{ width: '100%', height: 80, fontSize: 14, textAlign: 'center' }}>
                No se recibío información de dispositivo
            </Text>
        );
    }
    const icon = findDeviceIcon(device.establecimiento, device.grupo);
    return (
        <View style={s.card}>
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
            <SensorInfo mac={device.idDispositivo} />
        </View>
    )
}

export default Device