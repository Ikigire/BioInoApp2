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
        fontSize: 16,
        marginLeft: 2,
    },
    infoTitle: {
        width: '20%',
        textAlign: 'auto',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textColorDanger: {
        color: '#ff4d55'
    },
    textColorWarning: {
        color: '#f0da81'
    },
    textColorSuccess: {
        color: '#5cb85c'
    },
    textColorInfo: {
        color: '#5bc0de'
    },
    textColorPrimary: {
        color: '#0275d8'
    },
})
const TemperatureInfo = () => {
    return (
        <View style={[estilos.container]}>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorInfo]}>{'<8'}</Text>
                <Text style={[estilos.infoCell]}>Muy Frio</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorPrimary]}>{'8 - 15'}</Text>
                <Text style={[estilos.infoCell]}>Frio</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorSuccess]}>{'16 - 30'}</Text>
                <Text style={[estilos.infoCell]}>Ideal</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorWarning]}>{'31 - 40'}</Text>
                <Text style={[estilos.infoCell]}>Caliente</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorDanger]}>{'40+'}</Text>
                <Text style={[estilos.infoCell]}>Muy Caliente</Text>
            </View>
        </View>
    )
}

export default TemperatureInfo