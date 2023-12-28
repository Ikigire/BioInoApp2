import * as React from "react";
import {Button, Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const s = require("./Styles")

function Conexion({navigation}) {
    return(
        <View style={{fontSize: 20, flex: 1, paddingHorizontal: 30, marginHorizontal: 30, textAlign: 'center', justifyContent: 'center', alignSelf: "center", alignItems: 'center'}}>
            <MaterialCommunityIcons name="cable-data" size={70} />
            <Text>Conecta tu dispositivo a la corriente electrica, procurando un lugar donde llegue una señal Wi-Fi estable</Text>
            <Button 
                title='Siguiente'
                onPress={() => navigation.navigate("Cnto")}
            />
        </View>
    );
}

export default Conexion;