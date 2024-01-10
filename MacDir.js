import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { getDispositivoById } from "./services/dispositivo.service";
import FlashMessage from "react-native-flash-message";
import Device from "./components/Device";

const s = require("./Styles");

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%'
  }
});

function MacDir({ route, navigation }) {
  const { mac } = route.params;

  const [device, setDevice] = useState(null);

  const [deviceData, setDeviceData] = useState({
    "idDispositivo": mac,
    "h": 0,
    "t": 0
  });

  // const fetchData = async (deviceMac) => {
  //   const url = `http://ec2-3-19-28-164.us-east-2.compute.amazonaws.com:3000/mqtt/${deviceMac}`;
  //   // console.log(url);
  //   const resp = await fetch(url);
  //   await resp.json().then((data) => {
  //     setDeviceData(data);
  //   })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // const data = await resp.json();
  //   // setDeviceData(data);
  // }

  // fetchData(mac);

  useEffect(() => {
    getDispositivoById(mac)
      .then(async (resp) => {
        if (resp.status != 200) {
          this.flashMessage.showMessage({
            message: "Ocurrio un error",
            icon: 'danger',
            type: 'danger'
          })
          return;
        }
        const dev = await resp.json();
        console.log(dev);
        setDevice(dev);
      })
      .catch(() => { });
  }, [])

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
    <View style={[estilos.container]}>
      {
        device ?
          (
            <>
              <Device device={device} showSensorInfo={true} interval={2000} navigate={false} />
              <ScrollView style={[{ width: '100%', marginTop: 4 }]}>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
                <View style={[{ borderColor: '#ff4d55', borderWidth: 2, padding: 4 }]}>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Dispositivo {deviceData.idDispositivo}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Humedad: {deviceData.h}</Text>
                  <Text style={[{ textAlign: 'center', width: '100%' }]}> Temperatura {deviceData.t}</Text>
                </View>
              </ScrollView>
            </>
          )
          :
          (
            <>
              <ActivityIndicator size={'large'} />
            </>
          )

      }

      <FlashMessage ref={(ref) => this.flashMessage = ref} position={"bottom"} />
    </View>
  );
}

export default MacDir;

