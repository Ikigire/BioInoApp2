import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

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
});

const Notificar = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [areAlarmsEnabled, setAreAlarmsEnabled] = useState(false);

  const handleToggleNotification = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  const handleToggleAlarms = () => {
    setAreAlarmsEnabled(!areAlarmsEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.setFontSizeOne}>
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
      </View>
    </View>
  );
};

export default Notificar;
