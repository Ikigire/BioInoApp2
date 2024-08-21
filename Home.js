import { useState, useEffect, useRef } from "react";
import { Pressable, Text, View, StyleSheet, SectionList, ActivityIndicator } from "react-native";
import { getDistinctUsuarioEstablecimientos } from "./services/establecimiento.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usuarioItemKey } from "./utils/constantes";
import FlashMessage from "react-native-flash-message";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from "react-native-element-dropdown";
// import { useAppContext } from "./utils/app-context";
import { getDispositivosByEstablecimientoUsuario, getDispositivosUsuario } from "./services/dispositivo.service";
import SmallDeviceView from "./components/SmallDeviceView";
import { useAppContext } from "./utils/app-context";
import { getSectionDataFromDispositivos } from "./utils/devices.utils";
import { gStyles } from "./GlobalStyles";


const s = require("./Styles")

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        color: '#fff'
    },
    icon: {
        marginRight: 5,
        color: 'white'
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 22,
    },
    placeholderStyle: {
        fontSize: 22,
        color: '#fff'
    },
    selectedTextStyle: {
        fontSize: 22,
        color: '#fff'
    },
    iconStyle: {
        width: 20,
        height: 20,
        color: 'white'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

function Home({ navigation }) {
    const [establecimientos, setEstablecimientos] = useState([]);
    const [loadingDevices, setLoadingDevices] = useState(true);
    const [selectedEstab, setSelectedEstab] = useState("");
    const [dispositivos, setDispositivos] = useState([]);

    const [idUsuario, setIdUsuario] = useState(-1);

    const { updateEstList, setUpdateEstList } = useAppContext();

    const getDispositivosByUserId = (id) => {
        getDispositivosUsuario(id)
            .then(async resp => {
                setLoadingDevices(false)

                if (resp.status != 200 && resp.status != 404) {
                    const error = await resp.json();
                    // console.log()
                    throw new Error(error.message ?? '');
                }
                const devices = await resp.json();
                console.log(devices);
                setDispositivos(devices);
            })
            .catch(error => {
                this.flashMessage.showMessage({
                    message: error.message,
                    type: 'danger',
                    icon: 'danger',
                    duration: 4000
                })
            });
    }

    useEffect(() => {
        AsyncStorage.getItem(usuarioItemKey)
            .then((value) => {
                // console.warn("Datos usuario", value)
                const { idUsuario: id } = JSON.parse(value);
                console.log('Usuario logeado', id);
                
                setIdUsuario(id);
                getDispositivosByUserId(id);
            })
            .catch(error => {
                console.log(error);
                this.flashMessage.showMessage({
                    message: `Algo salió mal\n${error.message}\nContacte con el desarrollador para solucionar el error`,
                    type: 'danger',
                    icon: 'danger',
                    duration: 4000
                })
            });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem(usuarioItemKey)
          .then(value => {
            console.log(value);
            const { nombre } = JSON.parse(value);
            setNombreUsuario(nombre);
          })
          .catch(error => {
            console.log(error);
            Alert.alert("Error", error.message, [], {
              cancelable: true
            });
          });
      }, [])
    useEffect(() => {
        if (updateEstList) {
            getDispositivosByUserId(idUsuario);
            setUpdateEstList(false);
        }
    }, [updateEstList]);
    const [nombreUsuario, setNombreUsuario] = useState("Jonh Doe");
    return (
        <>
            {
                loadingDevices ?
                    (
                        <ActivityIndicator size={'large'} />
                    ) :
                    (
                        dispositivos.length > 0 ?
                            (
                                <View style={{ flex: 1 }}>
                                    <View style={{ width: '100%', padding: 12, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',paddingTop: 35 }}>
                                    <MaterialCommunityIcons style={{ color: '#1D6FB8', paddingTop: 10 }} name="archive-cog-outline" size={35} onPress={() => navigation.navigate("Electric")} />
                                    </View>
                                    <View style={{ width: '100%', height: '92%', overflow: 'hidden', backgroundColor:'#fff' }}>
                                        <SectionList
                                            style={{ marginVertical: 8, backgroundColor: '#fff' }}
                                            sections={getSectionDataFromDispositivos(dispositivos)}
                                            keyExtractor={(device, index) => `${device.grupo}-${index}`}
                                            renderSectionHeader={({ section: { title } }) => (
                                                <Text style={{ fontSize: 20, marginLeft: 22 }}>{title}</Text>
                                            )}
                                            renderItem={({ item }) => (
                                                <SmallDeviceView device={item} navigation={navigation}/>
                                                // <Text>{item.nombreDispositivo}</Text>
                                            )}
                                        />
                                    </View>
                                </View>
                            ) :
                            (
                                <View style={gStyles.container}>
                                    <Text style={{ fontSize: 32, fontVariant: 'bold' }}>!Bienvenido¡</Text>
                                    <Text style={{ fontSize: 20 }}>{nombreUsuario}</Text>

                                    <Pressable style={[{ margin: 15, width: '90%' }]}
                                        onPress={() => navigation.navigate("Electric")}
                                    >
                                        <Text style={[gStyles.button]}>Añadir Dispositivo</Text>
                                    </Pressable>
                                </View>
                            )
                    )
            }
            <FlashMessage ref={(fm) => this.flashMessage = fm} position={'top'} />
        </>
    );
}

export default Home;