import { View, Text, Image, Pressable, ScrollView, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Styles';
import { useEffect, useState } from 'react';
import { useAppContext } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usuarioItemKey } from './utils/constantes';
import { getDispositivosUsuario } from './services/dispositivo.service';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Device from './components/Device';

const s = require("./Styles")

function Realtime({ navigation }) {
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
                    this.flashMessage-showMessage({
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
            <FlatList
                data={dispositivos}
                keyExtractor={(device) => device.idDispositivo}
                renderItem={({item}) => (
                    <Device device={item}/>
                )}
            />
            <FlashMessage ref={ref => this.flashMessage = ref} position={'top'} />
        </View>
    );
}

export default Realtime;