import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";

const s = require("./Styles");

function MacDir({ route, navigation }) {
  // const handleMonitoreoPress = async (macAddress) => {
  //   // Lógica para el elemento clickeable
  //   console.log(`Elemento ${macAddress} clickeado`);
  //   try {
  //     // Tu lógica de solicitud a la API aquí, utilizando la dirección MAC
  //     const response = await fetch(`http://ec2-3-19-28-164.us-east-2.compute.amazonaws.com:3000/mqtt/${macAddress}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Agrega otros encabezados si es necesario
  //       },
  //     });

  //     // Manejar la respuesta de la API
  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log('Respuesta de la API:', result);
  //       // Puedes decidir qué hacer con la respuesta, por ejemplo, navegar a otra pantalla
  //       navigation.navigate("Realtime", { data: result });
  //     } else {
  //       console.error('Error en la solicitud:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error en la solicitud:', error);
  //   }
  // };
  const { mac:deviceMac } = route.params;
  
  const [mac, setMac] = useState(deviceMac);
  
  const [deviceData, setDeviceData] = useState({
    "idDispositivo": deviceMac,
    "h": 0,
    "t": 0
});

  const fetchData = async (deviceMac) => {
    const url = `http://ec2-3-19-28-164.us-east-2.compute.amazonaws.com:3000/mqtt/${deviceMac}`;
    // console.log(url);
    const resp = await fetch(url);
    await resp.json().then( (data) => {
      setDeviceData(data);
    })
    .catch( (error) => {
      console.log(error);
    } );
    // const data = await resp.json();
    // setDeviceData(data);
  }

  fetchData(mac);

  // setInterval(() => {
  //   fetchData(mac)
  // }, 2000);

  return (
    // <View style={s.container}>
    //   <TouchableOpacity onPress={() => handleMonitoreoPress('mqtt1')}>
    //     <Text style={s.button}>201804F7C630</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => handleMonitoreoPress('mqtt2')}>
    //     <Text style={s.button}>78C8BF519140</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => handleMonitoreoPress('mqtt3')}>
    //     <Text style={s.button}>142800F7C630</Text>
    //   </TouchableOpacity>
    // </View>
    <View style={ s.container }>
      
      <Text>{mac}</Text>
      <Text> Dispositivo {deviceData.idDispositivo}</Text>
      <Text> Humedad: {deviceData.h}</Text>
      <Text> Temperatura {deviceData.t}</Text>

    </View>
  );
}

export default MacDir;

