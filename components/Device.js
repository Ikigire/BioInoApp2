import React from 'react'
import { Pressable, Text, View, Image, ScrollView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import s from './../Styles'
import { findDeviceIcon } from '../utils/icon.utils'
import SensorInfo from './SensorInfo'

const Device = ({ device, navigation, showSensorInfo = false, interval = 8000, navigate = true, connect = true, destination = 'Mqtt'}) => {
    if (!device) {
        return (
            <Text style={{ width: '100%', height: 80, fontSize: 14, textAlign: 'center' }}>
                No se recibió información de dispositivo
            </Text>
        );
    }

    const navigateTo = () => {
        if (!navigate) {
            return;
        }
        
        switch (destination) {
            case "Mqtt":
                navigation.navigate(destination, {mac: device.idDispositivo})
                break;
        
            case "Histo":
                navigation.navigate(destination, {device})
                break;
            
            case "graphics":
                navigation.navigate(destination, {mac: device.idDispositivo, device})
                break;
        
            default:
                break;
        }
    };

    const icon = findDeviceIcon(device.establecimiento, device.grupo);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Pressable style={s.card} onPress={navigateTo}>
                <Text style={s.card_title}> {device.alias} </Text>
                <Text style={s.card_subtitle}> {device.idDispositivo} </Text>
                <View style={{ display: 'flex', width: '100%', marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <MaterialCommunityIcons name={device.icon} size={50} color={'#fff'} />
                    <View>
                        <Text style={[s.card_text, { textAlign: 'center' }]}> Ubicación: </Text>
                        <Text style={[s.card_text, { textAlign: 'center' }]}> {`${device.ubicacion}`} </Text>
                        <Text style={[s.card_text, { textAlign: 'center' }]}> Modelo: </Text>
                        <Text style={[s.card_text, { textAlign: 'center' }]}> {device.modelo} </Text>
                    </View>
                </View>
                {connect ? 
                    (<SensorInfo mac={device.idDispositivo} sensores={device.sensores} showSensorInfo={showSensorInfo} intervalTime={interval} />)
                    : <></>
                }
            </Pressable>
        </ScrollView>
    );
}

export default Device
