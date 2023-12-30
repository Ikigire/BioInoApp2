import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getDispositivoSensoresInfo } from '../services/mqtt.service'

const statusValues = {
    conectando: 'Conectando...',
    sin_conexion: 'Sin conexión',
    reconectando: 'Reconectando...',
    conectado: 'Conectado'
}

const estilo = StyleSheet.create({
    container: (status) => {
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
                bgColor = '#fff'

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


const SensorInfo = ({ mac }) => {
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
    // const [] = useState();

    const toggleShowValuesDetail = () => {
        if (connectionStatus == statusValues.conectado) {
            setShowValuesDetail(prev => !prev);
        }
    }

    const getDeviceData = () => {
        if (connectionStatus == statusValues.conectado)
            console.info('Pbteniendo datos: ', connectionStatus);
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
            }, 3000);
        }
    }, [reconectar])

    useEffect(() => {
        if (connectionStatus == statusValues.conectado)
            setTimeout(() => {
                getDeviceData();
            }, 500);
    }, [deviceSensor])
    return (
        <>
            <Pressable style={[estilo.container(connectionStatus)]}
                onPress={toggleShowValuesDetail}
            >
                {
                    connectionStatus == statusValues.conectado ?
                        (
                            <>
                                <View style={[estilo.sensorInfoContainer]}>
                                    <MaterialCommunityIcons name='temperature-celsius' size={30} />
                                    <Text style={estilo.sensorTempValue(deviceSensor.t)}>{deviceSensor.t}</Text>
                                </View>
                                <View style={[estilo.sensorInfoContainer]}>
                                    <MaterialCommunityIcons name='air-humidifier' size={30} />
                                    <Text style={estilo.sensorHumiValue(deviceSensor.h)}>{deviceSensor.h}</Text>
                                </View>
                            </>
                        ) :
                        <Text style={estilo.sensorStatus}>{connectionStatus}</Text>
                }
            </Pressable>
            {
                showValuesDetail ? (
                    <View style={[estilo.container(connectionStatus), { marginTop: 8 }]}>
                        <Text>More Info</Text>
                    </View>
                ) :
                    (
                        <></>
                    )
            }
        </>
    )
}

export default SensorInfo