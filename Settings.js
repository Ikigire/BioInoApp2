import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
});

function Settings({ navigation }) {
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
    navigation.navigate("ModificarUsuario");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressHeader}>
        <Text style={styles.header}>Orlando Javier</Text>
      </TouchableOpacity>

      <Row>
        <Col numRows={4}>
          <Text style={styles.subTitle}>Configuración</Text>
        </Col>
        <Col numRows={1}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Notif")}>
            <MaterialCommunityIcons name="arrow-right" size={25} />
          </TouchableOpacity>
        </Col>
      </Row>
      <Row>
        <Col numRows={4}>
          <Text style={styles.subTitle}>Términos de Uso</Text>
        </Col>
        <Col numRows={1}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Term")}>
            <MaterialCommunityIcons name="arrow-right" size={25} />
          </TouchableOpacity>
        </Col>
      </Row>
      <Row>
        <Col numRows={4}>
          <Text style={styles.subTitle}>Política de Privacidad</Text>
        </Col>
        <Col numRows={1}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Poli")}>
            <MaterialCommunityIcons name="arrow-right" size={25} />
          </TouchableOpacity>
        </Col>
      </Row>
    </View>
  );
}

export default Settings;
