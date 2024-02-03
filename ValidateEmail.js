import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { gStyles } from './GlobalStyles';
import { validateCode } from './services/email-validation.service';
import FlashMessage from 'react-native-flash-message';
import { baseUrl } from './utils/constantes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1D6FB8'
    }
})

const ValidateEmail = ({ route, navigation }) => {
    const { newUser } = route.params;
    console.log(newUser);

    const [code, setCode] = useState("");
    const [buttonActive, setButtonActive] = useState(true)
    const flashMessage = useRef();

    const registrarUsuario = (user) => {
        const url = `${baseUrl}/usuarios`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            // body: newUser,
        })
            .then((response) => response.json())
            .then((resp) => {
                if (resp.errorType ?? false) {
                    flashMessage.current.showMessage({
                        message: `Algo salió mal\n${resp.message}`,
                        type: "danger",
                        duration: 3000
                    });
                    this.setState({ disabled: false });
                    setButtonActive(true);
                    return
                }
                navigation.navigate("Login");
            })
            .catch((error) => {
                console.error("Error al registrar el usuario:", error);
                this.setState({ disabled: false });
                flashMessage.current.showMessage({
                    message: `No fue posible registrar al usuario ${error}`,
                    type: 'danger'
                })
                setButtonActive(true);
            });
    }

    const handleValidarButtonPress = () => {
        setButtonActive(false);
        if (!code || !code.trim()) {
            flashMessage.current.showMessage({
                message: 'Ingrese el código que recibió por email',
                type: 'info',
                icon: 'info',
                duration: 3000
            });
            return;
        }
        validateCode(newUser.email, code.toUpperCase())
            .then(async (resp) => {
                if (resp.status != 200) {
                    flashMessage.current.showMessage({
                        message: (await resp.json()).message,
                        type: 'danger',
                        icon: 'danger',
                        duration: 3000
                    });
                    setButtonActive(true);
                    return;
                }

                registrarUsuario(newUser);
            })
            .catch(error => {
                console.log(error);
                flashMessage.current.showMessage({
                    message: error.message,
                    type: 'danger',
                    icon: 'danger',
                    duration: 3000
                });
                setButtonActive(true);
            });
    }
    return (
        <>
            <View style={[styles.container]}>
                <Text style={[styles.title, { marginBottom: 15 }]}>Validación de Correo</Text>
                <Text>Hemos enviado un código de verificación al correo {newUser.email}.</Text>
                <Text> Por favor ingrésalo a continuación</Text>
                <TextInput
                    style={[gStyles.input]}
                    value={code}
                    autoCapitalize={'characters'}
                    onChangeText={(text) => setCode(text)}
                />
                <Pressable style={[{ margin: 15, width: '100%' }]}
                    onPress={handleValidarButtonPress}
                    disabled={!buttonActive}
                >
                    <Text style={[gStyles.button]}>Validar</Text>
                </Pressable>

            </View>
            <FlashMessage ref={flashMessage} position={"top"} />
        </>
    )
}

export default ValidateEmail