import { View, Text, Image, Pressable, ScrollView, FlatList, ActivityIndicator, SectionList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Styles';
import { useEffect, useState } from 'react';
import { useAppContext } from './utils/app-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usuarioItemKey } from './utils/constantes';
import { getDispositivosUsuario } from './services/dispositivo.service';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Device from './components/Device';
import { getSectionDataFromDispositivos } from './utils/devices.utils';

const s = require("./Styles")

function Realtime({ navigation }) {
    const [dispositivos, setDispositivos] = useState([]);
    const [isFocused, setIsFocused] = useState(true);

    const getUserId = async () => {
        const { idUsuario } = JSON.parse(await AsyncStorage.getItem(usuarioItemKey));
        return idUsuario;
    };

    const getUserDevices = async () => {
        getDispositivosUsuario(await getUserId())
            .then(async resp => {
                if (resp.status == 404) {
                    setDispositivos([]);
                    return;
                }

                if (resp.status != 200) {
                    const error = await resp.json();
                    this.flashMessage - showMessage({
                        message: `Algo salió mal\n${error.errorType}\n${error.message}`,
                        type: 'danger',
                        icon: 'danger',
                        duration: 4000
                    });
                    return;
                }

                setDispositivos(await resp.json());
            })
            .catch(error => console.error(error));
    };

    const { updateEstList } = useAppContext();

    useEffect(() => {
        getUserDevices();
        navigation.addListener('focus', () => { setIsFocused(true); });
        navigation.addListener('blur', () => { setIsFocused(false); });
    }, []);

    useEffect(() => {
        if (updateEstList) {
            getUserDevices();
        }
    }, [updateEstList]);

    if (!isFocused) {
        return <></>;
    }

    return (
        <View style={{ backgroundColor: '#fff', paddingBottom: 0 }}>
            {
                isFocused && dispositivos.length > 0 ?
                    <>
                        <View style={{ width: '100%', padding: 12, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 35 }}>
                            <MaterialCommunityIcons style={{ color: '#1D6FB8', paddingTop: 10 }} name="archive-cog-outline" size={35} onPress={() => navigation.navigate("Electric")} />
                        </View>
                        <SectionList
                            style={{ marginVertical: 8, backgroundColor: '#fff', height: '86%' }}
                            sections={getSectionDataFromDispositivos(dispositivos)}
                            keyExtractor={(device, index) => `${device.grupo}-${index}`}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={{ fontSize: 20, marginLeft: 22 }}>{title}</Text>
                            )}
                            renderItem={({ item }) => (
                                <Device device={item} navigation={navigation} />
                                // <Text>{item.nombreDispositivo}</Text>
                            )}
                        />
                        {/* <FlatList
                            data={dispositivos}
                            keyExtractor={(device) => device.idDispositivo}
                            renderItem={({ item }) => (
                                <Device device={item} navigation={navigation} />
                            )}
                        /> */}
                    </>
                    :
                    <>
                        <ActivityIndicator size={'large'} />
                    </>
            }
            <FlashMessage ref={ref => this.flashMessage = ref} position={'top'} />
        </View>
    );
}

export default Realtime;