import * as React from "react";
import { Text, Button, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const s = require("./Styles")

function ElectricInst({ navigation }) {
    return (
        <View style={{ fontSize: 20, flex: 1, paddingHorizontal: 30, marginHorizontal: 30, textAlign: 'center', justifyContent: 'center', alignSelf: "center", alignItems: 'center' }}>
            <MaterialCommunityIcons name="cable-data" size={70} />
            <Text>Conecta tu dispositivo a la corriente electrica, procurando un lugar donde llegue una señal Wi-Fi estable</Text>
            <MaterialCommunityIcons name="wifi" size={120} />
            <Text>Vaya a ajustes y entre a la red del dispositivo, finalmente conecte a su red Wi-Fi con su contraseña.</Text>
            <Button
                title='Entendido'
                onPress={() => navigation.navigate("Ubica")}
            />
        </View>
    );
}

export default ElectricInst;