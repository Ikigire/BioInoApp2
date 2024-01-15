import { Button, View, Text, Image, FlatList, ActivityIndicator, SectionList } from 'react-native';
import styles from './Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { useAppContext } from './utils/app-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usuarioItemKey } from './utils/constantes';
import { getDispositivosUsuario } from './services/dispositivo.service';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Device from './components/Device';
import { getSectionDataFromDispositivos } from './utils/devices.utils';


const s = require("./Styles")

function History({ navigation }) {
    const [dispositivos, setDispositivos] = useState([]);

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
                    this.flashMessage.showMessage({
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
    }, []);

    useEffect(() => {
        if (updateEstList) {
            getUserDevices();
        }
    }, [updateEstList]);

    return (
        <View>
            {
                dispositivos.length > 0 ?
                    <>
                        <SectionList 
                            style={{ marginVertical: 8  }}
                            sections={getSectionDataFromDispositivos(dispositivos)}
                            keyExtractor={(device, index) => `${device.grupo}-${index}`}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 22 }}>{title}</Text>
                            )}
                            renderItem={({ item }) => (
                                <Device device={item} navigation={navigation} connect={false} destination='Histo' />
                                
                                // <SmallDeviceView device={item} />
                                // <Text>{item.nombreDispositivo}</Text>
                            )}
                        />
                        {/* <FlatList
                            style={[{ marginVertical: 3 }]}
                            data={dispositivos}
                            keyExtractor={(device) => device.idDispositivo}
                            renderItem={({ item }) => (
                                <Device device={item} navigation={navigation} connect={false} destination='Histo' />
                            )}
                        /> */}
                    </>

                    :
                    <ActivityIndicator size={'large'} />
            }
            <FlashMessage ref={ref => this.flashMessage = ref} position={'top'} />
        </View>
    );
}
export default History;