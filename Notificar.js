import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput, Alert } from 'react-native';
import { gStyles } from './GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usuarioItemKey } from './utils/constantes';
import { updateUsuario } from './services/usuario.service';
import FlashMessage from 'react-native-flash-message';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setFontSizeOne: {
    fontSize: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 28,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleSwitch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Aumentamos el tamaño del toggle
  },
  disabled: (disabled = false) => ({
    backgroundColor: !disabled ? '#1D6FB8' : '#494949'
  })
});

const Notificar = () => {
  // const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  // const [areAlarmsEnabled, setAreAlarmsEnabled] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [nombreUsuario, setnombreUsuario] = useState("Jonh Doe");
  const [disa, setDisa] = useState(false);
  const [nombreOriginal, setNombreOriginal] = useState("")


  // const handleToggleNotification = () => {
  //   setIsNotificationEnabled(!isNotificationEnabled);
  // };

  // const handleToggleAlarms = () => {
  //   setAreAlarmsEnabled(!areAlarmsEnabled);
  // };

  const handleGuardarCambios = () => {
    let {createdAt, updatedAt, ...user} = usuario;
    user.nombre = nombreUsuario.trim();

    updateUsuario(user)
      .then(async resp => {
        if (resp.status != 200) {
          const {message} = await resp.json();
          throw new Error(`Algo salió mal: ${message}`);
        }

        user = await resp.json();
        setUsuario(user);
        setNombreOriginal(user.nombre)

        AsyncStorage.setItem(usuarioItemKey, JSON.stringify(user));
        this.flashMessage.showMessage({
          message: "Los cambios se guardaron correctamente",
          type: 'success',
          icon: 'success',
          duration: 5000
        })
      })
      .catch(error => {
        this.flashMessage.showMessage({
          message: "No fue posible guardar la información.\nIntente más tarde",
          type: 'danger',
          icon: 'danger',
          duration: 5000
        })
      })
  }

  useEffect(() => {
    AsyncStorage.getItem(usuarioItemKey)
      .then(value => {
        const { nombre } = JSON.parse(value);
        setUsuario(JSON.parse(value))
        setNombreOriginal(nombre);
        setnombreUsuario(nombre);
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Ocurrió un error", error.message);
      });
  }, []);

  return (
    <>
      <View style={[gStyles.container,{paddingBottom: 0}]}>
        <Text style={[gStyles.title]}>Información de la cuenta</Text>
        <Text style={{ fontSize: 15, marginTop: 40, marginBottom: -20 }}>Nombre:</Text>
        <TextInput
          style={gStyles.input}
          placeholder='Nombre de usuario'
          value={nombreUsuario}
          onChangeText={text => setnombreUsuario(text)}
        />
        
        {/* <View style={styles.setFontSizeOne}>
        <Text style={styles.toggleText}>
          {isNotificationEnabled ? 'Habilitar\nNotificaciones' : 'Deshabilitar\nNotificaciones'}
        </Text>
        <View style={styles.toggleContainer}>
          <Switch
            value={isNotificationEnabled}
            onValueChange={handleToggleNotification}
            style={styles.toggleSwitch} // Agregamos el estilo para el tamaño del toggle
          />
        </View>
      </View>
      <View style={styles.setFontSizeOne}>
        <Text style={styles.toggleText}>
          {areAlarmsEnabled ? 'Habilitar\nAlarmas' : 'Deshabilitar\nAlarmas'}
        </Text>
        <View style={styles.toggleContainer}>
          <Switch
            value={areAlarmsEnabled}
            onValueChange={handleToggleAlarms}
            style={styles.toggleSwitch} // Agregamos el estilo para el tamaño del toggle
          />
        </View>
      </View> */}
      <TouchableOpacity style={[{ width: '50%' },{paddingBottom: 200},{marginTop:20}]} disabled={nombreOriginal == nombreUsuario} onPress={handleGuardarCambios}>
        <Text style={[gStyles.button, styles.disabled(nombreOriginal == nombreUsuario)]}>Guardar cambios</Text>
      </TouchableOpacity>
      </View>
      
      <FlashMessage ref={ref => this.flashMessage = ref} position={'top'} />
    </>
  );
};

export default Notificar;
