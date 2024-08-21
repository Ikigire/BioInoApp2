import * as React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const s = require("./Styles");

function ElectricInst({ navigation }) {
    const handleNextPress = () => {
        navigation.navigate("Cnto");
    };

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="cable-data" size={100} />
            <Text style={styles.text}>Conecta tu dispositivo a la corriente eléctrica, procurando un lugar donde llegue una señal Wi-Fi estable.</Text>
            <MaterialCommunityIcons name="wifi" size={100} paddingTop={30} />
            <Text style={styles.text}>Ve a ajustes, entra a la red del dispositivo y, finalmente, conéctate a tu red Wi-Fi con tu contraseña.</Text>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? '#135e8f' : '#1D6FB8' } // Cambia el color de fondo al presionar el botón
                ]}
                onPress={handleNextPress}
            >
                <Text style={styles.buttonText}>Siguiente</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 60
    },
    text: {
        marginHorizontal: 30,
        textAlign: 'center',
        fontSize: 15
    },
    button: {
        marginTop: 50,
        backgroundColor: '#1D6FB8',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        width:120,
        height:40
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        textAlign:'center'
    }
});

export default ElectricInst;
