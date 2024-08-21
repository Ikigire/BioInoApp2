import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FlashMessage from "react-native-flash-message";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScannerQR from './ScannerQR'; // Asegúrate de que la ruta sea correcta
import { getDispositivoById, updateDispositivo } from './services/dispositivo.service';
import { useAppContext } from './utils/app-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usuarioItemKey } from "./utils/constantes";

const conditionalStyles = StyleSheet.create({
    activeButton: (disabled) => {
        const bgColor = disabled ? '#0390fc' : 'gray';
        return {
            height: 50,
            width: '35%',
            borderRadius: 25,
            textAlign: 'center',
            color: 'white',
            backgroundColor: bgColor,
            verticalAlign: 'middle',
            alignSelf: 'center'
        }
    }
})

export default function Conectando({ navigation, route }) {
    const [disabled, setDisabled] = useState(false);
    const [idDispositivo, setIdDispositivo] = useState('');
    const [establecimiento, setEstablecimiento] = useState('');
    const [grupo, setGrupo] = useState('');
    const [showQRScanner, setShowQRScanner] = useState(true);

    const flashMessageRef = useRef(); // Referencia para FlashMessage

    const buscarDispositivo = (mac) => {
        setDisabled(false)
        getDispositivoById(mac)
            .then(async resp => {
                console.log('Iniciando busqueda');

                if (resp.status !== 200) {
                    console.log('Also salió mal');
                    let message;
                    try {
                        message = (await resp.json()).message;
                        
                    } catch (error) {
                        throw new Error(error.message);
                        
                    }

                    flashMessageRef.current.showMessage({
                        message,
                        type: 'danger',
                        icon: 'info'
                    });

                    return;
                }
                console.log('Dispositivo encontrado');
                let dispositivo = null;
                try {
                    dispositivo = await resp.json();
                } catch (error) {
                    throw new Error(error.message);
                }

                if (dispositivo && dispositivo.alias && dispositivo.ubicacion) {
                    const usuario = await AsyncStorage.getItem(usuarioItemKey);

                    const { idUsuario } = JSON.parse(usuario);
                    console.log(idUsuario);
                    updateDispositivo({...dispositivo, idUsuario })
                    .then(async resp => {
                        if (resp.status !== 200){
                            const { message } = await resp.json();
                            flashMessageRef.current.showMessage({
                                message: message,
                                type: 'danger',
                                icon: 'danger'
                            });

                            return;
                        }

                        await flashMessageRef.current.showMessage({
                            message: `Dispositivo ${dispositivo.idDispositivo}`,
                            type: 'success',
                            icon: 'success'
                        });

                        navigation.navigate('Tabs');
                    })
                    .catch(error => {
                        flashMessageRef.current.showMessage({
                            message: error.message,
                            type: 'danger',
                            icon: 'danger'
                        });
                    });

                    return
                }

                navigation.navigate('Ubica', {
                    dispositivo
                });
            })
            .catch(error => {
                flashMessageRef.current.showMessage({
                    message: error.message,
                    type: 'danger',
                    icon: 'danger'
                });
            });

    }

    const handleClickSiguiente = () => {
        if (!disabled) {
            flashMessageRef.current.showMessage({
                message: "Complete la información para continuar",
                type: 'danger',
                icon: 'danger'
            });
            return;
        }

        buscarDispositivo(idDispositivo);
        // navigation.navigate('Nombre', {
        //     dispositivo: {
        //         idDispositivo: idDispositivo.toUpperCase(),
        //         modelo: modelo.toUpperCase()
        //     },
        //     establecimiento,
        //     grupo
        // });
    }

    useEffect(() => {
        setDisabled((idDispositivo.trim().length > 0));
    }, [idDispositivo])

    useEffect(() => {
        const params = route.params;
        if (params) {
            setEstablecimiento(params.establecimiento); // Asigna el valor del parámetro establecimiento
            setGrupo(params.grupo); // Asigna el valor del parámetro grupo
        }
    }, [route.params])

    // Función para manejar la recepción de la información escaneada
    const handleQRScan = ({ data }) => {

        buscarDispositivo(data);
        // navigation.navigate('Nombre', {
        //     dispositivo: {
        //         idDispositivo: data.toUpperCase(),
        //         modelo: data.toUpperCase()
        //     },
        //     establecimiento,
        //     grupo
        // });
    };
    return (
        <>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ fontSize: 20, flex: 1, paddingHorizontal: 30, marginHorizontal: 30, textAlign: 'left', justifyContent: 'center', alignItems: "center", marginTop: 20 }}>

                        {showQRScanner ?
                            <Pressable onPress={() => setShowQRScanner(false)} style={(pressed) => [{ backgroundColor: pressed ? '#1D6FB8' : '#1D9FB8' }, { display: 'flex', justifyContent: 'center', borderColor: '#1D9FB8', borderWidth: 2, padding: 6 }]}>
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <MaterialCommunityIcons name="cursor-text" color={'white'} size={50} style={{ textAlign: 'center', width: '100%' }} />
                                    <Text style={{ color: 'white', textAlign: 'center' }} >Ingresar</Text>
                                </View>
                            </Pressable>
                            :
                            <Pressable onPress={() => setShowQRScanner(true)} style={(pressed) => [{ backgroundColor: pressed ? '#1D6FB8' : '#1D9FB8' }, { display: 'flex', justifyContent: 'center', borderColor: '#1D9FB8', borderWidth: 2, padding: 6 }]}>
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <MaterialCommunityIcons name="qrcode" color={'white'} size={50} style={{ textAlign: 'center', width: '100%' }} />
                                    <Text style={{ color: 'white', textAlign: 'center' }} >Usar QR</Text>
                                </View>
                            </Pressable>
                        }


                        <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginVertical: 8 }}>
                            <View style={{ backgroundColor: 'black', height: 4, borderWidth: 1, borderColor: 'black', width: '45%', marginTop: '2.5%' }}></View>
                            <Text>----</Text>
                            <View style={{ backgroundColor: 'black', height: 4, borderWidth: 1, borderColor: 'black', width: '45%', marginTop: '2.5%' }}></View>
                        </View>

                        <View style={[{ width: '100%' }]}>
                            <Text style={{ textAlign: 'center' }}>{showQRScanner ? "Escanee el Código QR" : "Ingrese los siguientes datos"}</Text>
                            {showQRScanner ?
                                <ScannerQR onScan={handleQRScan} />
                                :
                                <>
                                    <TextInput
                                        style={globalStyle.input}
                                        placeholder="Dirección MAC"
                                        onChangeText={async (text) => { setIdDispositivo(text.toUpperCase()); }}
                                        returnKeyType="next"
                                        value={idDispositivo}
                                        blurOnSubmit={false}
                                        textContentType="name"
                                        onSubmitEditing={() => this.modeloInput.focus()}
                                    />
                                    <View style={{ marginTop: 15, display: 'flex', justifyContent: 'center' }}>
                                        <Pressable onPress={handleClickSiguiente} style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                                            <Text style={[conditionalStyles.activeButton(disabled), { width: '100%' }]}>Siguiente</Text>
                                        </Pressable>
                                    </View>
                                </>
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>

            <FlashMessage ref={flashMessageRef} position={'top'} animated />

        </>
    );
}
