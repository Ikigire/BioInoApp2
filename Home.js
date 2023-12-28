import { useState, useEffect, useRef } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { getDistinctUsuarioEstablecimientos } from "./services/establecimiento.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usuarioItemKey } from "./utils/constantes";
import FlashMessage from "react-native-flash-message";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from "react-native-element-dropdown";
import { useAppContext } from "./App";


const s = require("./Styles")

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        color: '#fff'
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
        color: '#fff'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#fff'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

function Home({ navigation }) {
    const [establecimientos, setEstablecimientos] = useState([]);
    const isMounted = useRef(false);

    const { updateEstList, setUpdateEstList } = useAppContext();

    let dropdownItems = [];
    const updateData = () => {
        // const { idUsuario } = JSON.parse((await AsyncStorage.getItem(usuarioItemKey)));
        AsyncStorage.getItem(usuarioItemKey)
            .then(async value => {
                const { idUsuario } = JSON.parse(value);
                getDistinctUsuarioEstablecimientos(idUsuario)
                    .then(async resp => {
                        if (resp.status != 200 && resp.status != 404) {
                            const error = await resp.json();
                            console.log()
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
            })
            .catch(error => console.log(error));

            isMounted.current = true;
            return () => { isMounted.current = false }
    }

    useEffect(updateData, []);

    useEffect(() => {
        if (updateEstList) {
            updateData();
            setUpdateEstList(false);
        }
    }, [updateEstList]);
    
    // useEffect(() => updateData());

    useEffect(() => {
        console.log(establecimientos);
        establecimientos.forEach(est => {
            dropdownItems.push({
                label: est.establecimiento,
                value: est.establecimiento
            })
        })
    }, [establecimientos])

    return (
        <>
            {
                establecimientos.length > 0 ?
                    (
                        <View style={{ flex: 1 }}>
                            <View style={{ width: '100%', padding: 12, backgroundColor: '#1D6FB8', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {/* <Text style={{ color: '#fff', fontSize: 18 }}>Establecimiento: </Text> */}
                                <Dropdown
                                    mode="modal"
                                    data={establecimientos}
                                    style={[styles.dropdown, { minWidth: '75%' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    labelField="establecimiento"
                                    valueField="establecimiento"
                                    placeholder={'Establecimiento'}
                                    searchPlaceholder="Search..."
                                    onChange={(item) => {
                                        console.log(item.value);
                                    }}
                                />
                                <MaterialCommunityIcons style={{ color: '#fff' }} name="toy-brick-plus-outline" size={25} onPress={() => navigation.navigate("Electric")} />
                            </View>
                            <View style={{width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#000'}}></View>
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
            }
            <FlashMessage ref={(fm) => this.flashMessage = fm} position={'top'} />
        </>
    );
}

export default Home;