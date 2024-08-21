import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { findDeviceIcon } from '../utils/icon.utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteDispositivo } from '../services/dispositivo.service';
import { useAppContext } from '../utils/app-context';
import { getDispositivoSensoresInfo } from '../services/mqtt.service';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usuarioItemKey } from "./../utils/constantes";


const estilo = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: '#1D6FB8',
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        // alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginVertical: 3
    },
    textContainer: {
        width: '75%',
        // overflow: 'hidden'
    },
    title: {
        fontSize: 20,
        // textAlign: 'center',
    },
    subTitle: {
        fontSize: 14
    },
    sensorInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});

const roundNumber = (number) => {
    number = parseFloat(number);
    if ((number - parseInt(number)) > 0.5) {
        number = Math.ceil(number);
    } else {
        number = Math.floor(number);
    }
    return number;
}

const SmallDeviceView = ({ device, navigation }) => {
    if (!device) {
        return (
            <Text style={{ width: '100%', height: 80, fontSize: 14, textAlign: 'center' }}>
                No se recibío información de dispositivo
            </Text>
        );
    }

    const [deviceSensor, setDeviceSensor] = useState(undefined);

    const { setUpdateEstList } = useAppContext();

    const eliminarDispositivo = async () => {
        try {
            const usuario = await AsyncStorage.getItem(usuarioItemKey);
    
            const { idUsuario } = JSON.parse(usuario);
            deleteDispositivo(device.idDispositivo, idUsuario)
                .then(async resp => {
                    if (resp.status != 200) {
                        console.error(await resp.json);
                        return;
                    }
    
                    setUpdateEstList(true);
                })
                .catch(error => console.error(error));
            
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const handleTrashIconPress = () => {
        Alert.alert(
            `Está a punto de eliminar el dispositivo ${device.nombreDispositivo}`,
            '¿Está seguro?',
            [
                { text: 'Si, Eliminalo', onPress: () => eliminarDispositivo() },
                { text: 'No, Cancela', onPress: () => { } },
            ],
            {
                cancelable: true
            }
        )
    }

    useEffect(() => {
        getDispositivoSensoresInfo(device.idDispositivo)
            .then(async resp => {
                if (resp.status != 200) {
                    const { message } = await (resp.json());
                    throw new Error(message);
                }
                const data = await resp.json();
                setDeviceSensor(data);
            })
            .catch(error => {
                setDeviceSensor(null);
            });
    }, [])

    const handlePress = () => {
        if (!navigation)
            return

        navigation.navigate('Mqtt', { mac: device.idDispositivo });
    }

    const icon = findDeviceIcon(device.establecimiento, device.grupo);

    return (
        <Pressable
            onPress={handlePress}
            style={estilo.container}
        >
            {
                icon ?
                    <MaterialCommunityIcons name={device.icon} size={35} color={'#1D6FB8'} />
                    :
                    <></>
            }
            <View style={estilo.textContainer}>
                <Text style={estilo.title}>{device.alias}</Text>
                {/* <Text style={estilo.subTitle}>{device.idDispositivo}</Text> */}
                <View>
                    {
                        !deviceSensor ?
                            <>
                                <Text style={estilo.subTitle}>{device.idDispositivo}</Text>
                            </>
                            :
                            <>

                                <View style={[{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }]}>
                                    <View style={[estilo.sensorInfoContainer]}>
                                        {/* <MaterialCommunityIcons name='air-humidifier' size={30} /> */}
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>H: </Text>
                                        <Text>{roundNumber(deviceSensor.h)}%</Text>
                                    </View>
                                    <View style={[estilo.sensorInfoContainer]}>
                                        {/* <MaterialCommunityIcons name='temperature-celsius' size={30} /> */}
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>T: </Text>
                                        <Text>{roundNumber(deviceSensor.t)}<Text style={{ fontSize: 22 }}>°</Text>C</Text>
                                    </View>
                                </View>
                            </>

                    }
                </View>
            </View>
            <MaterialCommunityIcons color={'red'} name='trash-can-outline' size={27} onPress={handleTrashIconPress} />
        </Pressable>
    )
}

export default SmallDeviceView