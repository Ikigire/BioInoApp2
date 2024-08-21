import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ModificarUsuario() {
    const navigation = useNavigation();
    const [nuevoNombre, setNuevoNombre] = useState('');
  
    const handleGoBack = () => {
      // Navegar hacia atrás a la pantalla anterior
      navigation.goBack();
    };
  
    const handleChangeNombre = (text) => {
      // Actualizar el valor del nombre en el estado local
      setNuevoNombre(text);
    };
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        {/* Campo de texto para cambiar el nombre */}
        <TextInput
          placeholder="Cambiar nombre"
          value={nuevoNombre}
          onChangeText={handleChangeNombre}
        />
  
        {/* Botón para aceptar el cambio de nombre */}
        <TouchableOpacity onPress={handleGoBack}>
          <Text>Aceptar</Text>
        </TouchableOpacity>
        <View style={{ minHeight: 70, width: '100%', backgroundColor: '#1d6fb8' }}>
                </View>
                <FlashMessage ref={(flashMessage) => this.flashMessage = flashMessage} position={'bottom'} animated />
            </View>
    </TouchableWithoutFeedback>
      
    );
  }
  
  export default ModificarUsuario;