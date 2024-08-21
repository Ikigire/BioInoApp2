import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const estilos = StyleSheet.create({
    container: {
        maxWidth: '100%',
        padding: 2,
        display: 'flex',
        justifyContent: 'center'
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 3,
        borderColor: '#1D6FB8',
        borderWidth: 1
    },
    infoCell: {
        width: '80%',
        textAlign: 'center',
        fontSize: 14,
        marginLeft: 2,
    },
    infoTitle: {
        width: '20%',
        textAlign: 'auto',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textColorDanger: {
        color: '#ff4d55'
    },
    textColorWarning: {
        color: '#f0da81'
    },
    textColorWarning300: {
        color: '#E5BF24'
    },
    textColorSuccess: {
        color: '#5cb85c'
    },
    textColorSuccess500: {
        color: '#388038'
    }

})
const VOCInfo = () => {
    return (
        <View style={[estilos.container]}>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorSuccess500]}>{'0 - 220'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente Bueno</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorSuccess]}>{'221 - 660'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente Moderado</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorWarning]}>{'661 - 1430'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente Alto</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorDanger]}>{'1431 - 5500'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente Muy Alto</Text>
            </View>
        </View>
    )
}

export default VOCInfo