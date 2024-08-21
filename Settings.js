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
  containercc: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'right',
    justifyContent: 'center',
    width: '100%'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 17,
    marginBottom: 0,
  },
  text: {
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
  },
  roundedButton: {
    backgroundColor: '#1D6FB8',
    borderRadius: 25,
    borderColor: '#1d6fb8',
    borderWidth: 6,
    marginBottom: 20,
    alignSelf: 'auto',
    paddingEnd: 40,
    paddingStart: 40,
    marginEnd: 65,
    marginStart: 65,
  },
  logoutbutton: {
    backgroundColor: '#de2a2f',
    borderRadius: 25,
    borderColor: '#de2a2f',
    borderWidth: 6,
    marginBottom: 20,
    alignSelf: 'auto',
    paddingEnd: 45,
    paddingStart: 40,
    marginEnd: 65,
    marginStart: 65,
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

    <View style={{ backgroundColor: '#fff', paddingBottom: 250 }}>
      <View style={{ width: '100%', padding: 12, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 70, paddingTop: 35 }}>
        <MaterialCommunityIcons style={{ color: '#1D6FB8', paddingTop: 10 }} name="archive-cog-outline" size={35} onPress={() => navigation.navigate("Electric")} />
      </View>

      <Text style={[styles.header, { textAlign: 'center' }, { paddingBottom: 70, backgroundColor: '#fff' }]}>{nombreUsuario}</Text>
      <View style={{paddingBottom:10}}>
        <TouchableOpacity style={[styles.roundedButton]} onPress={() => navigation.navigate("Notif")}>
          <Text style={[styles.subTitle, { color: '#fff' }]}>Mi cuenta</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingBottom:10}}>
      <TouchableOpacity style={[styles.roundedButton]} onPress={() => navigation.navigate("Term")}>
        <Text style={[styles.subTitle, { color: '#fff' }]}>Términos de uso</Text>
      </TouchableOpacity>
      </View>
      <View style={{paddingBottom:10}}>
      <TouchableOpacity style={[styles.roundedButton]} onPress={() => navigation.navigate("Poli")}>
        <Text style={[styles.subTitle, { color: '#fff' }]}>Política de privacidad</Text>
      </TouchableOpacity>
      </View>
      <View style={{paddingBottom:10}}>
      <TouchableOpacity style={[styles.logoutbutton]} onPress={() => navigation.navigate("Login")}>
        <Text style={[styles.subTitle, { color: '#fff' }]}>Cerrar sesión</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default Settings;
