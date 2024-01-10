import { useState, useEffect, useRef } from "react";
import { Pressable, Text, View, StyleSheet, SectionList, ActivityIndicator } from "react-native";
import { getDistinctUsuarioEstablecimientos } from "./services/establecimiento.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usuarioItemKey } from "./utils/constantes";
import FlashMessage from "react-native-flash-message";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from "react-native-element-dropdown";
import { useAppContext } from "./App";
import { getDispositivosByEstablecimientoUsuario, getDispositivosUsuario } from "./services/dispositivo.service";
import SmallDeviceView from "./components/SmallDeviceView";


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

    const getEstablecimientosData = (id) => {
        getDistinctUsuarioEstablecimientos(id)
            .then(async resp => {
                if (resp.status != 200 && resp.status != 404) {
                    const error = await resp.json();
                    // console.log()
                    throw new Error(error.message ?? '');
                }

                setEstablecimientos(await resp.json());
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

    const getDispositivosByEstab = (estab) => {
        // console.log(estab, idUsuario);
        getDispositivosByEstablecimientoUsuario(estab, idUsuario)
            .then(async resp => {
                // console.log(resp);
                if (resp.status != 200) {
                    // console.info('Previo al error')
                    // console.log(resp.body)
                    const error = await resp.json();
                    // console.info('Previo al error')
                    // console.error("Error en la petición de dispositivos: ", error);
                    this.flashMessage.showMessage({
                        message: `Algo Salio Mal: \n${error.errorType}\n${error.message}`,
                        type: 'danger',
                        icon: 'danger',
                        duration: 4000
                    })
                    return;
                }
                // console.log(resp.body);
                setDispositivos(await resp.json());
            })
            .catch(error => {
                console.log(error);
                this.flashMessage.showMessage({
                    message: `Algo salió mal\n${error.message}\nmamahuevo :3`,
                    type: 'danger',
                    icon: 'danger',
                    duration: 4000
                })
            })
            .finally(() => {
                setLoadingDevices(false);
            });

        getSectionDataFromDispositivos();
    }

    const getSectionDataFromDispositivos = () => {
        const sections = [];
        dispositivos.forEach((device) => {
            let added = false;

            sections.forEach(section => {
                if (section.title == device.establecimiento) {
                    added = true;
                    section.data = [...section.data, device];
                }
            })

            if (!added) {
                sections.push({
                    title: device.establecimiento,
                    data: [device]
                });
            }
        });

        console.log(sections);
        return sections;
    }

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
        if (updateEstList) {
            getDispositivosByUserId(idUsuario);
            setUpdateEstList(false);
        }
    }, [updateEstList]);

    // useEffect(() => updateData());

    // useEffect(() => {
    //     if (selectedEstab) {
    //         setLoadingDevices(true);
    //         getDispositivosByEstab(selectedEstab);
    //     }
    // }, [selectedEstab])

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
                                    <View style={{ width: '100%', padding: 12, backgroundColor: '#1D6FB8', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        {/* <Text style={{ color: '#fff', fontSize: 18 }}>Establecimiento: </Text> */}
                                        {/* <Dropdown
                                            mode="modal"
                                            data={establecimientos}
                                            style={[styles.dropdown, { minWidth: '75%' }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            value={selectedEstab}
                                            iconStyle={styles.iconStyle}
                                            labelField="establecimiento"
                                            valueField="establecimiento"
                                            placeholder={'Establecimiento'}
                                            searchPlaceholder="Search..."
                                            onChange={(item) => {
                                                const { establecimiento } = item;
                                                setSelectedEstab(establecimiento);
                                            }}
                                        /> */}
                                        <MaterialCommunityIcons style={{ color: '#fff' }} name="toy-brick-plus-outline" size={30} onPress={() => navigation.navigate("Electric")} />
                                    </View>
                                    <View style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                        <SectionList
                                            style={{ marginTop: 8 }}
                                            sections={getSectionDataFromDispositivos()}
                                            keyExtractor={(device, index) => `${device.grupo}-${index}`}
                                            renderSectionHeader={({ section: { title } }) => (
                                                <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 22 }}>{title}</Text>
                                            )}
                                            renderItem={({ item }) => (
                                                <SmallDeviceView device={item} />
                                                // <Text>{item.nombreDispositivo}</Text>
                                            )}
                                        />
                                    </View>
                                </View>
                            ) :
                            (
                                <View style={s.container}>
                                    <Text style={{ fontSize: 32, fontVariant: 'bold' }}>!Bienvenido¡</Text>
                                    <Text style={{ fontSize: 20 }}>Tal parece que eres nuevo por aquí!</Text>
                                    <Pressable style={s.buttonContainer}
                                        onPress={() => navigation.navigate("Electric")}
                                    >
                                        <Text style={s.button}>Añadir dispositivo</Text>
                                    </Pressable>
                                </View>
                            )
                    )
            }
            {/*
                establecimientos.length > 0 ?
                    (
                        <View style={{ flex: 1 }}>
                            <View style={{ width: '100%', padding: 12, backgroundColor: '#1D6FB8', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <MaterialCommunityIcons style={{ color: '#fff' }} name="toy-brick-plus-outline" size={30} onPress={() => navigation.navigate("Electric")} />
                            </View>
                            <View style={{ width: '100%', height: '100%', overflow: 'hidden' }}>

                                {
                                    loadingDevices ?
                                        (
                                            <ActivityIndicator size={'large'} />
                                        ) :
                                        (
                                            <SectionList
                                                style={{ marginTop: 8 }}
                                                sections={getSectionDataFromDispositivos()}
                                                keyExtractor={(device, index) => `${device.grupo}-${index}`}
                                                renderSectionHeader={({ section: { title } }) => (
                                                    <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 22 }}>{title}</Text>
                                                )}
                                                renderItem={({ item }) => (
                                                    <SmallDeviceView device={item} />
                                                    // <Text>{item.nombreDispositivo}</Text>
                                                )}
                                            />
                                        )
                                }
                            </View>
                        </View>
                    ) :
                    (
                        <View style={s.container}>
                            <Text style={{ fontSize: 32, fontVariant: 'bold' }}>!Bienvenido¡</Text>
                            <Text style={{ fontSize: 20 }}>Tal parece que eres nuevo por aquí!</Text>
                            <Pressable style={s.buttonContainer}
                                onPress={() => navigation.navigate("Electric")}
                            >
                                <Text style={s.button}>Añadir dispositivo</Text>
                            </Pressable>
                        </View>
                    )
            */}
            <FlashMessage ref={(fm) => this.flashMessage = fm} position={'top'} />
        </>
    );
}

export default Home;