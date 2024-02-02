import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import { getDeviceGraphicHistoricalData } from './services/historical.service';
import { Dropdown } from 'react-native-element-dropdown';
// import { ECharts } from "react-native-echarts-wrapper";
import { LineChart } from 'react-native-chart-kit';


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
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
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
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
    }
});

const GraphicHistory = ({ route, navigation }) => {
    const { mac } = route.params;


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
            // console.log(Object.keys(data));
            data.results.forEach(val => {
                labels.push(`${val.name}`);
                tempMeanData.push(val.mean.temp);
                tempMinData.push(val.min.temp);
                tempMaxData.push(val.max.temp);
            });

            console.log(labels);
            console.log(tempMeanData);
            // console.log(humiMeanData);

            return {
                labels,
                legend: ['Promedio', 'Mínimo', 'Máximo'],
                datasets: [
                    {
                        data: tempMeanData,
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    },
                    {
                        data: tempMinData,
                        color: (opacity = 1) => `rgba(96, 133, 210, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    },
                    {
                        data: tempMaxData,
                        color: (opacity = 1) => `rgba(236, 57, 84, ${opacity})`, // optional
                        strokeWidth: 2 // optional
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
            // console.log(Object.keys(data));
            data.results.forEach(val => {
                labels.push(`${val.name} ago`);
                humiMeanData.push(val.mean.humidity);
                humiMinData.push(val.min.humidity);
                humiMaxData.push(val.max.humidity);
            });

            console.log(labels);
            console.log(humiMeanData);
            // console.log(humiMeanData);

            return {
                labels,
                legend: ['Promedio', 'Mínimo', 'Máximo'],
                datasets: [
                    {
                        data: humiMeanData,
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    },
                    {
                        data: humiMinData,
                        color: (opacity = 1) => `rgba(96, 133, 210, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    },
                    {
                        data: humiMaxData,
                        color: (opacity = 1) => `rgba(236, 57, 84, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ]
            }
        }

        return {};
    }

    let graphicData = {
        labels: ["January", "February", "March", "April", "May", "June"],
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
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
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
                color: (opacity = 1) => `rgba(236, 57, 84, ${opacity})`, // optional
                strokeWidth: 2 // optional
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
                color: (opacity = 1) => `rgba(96, 133, 210, ${opacity})`, // optional
                strokeWidth: 2 // optional
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
        <View style={{flex: 1}}>
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
                searchPlaceholder="Search..."
                value={period}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setPeriod(item.value);
                    setIsFocus(false);
                    setLoading(true)
                }}
            />
            <ScrollView style={[{marginVertical: 5, paddingHorizontal: 10, height: 'calc'}]}>

                {
                    loading ?
                        <>
                            <ActivityIndicator size={'large'} />
                        </>
                        :

                        period ?
                            <>
                                {
                                    data ?
                                    <>
                                        {/* <ScrollView style={[{ marginTop: 5, paddingHorizontal: 10 }]}> */}
                                            {/* <View> */}
                                                <Text style={[styles.titulo]}>Datos de Temperatura</Text>
                                                <LineChart
                                                    data={getTemperatureGraphicData()}
                                                    width={Dimensions.get("window").width - 20}
                                                    height={220}
                                                    yAxisLabel=""
                                                    yAxisSuffix="°"
                                                    chartConfig={{
                                                        backgroundColor: "#1D6FB8",
                                                        backgroundGradientFrom: "#1D6FB8",
                                                        backgroundGradientTo: "#ffa726",
                                                        decimalPlaces: 2, // optional, defaults to 2dp
                                                        color: () => `rgba(255, 255, 255, ${1})`,
                                                        labelColor: () => `rgba(255, 255, 255, ${1})`,
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
                                                <Text>Temperatura media: {data.median.temp}°</Text>
                                                <Text>Temperatura moda: {data.mode.temp}°</Text>
                                                <Text>Temperatura promedio: {data.mean.temp}°</Text>
                                            {/* </View>
                                            <View> */}
                                                <Text style={[styles.titulo]}>Datos de Humedad</Text>
                                                <LineChart
                                                    data={getHumidityGraphicData()}
                                                    width={Dimensions.get("window").width - 20}
                                                    height={220}
                                                    yAxisLabel=""
                                                    yAxisSuffix=""
                                                    chartConfig={{
                                                        backgroundColor: "#1D6FB8",
                                                        backgroundGradientFrom: "#1D6FB8",
                                                        backgroundGradientTo: "#ffa726",
                                                        decimalPlaces: 2, // optional, defaults to 2dp
                                                        color: () => `rgba(255, 255, 255, ${1})`,
                                                        labelColor: () => `rgba(255, 255, 255, ${1})`,
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
                                                <Text>Humedad media: {data.median.humidity}</Text>
                                                <Text>Humedad moda: {data.mode.humidity}</Text>
                                                <Text>Humedad promedio: {data.mean.humidity}</Text>
                                            {/* </View> */}
                                        {/* </ScrollView> */}
                                    </>
                                        :
                                        <>
                                            <Text style={[{ textAlign: 'center', width: '90%', marginTop: 35, fontSize: 20 }]}>
                                                No se econtrarón datos, intente seleccionando otro periodo
                                            </Text>
                                        </>

                                }
                            </>
                            :
                            <>
                                <Text style={[{ textAlign: 'center', width: '90%', marginTop: 35, fontSize: 20 }]}>
                                    Seleccione un periodo para graficar
                                </Text>
                            </>
                }
            </ScrollView>
        </View>
    )
}

export default GraphicHistory