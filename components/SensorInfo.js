import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getDispositivoSensoresInfo } from '../services/mqtt.service'
import HumidityInfo from './HumidityInfo'
import TemperatureInfo from './TemperatureInfo'

const statusValues = {
    conectando: 'Conectando...',
    sin_conexion: 'Desconectado',
    reconectando: 'Reconectando...',
    conectado: 'Conectado'
}

const estilo = StyleSheet.create({
    container: (status, onlyStatus = false) => {
        let bgColor = ''
        switch (status) {
            case statusValues.conectando:
                bgColor = '#f0da81'
                break;

            case statusValues.sin_conexion:
                bgColor = '#ff4d55'
                break;

            case statusValues.reconectando:
                bgColor = '#6ab1f7'
                break;

            default:
                bgColor = onlyStatus ? '#28a745' : '#fff'

                break;
        }
        return ({
            backgroundColor: bgColor,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 15,
            borderRadius: 15
        })
    },
    containerDetail: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        // justifyContent: 'space-around'
    },
    containerTitle: {
        backgroundColor: '#fff',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sensorInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    sensorTempValue: (value) => {
        let color = '';
        if (value < 8)
            color = '#17a2b8';

        if (value >= 8 && value < 15)
            color = '#6817b8';
        if (value >= 15 && value < 30)
            color = '#28a745';
        if (value >= 30 && value <= 40)
            color = '#ffc107';

        if (value > 40)
            color = '#dc3545';
        return ({
            fontSize: 18,
            fontWeight: 'bold',
            color
        });
    },
    sensorHumiValue: (value) => {
        let color = '';
        if (value < 40)
            color = '#dc3545';

        if (value >= 40 && value <= 60)
            color = '#28a745';

        if (value > 60)
            color = '#dc3545';
        return ({
            fontSize: 18,
            fontWeight: 'bold',
            color
        });
    },
    sensorStatus: {
        fontSize: 22
    }
})


const SensorInfo = ({ mac,
    showSensorInfo = true,
    intervalTime = 5000
}) => {
    if (!mac) {
        return (
            <View style={estilo.container(statusValues.sin_conexion)}>
                <Text style={estilo.sensorStatus}>
                    Faltan datos de dispositivo
                </Text>
            </View>
        );
    }
    const [connectionStatus, setConnectionStatus] = useState(statusValues.conectando);
    const [deviceSensor, setDeviceSensor] = useState({
        idDispositivo: "142800F7C630",
        h: 17.26,
        t: 56.06
    });
    const [reconectar, setReconectar] = useState(false);
    const [showValuesDetail, setShowValuesDetail] = useState(false);
    const [showHumidityDetail, setShowHumidityDetail] = useState(false);
    const [showTemperatureDetail, setShowTemperatureDetail] = useState(false);
    const [intervalId, setintervalId] = useState(null);
    // const [] = useState();


    const toggleShowValuesDetail = () => {
        // if (connectionStatus == statusValues.conectado) {
        setShowValuesDetail(prev => !prev);
        // }
    }

    const toggleShowHumidityDetail = () => {
        setShowHumidityDetail(prev => !prev);
    }

    const toggleShowTemperatureDetail = () => {
        setShowTemperatureDetail(prev => !prev);
    }

    const roundNumber = (number) => {
        number = parseFloat(number);
        if ((number - parseInt(number)) > 0.5) {
            number = Math.ceil(number);
        } else {
            number = Math.floor(number);
        }
        return number;
    }

    const getDeviceData = () => {
        // if (connectionStatus == statusValues.conectado) {
        //     console.info('Obteniendo datos: ', connectionStatus);
        //     console.log("ID activo: ", intervalId);
        // }
        getDispositivoSensoresInfo(mac)
            .then(async resp => {
                if (resp.status != 200) {
                    setConnectionStatus(statusValues.sin_conexion);
                    setReconectar(true);
                    return;
                }
                const data = await resp.json();
                setDeviceSensor(data);
                setConnectionStatus(statusValues.conectado);
            })
            .catch(error => {
                setConnectionStatus(statusValues.sin_conexion);
                setReconectar(true);
            });
    }

    useEffect(() => {
        getDeviceData();
    }, [])

    useEffect(() => {
        if (reconectar) {
            setTimeout(() => {
                setConnectionStatus(statusValues.reconectando)
                setReconectar(false);
                getDeviceData();
            }, intervalTime);
        }
    }, [reconectar])

    useEffect(() => {
        const id = setInterval(() => {
            if (connectionStatus == statusValues.conectado)
                getDeviceData();
        }, intervalTime);
        setintervalId(id);
    }, [connectionStatus])
    
    useEffect(() => {
        console.log("Nuevo interval Id:", intervalId);
        if (connectionStatus != statusValues.conectado) {
            // console.log("\n\nLimpiando intervalId", intervalId);
            clearInterval(intervalId);
        }

        return () => {
            // console.log("Limpiando las cosas", intervalId);
            clearInterval(intervalId);
        }
    }, [intervalId]);

    return (
        <>
            <Pressable style={[estilo.container(connectionStatus, !showSensorInfo)]}
                onPress={toggleShowValuesDetail}
            >
                {
                    showSensorInfo ?
                        (
                            connectionStatus == statusValues.conectado ?
                                (
                                    <>
                                        <View style={[estilo.sensorInfoContainer]}>
                                            {/* <MaterialCommunityIcons name='air-humidifier' size={30} /> */}
                                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>H: </Text>
                                            <Text style={estilo.sensorHumiValue(deviceSensor.h)}>{roundNumber(deviceSensor.h)}%</Text>
                                        </View>
                                        <View style={[estilo.sensorInfoContainer]}>
                                            {/* <MaterialCommunityIcons name='temperature-celsius' size={30} /> */}
                                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>T: </Text>
                                            <Text style={estilo.sensorTempValue(deviceSensor.t)}>{roundNumber(deviceSensor.t)}<Text style={{ fontSize: 22 }}>°C</Text></Text>
                                        </View>
                                    </>
                                ) :
                                <Text style={estilo.sensorStatus}>{connectionStatus}</Text>
                        )
                        :
                        (
                            <>
                                <Text style={[estilo.sensorStatus]}>{connectionStatus}</Text>
                            </>
                        )
                }
            </Pressable>
            {
                showSensorInfo ? (
                    <>
                        <Pressable style={[estilo.containerDetail, { marginTop: 8, justifyContent: 'space-between' }]} onPress={toggleShowHumidityDetail}>
                            <View style={[estilo.containerTitle]}>
                                <Text>Niveles de Humedad </Text>
                                <MaterialCommunityIcons name='arrow-down-drop-circle-outline' size={20} />
                            </View>
                            {
                                showHumidityDetail ?
                                    <View style={[estilo.container(statusValues.conectado)]}>
                                        <HumidityInfo />
                                    </View>
                                    :
                                    <></>

                            }
                        </Pressable>
                        <Pressable style={[estilo.containerDetail, { marginTop: 8, justifyContent: 'space-between' }]} onPress={toggleShowTemperatureDetail}>
                            <View style={[estilo.containerTitle]}>
                                <Text>Niveles de Temperatura </Text>
                                <MaterialCommunityIcons name='arrow-down-drop-circle-outline' size={20} />
                            </View>
                            {
                                showTemperatureDetail ?
                                    <View style={[estilo.container(statusValues.conectado)]}>
                                        <TemperatureInfo />
                                    </View>
                                    :
                                    <></>
                            }
                        </Pressable>
                    </>
                ) :
                    (
                        <></>
                    )
            }
        </>
    )
}

export default SensorInfo