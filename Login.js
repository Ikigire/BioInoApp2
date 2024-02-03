import React, { Component } from "react";
import {Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

import { baseUrl, usuarioItemKey } from "./utils/constantes";
import AsyncStorage from "@react-native-async-storage/async-storage";


globalStyle = require("./Styles")


class Login extends Component {
    constructor() {
        super();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.state = {
            email: "",
            password: "",
            validEmail: false,
            emailTouched: false,
            validPass: false,
            passTouched: false
        }
    }

    forceUpdateHandler() {
        this.forceUpdate();
    }

    conditionalStyles = StyleSheet.create({
        active: (valueIcon) => {
            const bgColor = valueIcon == this.selectedIcon ? '#0390fc' : 'transparent';
            const txtColor = valueIcon == this.selectedIcon ? 'white' : 'black';
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

    handlerLogin = async () => {
        const { validEmail, validPass, emailTouched, passTouched, ...loginInfo } = this.state;
        
        if (!validEmail || !emailTouched) {
            showMessage({
                message: "Ingrese un correo válido",
                type: "danger",
                duration: 2000
            });
            return;
        }
        if (!validPass || !passTouched) {
            showMessage({
                message: "La contraseña debe contener por lo menos 3 caracteres",
                type: "danger",
                duration: 2000
            });
            return;
        }

        const url = `${baseUrl}/usuarios/login`;
        // console.log(url);
        fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo)
        })
            .then(resp => resp.json())
            .then(async (data) => {
                if (data.errorType ?? false) {
                    throw new Error(`${data.errorType}\n${data.message}`);
                }
                // S.setItem("usuario", JSON.stringify(data));
                // await EncryptedStorage.setItem("usuario", JSON.stringify(data))
                // console.info(await EncryptedStorage.getItem("usuario"));

                await AsyncStorage.setItem(usuarioItemKey, JSON.stringify(data));

                // console.info("Usuario: ", await AsyncStorage.getItem("usuario"));

                this.props.navigation.navigate("Tabs");
            })
            .catch(error => {
                showMessage({
                    message: `\n${error.message}`,
                    type: 'danger',
                    duration: 3000
                })
            });
    }

    validateEmail = ({ nativeEvent }) => {
        const { text } = nativeEvent;
        this.setState({ email: text });
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;

        this.setState({ validEmail: emailRegex.test(this.state.email) });
    }

    validatePassword = (text) => {
        this.setState({ password: text });

        this.setState({ validPass: this.state.password.length > 3 })
    }


    render() {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <View style={[globalStyle.centerContent]}>
                    <Text style={[globalStyle.title]}>Iniciar Sesión</Text>

                    <TextInput
                        onSubmitEditing={() => this.passInput.focus()}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        style={globalStyle.input}
                        placeholder='Correo'
                        autoComplete="email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        // onTextInput={this.prueba}
                        value={this.state.email}
                        // onChangeText={this.validateEmail}
                        onChange={this.validateEmail}
                        onFocus={() => this.setState({ emailTouched: true })}
                    />
                    {
                        // this.state.emailTouched && !this.state.validEmail ?
                        //     <View style={globalStyle.input_error_message_container}>
                        //         <Text style={globalStyle.input_error_message}>Ingrese un correo de usuario valido</Text>
                        //     </View> :
                        //     <></>
                    }
                    <TextInput
                        ref={(input) => this.passInput = input}
                        style={globalStyle.input}
                        returnKeyType="done"
                        onSubmitEditing={this.handlerLogin}
                        placeholder='Contraseña (letras y números)'
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={this.validatePassword}
                        onFocus={() => this.setState({ passTouched: true })}
                    />
                    {
                        // this.state.passTouched && !this.state.validPass ?
                        //     <View style={globalStyle.input_error_message_container}>
                        //         <Text style={globalStyle.input_error_message}>La contraseña debe contener por lo menos 3 caracteres</Text>
                        //     </View> :
                        //     <></>
                    }
                </View>

                <View style={{ paddingTop: 15, marginBottom: 5 }}>
                    <Pressable onPress={this.handlerLogin} disabled={false}>
                        <Text style={this.conditionalStyles.activeButton((!this.state.validEmail || !this.state.validPass))} >Iniciar sesión</Text>
                    </Pressable>
                </View>

                <View style={globalStyle.centerContent}>
                    <Text style={[globalStyle.title, { paddingBottom: 25 }]}> ¿No tienes cuenta?</Text>
                    <Pressable onPress={() => this.props.navigation.navigate("Signin")} >
                        <Text style={[{color: '#0000EE' }]}>Registrate aquí</Text>
                    </Pressable>
                    <Pressable onPress={() => this.props.navigation.navigate("RecoverEmail")} style={{ marginTop: 15 }} >
                        <Text style={globalStyle.title} >¿Olvisate tu contraseña?</Text>
                        <Text style={[{color: '#0000EE' }]}>Recupera el acceso a tu cuenta aquí</Text>
                    </Pressable>
                </View>

                <View style={{ minHeight: 50, width: '100%', backgroundColor: '#0390fc' }}>
                </View>
                <FlashMessage ref={(flashMessage) => this.flashMessage = flashMessage} position={'bottom'} animated />
            </View>
        );
    }
}

export default Login;