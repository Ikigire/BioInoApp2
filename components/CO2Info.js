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
        textAlign: 'auto',
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
    textColorSuccess: {
        color: '#5cb85c'
    },
    textColorSuccess500: {
        color: '#388038'
    },
    textColorSuccess800: {
        color: '#193919'
    },

})
const CO2Info = () => {
    return (
        <View style={[estilos.container]}>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorSuccess800]}>{'400 - 699'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente Excelente</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorSuccess500]}>{'700 - 899'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente Bueno</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorSuccess]}>{'900 - 1099'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente Normal</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorWarning]}>{'1100 - 1599'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente Contaminado</Text>
            </View>
            <View style={[estilos.infoRow]}>
                <Text style={[estilos.infoTitle, estilos.textColorDanger]}>{'> 1600'}</Text>
                <Text style={[estilos.infoCell]}>Ambiente Altamente Contaminado</Text>
            </View>
        </View>
    )
}

export default CO2Info