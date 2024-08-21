import { Component, useState } from "react";
import { Button, Text, View, StyleSheet, ScrollView, Pressable, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import FlashMessage from "react-native-flash-message";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

s = require("./Styles")

export const homeIcons = [
  { icon: 'knife', grupo: 'Cocina', estab: 'Casa' },
  { icon: 'toilet', grupo: 'Baño', estab: 'Casa' },
  { icon: 'bed-queen-outline', grupo: 'Sala', estab: 'Casa' },
  { icon: 'bed-empty', grupo: 'Cuarto', estab: 'Casa' },
  { icon: 'stairs', grupo: 'Escaleras', estab: 'Casa' },
  { icon: 'arm-flex-outline', grupo: 'Gimnasio', estab: 'Casa' },
  { icon: 'baby-bottle', grupo: 'Cuarto Bebé', estab: 'Casa' },
  { icon: 'car', grupo: 'Garage', estab: 'Casa' },
  { icon: 'water', grupo: 'Lavandería', estab: 'Casa' },
  { icon: 'water-polo', grupo: 'Piscina', estab: 'Casa' },
  { icon: 'flower', grupo: 'Jardín', estab: 'Casa' },
  { icon: 'food', grupo: 'Comedor', estab: 'Casa' },
  { icon: 'hand-saw', grupo: 'Bodega', estab: 'Casa' },
  { icon: 'cellphone-link', grupo: 'Estudio', estab: 'Casa' },
  { icon: 'google-controller', grupo: 'Sala de Juegos', estab: 'Casa' },
  { icon: 'grill', grupo: 'Terraza', estab: 'Casa' }
];

export const hospitalIcons = [
  { icon: 'office-building', grupo: 'Consultorio', estab: 'Hospital' },
  { icon: 'cash-register', grupo: 'Recepción', estab: 'Hospital' },
  { icon: 'dna', grupo: 'Sala de estudios', estab: 'Hospital' },
  { icon: 'mother-heart', grupo: 'Sala Maternidad', estab: 'Hospital' },
  { icon: 'hospital', grupo: 'Urgencias', estab: 'Hospital' },
  { icon: 'baby-face', grupo: 'Incubadora', estab: 'Hospital' },
  { icon: 'coffee-maker', grupo: 'Comedor', estab: 'Hospital' },
  { icon: 'ambulance', grupo: 'Ambulancia', estab: 'Hospital' },
  { icon: 'truck', grupo: 'Estacionamiento', estab: 'Hospital' },
  { icon: 'skull-outline', grupo: 'Rayos X', estab: 'Hospital' },
  { icon: 'seat', grupo: 'Sala de Espera', estab: 'Hospital' },
  { icon: 'bed', grupo: 'Habitación', estab: 'Hospital' },
  { icon: 'meditation', grupo: 'Psicología', estab: 'Hospital' },
  { icon: 'tooth', grupo: 'Dentista', estab: 'Hospital' },
  { icon: 'food-apple', grupo: 'Nutrición', estab: 'Hospital' },
  { icon: 'heart', grupo: 'Cardiología', estab: 'Hospital' },
  { icon: 'stomach', grupo: 'Gastroenterología', estab: 'Hospital' },
  { icon: 'brain', grupo: 'Neurología', estab: 'Hospital' },
  { icon: 'face-woman', grupo: 'Ginecología', estab: 'Hospital' },
  { icon: 'human-handsdown', grupo: 'Dermatología', estab: 'Hospital' },
  { icon: 'face-agent', grupo: 'Urología', estab: 'Hospital' },
  { icon: 'skull-crossbones', grupo: 'Traumatología', estab: 'Hospital' },
  { icon: 'panda', grupo: 'Pediatría', estab: 'Hospital' },
  { icon: 'virus', grupo: 'Oncología', estab: 'Hospital' }
]

export const escuelaIcons = [
  { icon: 'school', grupo: 'Dirección', estab: 'Escuela' },
  { icon: 'bowl-mix', grupo: 'Cafetería', estab: 'Escuela' },
  { icon: 'brush', grupo: 'Salón de Arte', estab: 'Escuela' },
  { icon: 'bus-school', grupo: 'Estacionamiento', estab: 'Escuela' },
  { icon: 'desktop-mac', grupo: 'Aula de Cómputo', estab: 'Escuela' },
  { icon: 'basketball', grupo: 'Auditorio', estab: 'Escuela' },
  { icon: 'gate', grupo: 'Entrada', estab: 'Escuela' },
  { icon: 'human-child', grupo: 'Aula', estab: 'Escuela' },
  { icon: 'soccer', grupo: 'Cancha', estab: 'Escuela' },
  { icon: 'doctor', grupo: 'Enfermería', estab: 'Escuela' },
  { icon: 'music', grupo: 'Sala de Música', estab: 'Escuela' },
  { icon: 'note', grupo: 'Servicios Administrativos', estab: 'Escuela' }
]

export const officeIcons = [
  { icon: 'seat', grupo: 'Recepción', estab: 'Oficina' },
  { icon: 'cookie', grupo: 'Cocina', estab: 'Oficina' },
  { icon: 'toilet', grupo: 'Baño', estab: 'Oficina' },
  { icon: 'folder-multiple', grupo: 'Archivo', estab: 'Oficina' }
]

function Ubicacion({navigation, route}) {
  let keyCounter = 0;
  const [selectedIcon, setSelectedIcon] = useState('');
  // const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedEstab, setSelectedEstab] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const { dispositivo } = route.params;

  const changeSelectedIcon = ({ grupo, estab }) => {
    if (grupo == selectedIcon && estab == selectedEstab) {
      setSelectedIcon('');
      setSelectedEstab(estab);
    } else {
      setSelectedIcon(grupo);
      setSelectedEstab(estab);
    }
  }

  const conditionalStyles = StyleSheet.create({
    active: (valueIcon) => {
      const bgColor = valueIcon == `${selectedIcon}` ? '#1d6fb8' : 'transparent';
      const txtColor = valueIcon == `${selectedIcon}` ? 'white' : 'black';
      const borderRadius = 10;
      // const borderRadius = valueIcon == this.selectedIcon ? 10 : 0;
      return {
        backgroundColor: bgColor,
        color: txtColor,
        borderRadius: borderRadius,
        textAlign: 'center'
      }
    },
    activeButton: (disabled) => {
      const bgColor = !disabled ? '#1d6fb8' : 'gray';
      return {
        height: 50,
        width: '98%',
        borderRadius: 25,
        textAlign: 'center',
        color: 'white',
        backgroundColor: bgColor,
        verticalAlign: 'middle',
        alignSelf: 'center'
      }
    }
  })

  const renderOptionRow = (iconArray) => {
    const Col = ({ numCols, children }) => {
      return (
        <View style={s[`${numCols}col`]}>{children}</View>
      )
    }

    const Row = ({ children }) => (
      <View style={s.row}>{children}</View>
    )

    const IconSelectable = ({ text, icon = null, icon_size = 25, estab, onPress = null }) => {
      if (!onPress) {
        onPress = () => {
          changeSelectedIcon({
            grupo: icon,
            estab
          });

        }
      }

      if (icon == null) {
        return (
          <Pressable onPress={onPress} key={keyCounter++}>
            <Text>{'\n' + text}</Text>
          </Pressable>
        )
      } else {
        return (
          <Pressable onPress={onPress} key={keyCounter++}>
            <Text style={conditionalStyles.active(`${icon}`)}>
              <MaterialCommunityIcons name={icon} size={icon_size} />{'\n' + text}
            </Text>
          </Pressable>
        );
      }
    }

    let rows = [];
    let components = [];

    // Reiniciar el contador
    keyCounter = 0;

    let c = 0; // Corregir error: declarar la variable c

    for (let index = 0; index < iconArray.length; index++) {
      const icon = iconArray[index];
      c++;
      if (c <= 4) {
        components.push(
          <Col numCols={1} key={keyCounter++}>
            <IconSelectable text={icon.grupo} icon={icon.icon} estab={icon.estab} icon_size={60} />
          </Col>
        );
      }
      if (c >= 4 || index === iconArray.length - 1) {
        rows.push(
          <Row key={keyCounter++}>
            {components}
          </Row>
        );
        components = [];
        c = 0;
      }
    }
    return rows;
  }


  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={{width: '95%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={s.title}>¿En donde está ubicado?</Text>
        <TextInput style={[s.input]}
          value={ubicacion}
          onChangeText={(text) => { setUbicacion(text); }}
        />
      </View>
      <Text style={[s.title, {textAlign: 'center'}]}>Selecciona un ícono</Text>
      
      <ScrollView>
        <View style={s.imagesGrid}>
          <Text style={s.title}>{'Hogar \n'}</Text>
          {renderOptionRow(homeIcons)}

          <Text style={s.title}>{'\n Hospital\n'}</Text>
          {renderOptionRow(hospitalIcons)}

          <Text style={s.title}>{'\n Escuela\n'}</Text>
          {renderOptionRow(escuelaIcons)}

          <Text style={s.title}>{'\n Oficina\n'}</Text>
          {renderOptionRow(officeIcons)}
        </View>
      </ScrollView>

      <View style={{ paddingTop: 15, marginBottom: 5 }}>
        <Pressable onPress={() => {
          // alert(`El item seleccionado es: ${selectedIcon}\nEstab: ${selectedEstab}`);
          if (!selectedIcon || !ubicacion) {
            return;
          }
          navigation.navigate("Nombre", { dispositivo: { ...dispositivo, ubicacion, icon: selectedIcon } });
        }}
          disabled={!selectedIcon}>
          <Text style={conditionalStyles.activeButton(!selectedIcon || !ubicacion)} >Aceptar</Text>
        </Pressable>
      </View>
    </View>
  );

}

export default Ubicacion;