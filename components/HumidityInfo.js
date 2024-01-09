import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const estilos = StyleSheet.create({
    container: {
        width: '100%',
        padding: 2
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoCell: {
        // width: '10%',
        textAlign: 'auto',
        fontSize: 16
    }
})
const HumidityInfo = () => {
    return (
        <View style={[]}>
            <View style={[]}>
                <Text style={[estilos.infoCell]}>{'<40'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente seco, se requiere humedad</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoCell]}>{'40 - 60'}</Text>
                <Text style={[estilos.infoCell]}>Menor probabilidad de asentamiento de bacterias y humedad ideal</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoCell]}>{'60+'}</Text>
                <Text style={[estilos.infoCell]}>Mayor probabilidad de asentamiento de bacterias</Text>
            </View>
        </View>
    )
}

export default HumidityInfo