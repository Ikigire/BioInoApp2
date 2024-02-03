import React, { Component, useState, useRef } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { gStyles } from "./GlobalStyles";
import FlashMessage from 'react-native-flash-message';
import { updateUsuario } from "./services/usuario.service";


const conditionalStyles = StyleSheet.create({
    activeButton: (disabled) => {
        const bgColor = !disabled ? '#0390fc' : 'gray';
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
        <View style={{ width: '100%', height: '100%' }}>
            <View style={[gStyles.centerContent]}>
                <Text style={[gStyles.title]}>Recuperar contraseña</Text>

                <TextInput
                    style={gStyles.input}
                    placeholder='Nueva contraseña (letras y números)'
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                    style={gStyles.input}
                    placeholder='Confirmar nueva contraseña'
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={password2}
                    onChangeText={text => setPassword2(text)}
                />

            </View>
            <View style={{ marginBottom: 5 }}>
                <Pressable onPress={handleButtonPress} disabled={false}>
                    <Text style={conditionalStyles.activeButton(false)} >Aceptar</Text>
                </Pressable>
            </View>


            <View style={{ minHeight: 50, width: '100%', backgroundColor: '#0390fc' }}>
            </View>

            <FlashMessage ref={flashMessage} position={"top"} />
        </View>
    );
}

export default PassRecover;