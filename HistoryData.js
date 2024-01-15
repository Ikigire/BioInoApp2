import { useEffect, useState } from 'react';
import { Text, View, Image, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import Device from './components/Device';
import { getDeviceHistorical } from './services/historical.service';
import FlashMessage from 'react-native-flash-message';
// import DatePicker from 'react-native-date-picker';
// import RNDateTimePicker from '@react-native-community/datetimepicker';

const s = require("./Styles")

function HistoryData({ route, navigation }) {
    const { device } = route.params;

    const [history, setHistory] = useState(null);
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const connectDynamoDB = () => {
        getDeviceHistorical(device.idDispositivo)
            .then(async resp => {
                if (resp.status !== 200) {
                    setHistory(null);
                    setLoading(false);
                    const error = await resp.json();
                    console.log(error);
                    this.flashMessage.showMessage({
                        message: error.message,
                        type: 'info',
                        icon: 'danger',
                        duration: 3500
                    });
                    return;
                }
                const data = await resp.json();
                console.log(data);
                setHistory(data);
                setLoading(false);
            })
            .catch((error => console.log(error)));
    };

    const getNextDataBunch = () => {
        // setLoadingMore(true);
        if (history.next) {
            getDeviceHistorical(device.idDispositivo, history.next)
                // fetch(history.next)
                .then(async resp => {
                    setLoadingMore(false);
                    if (resp.status !== 200) {
                        const error = await resp.json();
                        this.flashMessage.showMessage({
                            message: error.message,
                            type: 'danger',
                            icon: 'danger'
                        });
                        return;
                    }
                    const data = await resp.json();
                    // console.log(data);
                    setHistory(prev => ({
                        data: [...prev.data, ...data.data],
                        page: data.page,
                        next: data.next
                    }));
                    setLoading(false);
                })
                .catch((error => console.log(error)));
        }
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 5;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    }

    const onScrollToEnd = (event) => {
        if (isCloseToBottom(event.nativeEvent) && !loadingMore && history.next) {
            setLoadingMore(true);
        }
        // this.scroll.
    }

    const printDate = (timestamp) => {
        const date = new Date(+timestamp);
        const day = date.getDay();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month < 10 ? '0' + month : month}/${date.getFullYear()}`;
    }

    useEffect(() => {
        console.log(device);
        // setTimeout(() => {
        // setHistory(prev => ['abc', ...prev]);
        connectDynamoDB();
        // }, 3000);
    }, [])

    useEffect(() => {
        if (loadingMore) {
            this.scroll.scrollToEnd();
            getNextDataBunch();
        }
    }, [loadingMore])

    return (
        // <View style={{fontSize: 20, flex: 1, paddingHorizontal: 30, marginHorizontal: 30, textAlign: 'left', justifyContent: 'left', justifyContent: "center"}}>
        <View style={[s.container]}>
            <Device device={device} connect={false} navigate={false} />
            {/* <View style={[{ display: 'flex', justifyContent: 'center' }]}>
                <Text>{'Cantidad'}</Text>
                <Image source={require('./assets/co2gra.jpg')} style={{ width: 200, height: 180 }} />
                <Text>{'Tiempo \n'}</Text>
                <Text>{'Sensor Valor Actual \n'}</Text>
                <Text>{'03                550PPM'}</Text>
            </View> */}

            {/* <DatePicker mode='date' date={dateFrom} onDateChange={setDateFrom} >
                <RNDateTimePicker  />
            </DatePicker> */}

            {/* <View style={[s.card]}> */}
                <Text style={[s.card_title, { color: '#000' }]}>Histórico</Text>
            {/* </View> */}

            <ScrollView style={[{ width: '100%', marginTop: 5 }]} onScroll={onScrollToEnd} ref={ref => this.scroll = ref}>
                {/* <View style={[{ display: 'flex', justifyContent: 'center' }]}>
                    <Text>{'Cantidad'}</Text>
                    <Image source={require('./assets/co2gra.jpg')} style={{ width: 270, height: 250 }} />
                    <Text>{'Tiempo \n'}</Text>
                    <Text>{'Sensor Valor Actual \n'}</Text>
                    <Text>{'03                550PPM'}</Text>
                </View> */}

                <View style={[{ width: '100%' }]}>
                    {

                        !loading ?
                            (
                                <>
                                    {
                                        history?.data?.length ?
                                            (
                                                <>
                                                    {
                                                        history.data.map((element, index) => (
                                                            <View key={element.idDispositivo + index} style={[{ borderColor: '#1D6FB8', borderWidth: 2, padding: 4 }]}>
                                                                <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {device.idDispositivo}</Text>
                                                                <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {element.h.N}</Text>
                                                                <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {element.t.N}</Text>
                                                                {/* <Text style={[{ textAlign: 'center', width: '100%' }]}> Registrado el {(new Date(+element.fh.N).toDateString())}</Text> */}
                                                                <Text style={[{ textAlign: 'center', width: '100%' }]}> Registrado el {printDate(+element.fh.N)}</Text>
                                                            </View>
                                                        ))
                                                    }
                                                    {
                                                        // loadingMore && history.next ?
                                                        history.next ?
                                                            (
                                                                <>
                                                                    <ActivityIndicator size={'large'} />
                                                                    <Text style={[{ textAlign: 'center', width: '100%', marginBottom: 60 }]}>Cargando datos, por favor espere...</Text>
                                                                </>
                                                            ) :
                                                            <></>
                                                    }
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                                                        <Text style={[s.card_title, { textAlign: 'center', width: '100%', color: '#000' }]}>No se encontró información del dispositivo</Text>
                                                    </View>
                                                </>
                                            )
                                    }
                                </>
                            )
                            :
                            (
                                <>
                                    <ActivityIndicator size={'large'} />
                                    <Text style={[{ textAlign: 'center', width: '100%' }]}>Extrayendo datos por favor espere...</Text>
                                </>
                            )



                    }
                </View>
            </ScrollView>

            <FlashMessage ref={ref => this.flashMessage = ref} position={'top'} />
        </View>
    );
}

export default HistoryData;