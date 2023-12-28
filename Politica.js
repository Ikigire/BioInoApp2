import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  setFontSizeOne: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 16,
  },
  boldText: {
    fontWeight: 'bold', // Estilo en negrita para el texto inicial de cada párrafo
  },
});

const Politica = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <Text style={styles.setFontSizeOne}>
          <Text style={styles.boldText}>Principio de licitud, lealtad y transparencia:</Text> El Titular siempre requerirá el consentimiento para el tratamiento de tus datos personales que puede ser para uno o varios fines específicos sobre los que te informará previamente con absoluta transparencia.
        </Text>
        <Text style={styles.setFontSizeOne}>
          <Text style={styles.boldText}>Principio de minimización de datos:</Text> El Titular te solicitará solo los datos estrictamente necesarios para el fin o los fines que los solicita.
        </Text>
        <Text style={styles.setFontSizeOne}>
          <Text style={styles.boldText}>Principio de limitación del plazo de conservación:</Text> Los datos se mantendrán durante el tiempo estrictamente necesario para el fin o los fines del tratamiento.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Politica;
