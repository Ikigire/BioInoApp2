import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usuarioItemKey } from './utils/constantes';
import { gStyles } from './GlobalStyles';
s = require("./Styles");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
  },
  roundedButton: {
    color: '#fff',
    backgroundColor: '#1D6FB8',
    borderRadius: 100,
    borderColor: '#1d6fb8',
    borderWidth: 3
  }
});

function Settings({ navigation }) {
  const [nombreUsuario, setNombreUsuario] = useState("Jonh Doe");

  const Col = ({ numRows, children }) => {
    return (
      <View style={s[`${numRows}col`]}>{children}</View>
    )
  }

  const Row = ({ children }) => (
    <View style={[s.row, { marginVertical: 10 }]}>{children}</View>
  )

  const handlePressHeader = () => {
    // Navegar hacia el componente "ModificarUsuario" cuando se presiona el texto del header
    // navigation.navigate("ModificarUsuario");
    navigation.navigate("Login");
  }


  useEffect(() => {
    AsyncStorage.getItem(usuarioItemKey)
      .then(value => {
        console.log(value);
        const { nombre } = JSON.parse(value);
        setNombreUsuario(nombre);
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Error", error.message, [], {
          cancelable: true
        });
      });
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[{marginBottom: 35}, { display: 'flex', alignItems: 'center'}]} onPress={handlePressHeader}>
        <Text style={[styles.header, {textAlign: 'center'}]}>{nombreUsuario}</Text>
        <View style={[{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderWidth: 2, padding: 5, borderRadius: 15, borderColor: '#0000EE' }]}>
          <MaterialCommunityIcons name="logout" size={25} color={'#0000EE'} />
          <Text style={[gStyles.link]}>
            Cerrar sesión
          </Text>
          {/* <MaterialCommunityIcons name="arrow-left" size={25} color={'#474747'} /> */}
        </View>
      </TouchableOpacity>

      <Row>
        <Col numRows={4}>
          <Text style={styles.subTitle}>Mi Cuenta</Text>
        </Col>
        <Col numRows={1}>
          <TouchableOpacity style={[styles.roundedButton, styles.iconButton]} onPress={() => navigation.navigate("Notif")}>
            <MaterialCommunityIcons name="arrow-right" size={25} color={'#fff'} />
          </TouchableOpacity>
        </Col>
      </Row>
      <Row>
        <Col numRows={4}>
          <Text style={styles.subTitle}>Términos de Uso</Text>
        </Col>
        <Col numRows={1}>
          <TouchableOpacity style={[styles.roundedButton, styles.iconButton]} onPress={() => navigation.navigate("Term")}>
            <MaterialCommunityIcons name="arrow-right" size={25} color={'#fff'} />
          </TouchableOpacity>
        </Col>
      </Row>
      <Row>
        <Col numRows={4}>
          <Text style={styles.subTitle}>Política de Privacidad</Text>
        </Col>
        <Col numRows={1}>
          <TouchableOpacity style={[styles.roundedButton, styles.iconButton]} onPress={() => navigation.navigate("Poli")}>
            <MaterialCommunityIcons name="arrow-right" size={25} color={'#fff'} />
          </TouchableOpacity>
        </Col>
      </Row>
    </View>
  );
}

export default Settings;
