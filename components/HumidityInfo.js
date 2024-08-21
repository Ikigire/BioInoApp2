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
        fontSize: 14,
        marginLeft: 2,
        textAlign: 'center'
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
    textColorSuccess: {
        color: '#5cb85c'
    },

})
const HumidityInfo = () => {
    return (
        <View style={[estilos.container]}>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorWarning]}>{'<40'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente seco, se requiere una mayor cantidad de humedad</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorSuccess]}>{'40 - 60'}</Text>
                <Text style={[estilos.infoCell]}>Menor probabilidad de asentamiento de bacterias y humedad ideal</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorDanger]}>{'+60'}</Text>
                <Text style={[estilos.infoCell]}>Mayor probabilidad de asentamiento de bacterias</Text>
            </View>
        </View>
    )
}

export default HumidityInfo