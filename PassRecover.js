import React, { Component, useState, useRef } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { gStyles } from "./GlobalStyles";
import FlashMessage from 'react-native-flash-message';
import { updateUsuario } from "./services/usuario.service";


const conditionalStyles = StyleSheet.create({
    activeButton: (disabled) => {
        const bgColor = !disabled ? '#1D6FB8' : 'gray';
        return {
            height: 50,
            width: '35%',
            borderRadius: 25,
            textAlign: 'center',
            color: 'white',
            backgroundColor: bgColor,
            verticalAlign: 'middle',
            alignSelf: 'center'
        }
    }
})

const PassRecover = ({ route, navigation }) => {
    console.log(route.params);
    const { user } = route.params;
    console.log(user);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const flashMessage = useRef();


    const handleButtonPress = () => {
        if (!password.trim() || password.length < 4 || !password2.trim() || password2.length < 4) {
            flashMessage.current.showMessage({
                message: 'Ingrese ambos campos con por lo menos 4 caracteres',
                type: 'info',
                icon: 'info',
                duration: 3000
            });
            return;
        }

        if (password !== password2) {
            flashMessage.current.showMessage({
                message: 'Las contraseñas no coinciden',
                type: 'warning',
                icon: 'info',
                duration: 3000
            });
            return;
        }

        user.password = password;
        updateUsuario(user)
            .then(async resp => {
                if (resp.status != 200)
                    throw new Error( (await resp.json()).message );

                navigation.navigate("Login");
            })
            .catch(error => {
                console.error(error);
                flashMessage.current.showMessage({
                    message: error.message,
                    type: 'danger',
                    icon: 'danger',
                    duration: 4000
                });
            });
    }
    return (
        <View style={{ width: '100%', height: '100%',  backgroundColor: '#fff' }}>
            <View style={[gStyles.centerContent]}>
                <Text style={[gStyles.title]}>Recuperar contraseña</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Nueva contraseña (letras y números)'
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirmar nueva contraseña'
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={password2}
                    onChangeText={text => setPassword2(text)}
                />

            </View>
            <View style={{ marginBottom: 5 }}>
                <Pressable onPress={handleButtonPress} disabled={false} style={backgroundColor = '#1D6FB8'}>
                    <Text style={conditionalStyles.activeButton(false)} >Aceptar</Text>
                </Pressable>
            </View>


           

            <FlashMessage ref={flashMessage} position={"top"} />
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
      width: '100%', // Ajusta el ancho según tus preferencias
      height: 40,
      paddingHorizontal: 10,
      marginBottom: 20, // Incrementa este valor para aumentar la separación
      borderWidth: 1,
      borderColor: 'gray', // Cambia el color del borde según tus preferencias
      borderRadius: 8, // Ajusta este valor para hacer las esquinas más cuadradas
    },
    activeButton: {
      marginTop: 16,
      height: 50,
      width: "98%",
      borderRadius: 25,
      textAlign: "center",
      color: "white",
      backgroundColor: "#1d6fb8",
      textAlignVertical: "center",
      alignSelf: "center",
    },
  });
export default PassRecover;