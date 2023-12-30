import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native';
import { findDeviceIcon } from '../utils/icon.utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteDispositivo } from '../services/dispositivo.service';
import { useAppContext } from '../App';


const estilo = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: '#1D6FB8',
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        // alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginVertical: 3
    },
    textContainer: {
        width: '75%',
        // overflow: 'hidden'
    },
    title: {
        fontSize: 22,
        // textAlign: 'center',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 16
    }
});

const SmallDeviceView = ({ device }) => {
    if (!device) {
        return (
            <Text style={{ width: '100%', height: 80, fontSize: 14, textAlign: 'center' }}>
                No se recibío información de dispositivo
            </Text>
        );
    }

    const {setUpdateEstList} = useAppContext();

    const eliminarDispositivo = () => {
        deleteDispositivo(device.idDispositivo)
        .then(async resp => {
            if (resp.status != 200){
                console.error(await resp.json);
                return;
            }

            setUpdateEstList(true);
        })
        .catch(error => console.error(error));
    }

    const handleTrashIconPress = () => {
        Alert.alert(
            `Está a punto de eliminar el dispositivo ${device.nombreDispositivo}`,
            '¿Está seguro?',
            [
                { text: 'Si, Eliminalo', onPress: () => eliminarDispositivo() },
                { text: 'No, Cancela', onPress: () => {} },
            ],
            {
                cancelable: true
            }
        )
    }

    const icon = findDeviceIcon(device.establecimiento, device.grupo);
    return (
        <View style={estilo.container}>
            <MaterialCommunityIcons name={icon} size={35} color={'#1D6FB8'} />
            <View style={estilo.textContainer}>
                <Text style={estilo.title}>{device.nombreDispositivo}</Text>
                <Text style={estilo.subTitle}>{device.idDispositivo}</Text>
            </View>
            <MaterialCommunityIcons color={'red'} name='trash-can-outline' size={20} onPress={handleTrashIconPress}/>
        </View>
    )
}

export default SmallDeviceView