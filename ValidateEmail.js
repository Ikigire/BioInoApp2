import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { gStyles } from './GlobalStyles';
import { validateCode } from './services/email-validation.service';
import FlashMessage from 'react-native-flash-message';
import { baseUrl, prodUrl } from './utils/constantes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1D6FB8'
    },input: {
        width: 300, // Ajusta el ancho según tus preferencias
        height: 43,
        paddingHorizontal: 10,
        marginBottom: 20, // Incrementa este valor para aumentar la separación
        borderWidth: 1,
        borderColor: 'gray', // Cambia el color del borde según tus preferencias
        borderRadius: 10, // Ajusta este valor para hacer las esquinas más cuadradas
        fontSize: 15
      },
      activeButton: {
        marginTop: 16,
        height: 50,
        width: "98%",
        borderRadius: 20,
        textAlign: "center",
        color: "white",
        backgroundColor: "#1d6fb8",
        textAlignVertical: "center",
        alignSelf: "center",
      },
      button: {

        height: 50,
        width: '100%',
        borderRadius: 15,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#1d6fb8',
        verticalAlign: 'middle',
        alignSelf: 'center',
        borderCurve:15

    },
})

const ValidateEmail = ({ route, navigation }) => {
    const { newUser } = route.params;
    console.log(newUser);

    const [code, setCode] = useState("");
    const [buttonActive, setButtonActive] = useState(true)
    const flashMessage = useRef();

    const registrarUsuario = (user) => {
        const url = `${prodUrl}/usuario`;
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container]}>
                <Text style={ {textAlign: 'center',fontSize: 15}}>Se a enviado un código de verificación a su correo:</Text>
                <Text style={ { marginBottom: 10, textAlign: 'center',fontSize: 15}} >Ingrésalo a continuación</Text>
                <TextInput
                    style={[styles.input]}
                    value={code}
                    autoCapitalize={'characters'}
                    onChangeText={(text) => setCode(text)}
                    placeholder="1A2B3C"
                />
                <Pressable style={[{ margin: 15, width: '100%', }]}
                    onPress={handleValidarButtonPress}
                    disabled={!buttonActive}
                >
                    <Text style={[styles.button, {width: '30%'}]}>Validar</Text>
                </Pressable>

            </View>
            </TouchableWithoutFeedback>
            <FlashMessage ref={flashMessage} position={"top"} />
            

        </>
    )
}

export default ValidateEmail