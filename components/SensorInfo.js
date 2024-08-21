import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getDispositivoSensoresInfo } from '../services/mqtt.service'
import HumidityInfo from './HumidityInfo'
import TemperatureInfo from './TemperatureInfo'
import CO2Info from './CO2Info'
import VOCInfo from './VOCInfo'

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
    dataContainer: {
        width: '50%',
        display: 'flex',
        paddingStart: '10%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    containerDetail: {
        backgroundColor: '#fff',
        width: '100%',
        minHeight: 26,
        borderRadius: 15,
        paddingHorizontal: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
            color = '#0275d8';
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
            color = '#f0da81';

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
    sensorCo2Value: (value) => {
        let color = '';
        if (value < 699)
            color = '#193919';

        if (value >= 700 && value <= 899)
            color = '#388038';

        if (value >= 900 && value <= 1099)
            color = '#5cb85c';

        if (value >= 1100 && value <= 1599)
            color = '#f0da81';

        if (value > 1599)
            color = '#ff4d55';
        return ({
            fontSize: 18,
            fontWeight: 'bold',
            color
        });
    },
    sensorVocValue: (value) => {
        let color = '';
        if (value < 221)
            color = '#388038';

        if (value >= 221 && value <= 660)
            color = '#5cb85c';

        if (value >= 661 && value <= 1430)
            color = '#f0da81';

        if (value > 1430)
            color = '#ff4d55';
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
    sensores,
    intervalTime = 10000
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
    const [showCO2Detail, setShowCO2Detail] = useState(false);
    const [showVOCDetail, setshowVOCDetail] = useState(false);
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
    const toggleShowCO2Detail = () => {
        setShowCO2Detail(prev => !prev);
    }
    const toggleShowVOCDetail = () => {
        setshowVOCDetail(prev => !prev);
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
    "".toLowerCase
    return (
        <>
            < >
                <Pressable style={[estilo.container(connectionStatus, !showSensorInfo)]}
                    onPress={toggleShowValuesDetail}
                >
                    {
                        showSensorInfo ?
                            (
                                connectionStatus == statusValues.conectado ?
                                    (
                                        <>
                                            <View style={[estilo.dataContainer]}>
                                                {
                                                    sensores.map(sen => sen.tipo.toLowerCase()).includes('h') ?
                                                        <View style={[estilo.sensorInfoContainer]}>
                                                            {/* <MaterialCommunityIcons name='air-humidifier' size={30} /> */}
                                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>H: </Text>
                                                            <Text style={estilo.sensorHumiValue(deviceSensor.h)}>{roundNumber(deviceSensor.h)}%</Text>
                                                        </View>

                                                        :
                                                        <></>
                                                }
                                                {
                                                    sensores.map(sen => sen.tipo.toLowerCase()).includes('c') ?
                                                        <View style={[estilo.sensorInfoContainer]}>
                                                            {/* <MaterialCommunityIcons name='temperature-celsius' size={30} /> */}
                                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>C: </Text>
                                                            <Text style={estilo.sensorCo2Value(deviceSensor.c)}>{roundNumber(deviceSensor.c)}<Text style={{ fontSize: 17 }}> PPM</Text></Text>
                                                        </View>

                                                        :
                                                        <></>
                                                }
                                            </View>
                                            <View style={[estilo.dataContainer]}>
                                                {
                                                    sensores.map(sen => sen.tipo.toLowerCase()).includes('t') ?
                                                        <View style={[estilo.sensorInfoContainer]}>
                                                            {/* <MaterialCommunityIcons name='temperature-celsius' size={30} /> */}
                                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>T: </Text>
                                                            <Text style={estilo.sensorTempValue(deviceSensor.t)}>{roundNumber(deviceSensor.t)}<Text style={{ fontSize: 17 }}>°C</Text></Text>
                                                        </View>

                                                        :
                                                        <></>
                                                }

                                                {
                                                    sensores.map(sen => sen.tipo.toLowerCase()).includes('v') ?
                                                        <View style={[estilo.sensorInfoContainer]}>
                                                            {/* <MaterialCommunityIcons name='temperature-celsius' size={30} /> */}
                                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>V: </Text>
                                                            <Text style={estilo.sensorVocValue(deviceSensor.v)}>{roundNumber(deviceSensor.v)}<Text style={{ fontSize: 17 }}> PPB</Text></Text>
                                                        </View>

                                                        :
                                                        <></>
                                                }
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
                        <View>
                            {
                                sensores.map(sen => sen.tipo.toLowerCase()).includes('h') ?
                                    <Pressable style={[estilo.containerDetail, { marginTop: 12 }]} onPress={toggleShowHumidityDetail}>
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
                                    :
                                    <></>
                            }

                            {
                                sensores.map(sen => sen.tipo.toLowerCase()).includes('t') ?
                                    <Pressable style={[estilo.containerDetail, { marginTop: 12 }]} onPress={toggleShowTemperatureDetail}>
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
                                    :
                                    <></>
                            }

                            {
                                sensores.map(sen => sen.tipo.toLowerCase()).includes('c') ?
                                    <Pressable style={[estilo.containerDetail, { marginTop: 12 }]} onPress={toggleShowCO2Detail}>
                                        <View style={[estilo.containerTitle]}>
                                            <Text>Niveles de CO2 </Text>
                                            <MaterialCommunityIcons name='arrow-down-drop-circle-outline' size={20} />
                                        </View>
                                        {
                                            showCO2Detail ?
                                                <View style={[estilo.container(statusValues.conectado)]}>
                                                    <CO2Info />
                                                </View>
                                                :
                                                <></>
                                        }
                                    </Pressable>
                                    :
                                    <></>
                            }

                            {
                                sensores.map(sen => sen.tipo.toLowerCase()).includes('v') ?
                                    <Pressable style={[estilo.containerDetail, { marginTop: 12 }]} onPress={toggleShowVOCDetail}>
                                        <View style={[estilo.containerTitle]}>
                                            <Text>Niveles de VOC </Text>
                                            <MaterialCommunityIcons name='arrow-down-drop-circle-outline' size={20} />
                                        </View>
                                        {
                                            showVOCDetail ?
                                                <View style={[estilo.container(statusValues.conectado)]}>
                                                    <VOCInfo />
                                                </View>
                                                :
                                                <></>
                                        }
                                    </Pressable>
                                    :
                                    <></>
                            }

                        </View>
                    ) :
                        (
                            <></>
                        )

                }
            </>
        </>
    )
}

export default SensorInfo