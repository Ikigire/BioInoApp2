import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import { getDeviceGraphicHistoricalData } from './services/historical.service';
import { Dropdown } from 'react-native-element-dropdown';
// import { ECharts } from "react-native-echarts-wrapper";
import { LineChart } from 'react-native-chart-kit';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
    },
    graphicContainer: {
        marginTop: 35
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: '#fff',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    legend: {
        position: 'relative'

    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    titulo: {
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center'
    },
    separador: {
        width: '100%',
        height: 2,
        backgroundColor: '#fff'
    }
});

const GraphicHistory = ({ route, navigation }) => {
    const { mac, device: { sensores } } = route.params;
    const tipoSensores = sensores.map(sensor => String(sensor.tipo).toLowerCase());
    console.info("Dispositivo para el historico", tipoSensores);


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [period, setPeriod] = React.useState("");
    const [isFocus, setIsFocus] = React.useState(false);

    const periods = [

        { label: '24 horas', value: '24h' },
        { label: '1 semana', value: 'w' },
        { label: '2 semanas', value: '2w' },
        { label: '1 mes', value: 'm' },
        { label: '6 meses', value: '6m' },
        { label: '1 año', value: 'y' },
    ]

    // const graphicData = {
    //     xAxis: {
    //         type: "category",
    //         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    //     },
    //     yAxis: {
    //         type: "value"
    //     },
    //     series: [
    //         {
    //             data: [820, 932, 901, 934, 1290, 1330, 1320],
    //             type: "line"
    //         }
    //     ]
    // };

    const getTemperatureGraphicData = () => {
        if (data) {
            const labels = []
            const tempMeanData = []
            const tempMinData = []
            const tempMaxData = []

            data.results.forEach(val => {
                let periodoEnEspañol = '';

                if (val.name.startsWith('day')) {
                    const dn = val.name.slice(3); // Elimina 'day' del principio para obtener solo el número
                    periodoEnEspañol = `${dn} Dia`;
                } else if (val.name.startsWith('week')) {
                    const sn = val.name.slice(4); // Elimina 'week' del principio para obtener solo el número
                    periodoEnEspañol = `${sn} Semana`;
                } else if (val.name.startsWith('month')) {
                    const mn = val.name.slice(5); // Elimina 'month' del principio para obtener solo el número
                    periodoEnEspañol = `${mn} Mes`;
                }
                else {
                    periodoEnEspañol = val.name; // Si no es uno de los períodos esperados, mantén el valor original
                }

                labels.push(`${periodoEnEspañol}`);
                tempMeanData.push(val.mean.temp);
                tempMinData.push(val.min.temp);
                tempMaxData.push(val.max.temp);
            });

            return {
                labels,
                legend: ['Promedio', 'Mínimo', 'Máximo'],
                datasets: [
                    {
                        data: tempMeanData,
                        color: (opacity = 1) => `rgba(98, 0, 255, ${opacity})`, // optional
                        strokeWidth: 4 // optional
                    },
                    {
                        data: tempMinData,
                        color: (opacity = 1) => `rgba(17, 241, 85, ${opacity})`, // optional
                        strokeWidth: 4 // optional
                    },
                    {
                        data: tempMaxData,
                        color: (opacity = 1) => `rgba(255, 21, 33, ${opacity})`, // optional                
                        strokeWidth: 4 // optional
                    }
                ]
            }
        }

        return {};
    }
    const getHumidityGraphicData = () => {
        if (data) {
            const labels = []
            const humiMeanData = []
            const humiMinData = []
            const humiMaxData = []

            data.results.forEach(val => {
                let periodoEnEspañol = '';


                if (val.name.startsWith('day')) {
                    const dn = val.name.slice(3); // Elimina 'day' del principio para obtener solo el número
                    periodoEnEspañol = `${dn} Dia`;
                } else if (val.name.startsWith('week')) {
                    const sn = val.name.slice(4); // Elimina 'week' del principio para obtener solo el número
                    periodoEnEspañol = `${sn} Semana`;
                } else if (val.name.startsWith('month')) {
                    const mn = val.name.slice(5); // Elimina 'month' del principio para obtener solo el número
                    periodoEnEspañol = `${mn} Mes`;
                }
                else {
                    periodoEnEspañol = val.name; // Si no es uno de los períodos esperados, mantén el valor original
                }

                labels.push(`${periodoEnEspañol}`);
                humiMeanData.push(val.mean.temp);
                humiMinData.push(val.min.temp);
                humiMaxData.push(val.max.temp);
            });

            return {
                labels,
                legend: ['Promedio', 'Mínimo', 'Máximo'],
                datasets: [
                    {
                        data: humiMeanData,
                        color: (opacity = 1) => `rgba(98, 0, 255, ${opacity})`, // optional
                        strokeWidth: 4 // optional
                    },
                    {
                        data: humiMinData,
                        color: (opacity = 1) => `rgba(17, 241, 85, ${opacity})`, // optional
                        strokeWidth: 4 // optional
                    },
                    {
                        data: humiMaxData,
                        color: (opacity = 1) => `rgba(255, 21, 33, ${opacity})`, // optional                strokeWidth: 4 // optional
                    }
                ]
            }
        }

        return {};
    }

    const getCO2GraphicData = () => {
        if (data) {
            const labels = []
            const co2MeanData = []
            const co2MinData = []
            const co2MaxData = []

            data.results.forEach(val => {
                let periodoEnEspañol = '';

                if (val.name.startsWith('day')) {
                    const dn = val.name.slice(3); // Elimina 'day' del principio para obtener solo el número
                    periodoEnEspañol = `${dn} Dia`;
                } else if (val.name.startsWith('week')) {
                    const sn = val.name.slice(4); // Elimina 'week' del principio para obtener solo el número
                    periodoEnEspañol = `${sn} Semana`;
                } else if (val.name.startsWith('month')) {
                    const mn = val.name.slice(5); // Elimina 'month' del principio para obtener solo el número
                    periodoEnEspañol = `${mn} Mes`;
                }
                else {
                    periodoEnEspañol = val.name; // Si no es uno de los períodos esperados, mantén el valor original
                }

                labels.push(`${periodoEnEspañol}`);
                co2MeanData.push(val.mean.co2);
                co2MinData.push(val.min.co2);
                co2MaxData.push(val.max.co2);
            });

            return {
                labels,
                legend: ['Promedio', 'Mínimo', 'Máximo'],
                datasets: [
                    {
                        data: co2MeanData,
                        color: (opacity = 1) => `rgba(98, 0, 255, ${opacity})`, // optional
                        strokeWidth: 4 // optional
                    },
                    {
                        data: co2MinData,
                        color: (opacity = 1) => `rgba(17, 241, 85, ${opacity})`, // optional
                        strokeWidth: 4 // optional
                    },
                    {
                        data: co2MaxData,
                        color: (opacity = 1) => `rgba(255, 21, 33, ${opacity})`, // optional                
                        strokeWidth: 4 // optional
                    }
                ]
            }
        }

        return {};
    }
    const getVOCGraphicData = () => {
        if (data) {
            const labels = []
            const vocMeanData = []
            const vocMinData = []
            const vocMaxData = []

            data.results.forEach(val => {
                let periodoEnEspañol = '';

                if (val.name.startsWith('day')) {
                    const dn = val.name.slice(3); // Elimina 'day' del principio para obtener solo el número
                    periodoEnEspañol = `${dn} Dia`;
                } else if (val.name.startsWith('week')) {
                    const sn = val.name.slice(4); // Elimina 'week' del principio para obtener solo el número
                    periodoEnEspañol = `${sn} Semana`;
                } else if (val.name.startsWith('month')) {
                    const mn = val.name.slice(5); // Elimina 'month' del principio para obtener solo el número
                    periodoEnEspañol = `${mn} Mes`;
                }
                else {
                    periodoEnEspañol = val.name; // Si no es uno de los períodos esperados, mantén el valor original
                }

                labels.push(`${periodoEnEspañol}`);
                vocMeanData.push(val.mean.voc);
                vocMinData.push(val.min.voc);
                vocMaxData.push(val.max.voc);
            });

            return {
                labels,
                legend: ['Promedio', 'Mínimo', 'Máximo'],
                datasets: [
                    {
                        data: vocMeanData,
                        color: (opacity = 1) => `rgba(98, 0, 255, ${opacity})`, // optional
                        strokeWidth: 4 // optional
                    },
                    {
                        data: vocMinData,
                        color: (opacity = 1) => `rgba(17, 241, 85, ${opacity})`, // optional
                        strokeWidth: 4 // optional
                    },
                    {
                        data: vocMaxData,
                        color: (opacity = 1) => `rgba(255, 21, 33, ${opacity})`, // optional                
                        strokeWidth: 4 // optional
                    }
                ]
            }
        }

        return {};
    }

    let graphicData = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        legend: ['Promedio', 'Mínimo', 'Máximo'],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ],
                color: (opacity = 1) => `rgba(98, 0, 255, ${opacity})`, // optional
                strokeWidth: 4 // optional
            },
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ],
                color: (opacity = 1) => `rgba(17, 241, 85, ${opacity})`, // optional
                strokeWidth: 4 // optional
            },
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ],
                color: (opacity = 1) => `rgba(255, 21, 33, ${opacity})`, // optional                strokeWidth: 4 // optional
            }
        ],
        // legend: ['Me la', 'Pelas'],
    };
    useEffect(() => {
        getDeviceGraphicHistoricalData(mac, period)
            .then(async resp => {
                console.log(resp.status);
                setLoading(false);

                if (resp.status == 204) {
                    setData(null);
                    return;
                }

                if (resp.status != 200) {
                    setData(null)
                    return;
                }

                setData((await resp.json()));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [period])

    // useEffect(() => {
    //     console.info(data);

    // }, [data])

    return (
        <View style={{ flex: 1 }}>
            <Dropdown
                mode="modal"
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }, { minWidth: '50%' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={periods}
                maxHeight={'95%'}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Periodo de tiempo' : '...'}
                searchPlaceholder="Buscar..."
                value={period}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setPeriod(item.value);
                    setIsFocus(false);
                    setLoading(true);
                }}
            />
            <ScrollView style={{ marginVertical: 5, paddingHorizontal: 10 }}>
                {
                    loading ?
                        <ActivityIndicator size={'large'} />
                        :
                        period ?
                            data ?
                                <>
                                    {
                                        tipoSensores.includes('t') ?
                                            <>
                                                <View>
                                                    <Text style={styles.titulo}>Temperatura</Text>
                                                    <ScrollView horizontal>
                                                        <LineChart
                                                            data={getTemperatureGraphicData()}
                                                            width={Dimensions.get("window").width * 3}
                                                            height={220}
                                                            yAxisLabel=""
                                                            yAxisSuffix="°"
                                                            chartConfig={{
                                                                backgroundColor: "#e8e8e8",
                                                                backgroundGradientFrom: "#e8e8e8",
                                                                backgroundGradientTo: "#e8e8e8",
                                                                decimalPlaces: 2,
                                                                color: () => `rgba(0, 0, 0, 1)`,
                                                                labelColor: () => `rgba(0, 0, 0, 1)`,
                                                                scrollableDotStrokeColor: '#1D6FB8',
                                                                useShadowColorFromDataset: true,
                                                                style: {
                                                                    borderRadius: 16
                                                                },
                                                                propsForDots: {
                                                                    r: "6",
                                                                    strokeWidth: "2",
                                                                    stroke: "#ffa726"
                                                                }
                                                            }}
                                                            bezier
                                                            style={{
                                                                marginVertical: 8,
                                                                borderRadius: 16
                                                            }}
                                                        />
                                                    </ScrollView>
                                                    <Text>Mediana: {data.median.temp}°C</Text>
                                                    <Text>Moda: {data.mode.temp}°C</Text>
                                                    <Text>Promedio: {data.mean.temp}°C</Text>
                                                </View>
                                            </>
                                            :
                                            <></>
                                    }

                                    {
                                        tipoSensores.includes('h') ?
                                            <>
                                                <View style={styles.graphicContainer}>
                                                    <View style={styles.separador}></View>
                                                    <Text style={styles.titulo}>Humedad</Text>
                                                    <ScrollView horizontal>
                                                        <LineChart
                                                            data={getHumidityGraphicData()}
                                                            width={Dimensions.get("window").width * 3}
                                                            height={220}
                                                            yAxisLabel=""
                                                            yAxisSuffix="%"
                                                            chartConfig={{
                                                                backgroundColor: "#e8e8e8",
                                                                backgroundGradientFrom: "#e8e8e8",
                                                                backgroundGradientTo: "#e8e8e8",
                                                                decimalPlaces: 2,
                                                                color: () => `rgba(0, 0, 0, 1)`,
                                                                labelColor: () => `rgba(0, 0, 0, 1)`,
                                                                scrollableDotStrokeColor: '#1D6FB8',
                                                                useShadowColorFromDataset: true,
                                                                style: {
                                                                    borderRadius: 16
                                                                },
                                                                propsForDots: {
                                                                    r: "6",
                                                                    strokeWidth: "2",
                                                                    stroke: "#ffa726"
                                                                }
                                                            }}
                                                            style={{
                                                                marginVertical: 8,
                                                                borderRadius: 16
                                                            }}
                                                        />
                                                    </ScrollView>
                                                    <Text>Mediana: {data.median.humidity}%</Text>
                                                    <Text>Moda: {data.mode.humidity}%</Text>
                                                    <Text>Promedio: {data.mean.humidity}%</Text>
                                                </View>
                                            </>
                                            :
                                            <></>
                                    }

                                    {
                                        tipoSensores.includes('c') ?
                                            <>
                                                <View style={styles.graphicContainer}>
                                                    <View style={styles.separador}></View>
                                                    <Text style={styles.titulo}>CO2</Text>
                                                    <ScrollView horizontal>
                                                        <LineChart
                                                            data={getCO2GraphicData()}
                                                            width={Dimensions.get("window").width * 3}
                                                            height={220}
                                                            yAxisLabel=""
                                                            yAxisSuffix=" PPM"
                                                            chartConfig={{
                                                                backgroundColor: "#e8e8e8",
                                                                backgroundGradientFrom: "#e8e8e8",
                                                                backgroundGradientTo: "#e8e8e8",
                                                                decimalPlaces: 2,
                                                                color: () => `rgba(0, 0, 0, 1)`,
                                                                labelColor: () => `rgba(0, 0, 0, 1)`,
                                                                scrollableDotStrokeColor: '#1D6FB8',
                                                                useShadowColorFromDataset: true,
                                                                style: {
                                                                    borderRadius: 16
                                                                },
                                                                propsForDots: {
                                                                    r: "6",
                                                                    strokeWidth: "2",
                                                                    stroke: "#ffa726"
                                                                }
                                                            }}
                                                            style={{
                                                                marginVertical: 8,
                                                                borderRadius: 16
                                                            }}
                                                        />
                                                    </ScrollView>
                                                    <Text>Mediana: {data.median.co2} PPM</Text>
                                                    <Text>Moda: {data.mode.co2} PPM</Text>
                                                    <Text>Promedio: {data.mean.co2} PPM</Text>
                                                </View>
                                            </>
                                            :
                                            <></>
                                    }

                                    {
                                        tipoSensores.includes('v') ?
                                            <>
                                                <View style={styles.graphicContainer}>
                                                    <View style={styles.separador}></View>
                                                    <Text style={styles.titulo}>VOC</Text>
                                                    <ScrollView horizontal>
                                                        <LineChart
                                                            data={getVOCGraphicData()}
                                                            width={Dimensions.get("window").width * 3}
                                                            height={220}
                                                            yAxisLabel=""
                                                            yAxisSuffix=" PPB"
                                                            chartConfig={{
                                                                backgroundColor: "#e8e8e8",
                                                                backgroundGradientFrom: "#e8e8e8",
                                                                backgroundGradientTo: "#e8e8e8",
                                                                decimalPlaces: 2,
                                                                color: () => `rgba(0, 0, 0, 1)`,
                                                                labelColor: () => `rgba(0, 0, 0, 1)`,
                                                                scrollableDotStrokeColor: '#1D6FB8',
                                                                useShadowColorFromDataset: true,
                                                                style: {
                                                                    borderRadius: 16
                                                                },
                                                                propsForDots: {
                                                                    r: "6",
                                                                    strokeWidth: "2",
                                                                    stroke: "#ffa726"
                                                                }
                                                            }}
                                                            style={{
                                                                marginVertical: 8,
                                                                borderRadius: 16
                                                            }}
                                                        />
                                                    </ScrollView>
                                                    <Text>Mediana: {data.median.voc} PPB</Text>
                                                    <Text>Moda: {data.mode.voc} PPB</Text>
                                                    <Text>Promedio: {data.mean.voc} PPB</Text>
                                                </View>
                                            </>
                                            :
                                            <></>
                                    }
                                </>
                                :
                                <Text style={{ textAlign: 'center', width: '90%', marginTop: 35, fontSize: 20 }}>
                                    No se encontraron datos, intente seleccionando otro periodo.
                                </Text>
                            :
                            <Text style={{ textAlign: 'center', width: '90%', marginTop: 35, fontSize: 20 }}>
                                Seleccione un periodo para graficar.
                            </Text>
                }
            </ScrollView>
        </View>
    );
}


export default GraphicHistory