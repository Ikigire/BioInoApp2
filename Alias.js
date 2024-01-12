import { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import FlashMessage from "react-native-flash-message";
import { baseUrl, usuarioItemKey } from "./utils/constantes";
import { createEstablecimiento, deleteEstablecimiento } from "./services/establecimiento.service";
import { Modal } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createGrupo, deleteGrupo } from "./services/grupo.service";
import { createDispositivo } from "./services/dispositivo.service";
import { useAppContext } from "./utils/app-context";

const s = require("./Styles")

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

function Alias({ navigation, route }) {
    const [disabled, setDisabled] = useState(true);
    const [unable, setUnable] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [nombDispositivo, setNombreDispositivo] = useState('');

    const {setUpdateEstList} = useAppContext();

    const handleClick = async () => {
        setUnable(true);
        const nombreDispositivo = nombDispositivo.trim();
        console.log(`'${nombreDispositivo}'`);
        if (disabled) {
            this.flashMessage.showMessage({
                message: 'Hace Falta el nombre de dispositivo',
                type: 'danger',
                icon: 'warning'
            })
            setUnable(false);
            return;
        }

        setShowModal(true);

        const { dispositivo, establecimiento, grupo } = route.params;
        const usuario = await AsyncStorage.getItem(usuarioItemKey);

        const { idUsuario } = JSON.parse(usuario);


        let estab = { establecimiento, idUsuario };
        let group = { grupo };
        let device = {nombreDispositivo, ...dispositivo};

        console.log(device, estab, group, idUsuario);



        // setTimeout(() => {
        //     setShowModal(false);
        // }, 3000);

        createEstablecimiento(estab)
            .then(async (resp) => {
                if (resp.status != 200) {
                    const error = await resp.json();
                    throw new Error(error.message)
                }
                estab = (await resp.json()).establecimiento;
                return createGrupo(group);
            })
            .then(async (resp) => {
                if (resp.status != 200) {
                    const error = await resp.json();
                    throw new Error(error.message)
                }
                group = await resp.json();
                device.idGrupo = group.idGrupo;
                device.idEstab = estab.idEstab;
                return createDispositivo(device);
            })
            .then(async (resp) => {
                if (resp.status != 200) {
                    const error = await resp.json();
                    throw new Error(error.message)
                }
                setUpdateEstList(true);
                navigation.navigate("Tabs");
            })
            .catch( async (error) => {
                setUnable(false);
                setShowModal(false);
                if ( estab.idEstab ?? false) {
                    await deleteEstablecimiento(estab.idEstab);
                }

                if ( group.idGrupo ?? false ){
                    await deleteGrupo(group.idGrupo);
                }
                this.flashMessage.showMessage({
                    message: error.message,
                    type: 'danger',
                    icon: 'danger',
                    duration: 4000
                })
            });

    }

    // useEffect(() => {
    //     console.log(route.params);
    // }, [])

    useEffect(() => {
        setDisabled(!(nombDispositivo.trim().length > 0));
    }, [nombDispositivo]);

    const conditionalStyles = StyleSheet.create({
        activeButton: (disabled) => {
            const bgColor = !disabled ? '#0390fc' : 'gray';
            return {
                height: 50,
                width: '100%',
                borderRadius: 25,
                textAlign: 'center',
                color: 'white',
                backgroundColor: bgColor,
                verticalAlign: 'middle',
                alignSelf: 'center'
            }
        }
    })

    return (
        <View style={styles.centeredView}>
            <Text>Dale un nombre a tu dispositivo</Text>
            <TextInput style={s.input}
                value={nombDispositivo}
                onChangeText={(text) => { setNombreDispositivo(text); }}
                onSubmitEditing={handleClick}
            />
            <Pressable style={{ width: '75%', backgroundColor: '#fff', marginTop: 16 }} disabled={unable}
                onPress={handleClick}
            >
                <Text style={[conditionalStyles.activeButton(disabled), { width: '100%' }]}>Guardar</Text>
            </Pressable>

            <FlashMessage ref={flashMessage => this.flashMessage = flashMessage} position={'top'} animated />
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}></Text>
                        <ActivityIndicator size={'large'} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Alias;