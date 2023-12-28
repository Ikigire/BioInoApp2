import * as React from "react";
import { Button, View, Text } from 'react-native';

const s = require("./Styles")

function AddDevice({ navigation }) {
    return (
        <View style={[s.container, {textAlign: 'center'}]}>
            <Text>Añadir Dispositivo</Text>
            <Text>Ozono</Text>
            <Text>CO2</Text>
            <Text>Humedad</Text>
            <Text>Temperatura</Text>
            <Button
                title='Aceptar'
                onPress={() => navigation.navigate("Electric")}
            />
        </View>
    );
}

export default AddDevice;