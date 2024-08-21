import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { baseUrl, prodUrl, usuarioItemKey, headers } from "./utils/constantes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';

globalStyle = require("./Styles")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    imageContainer: {
        marginBottom: 60,
    },
    image: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
    },
    input: {
        width: 290,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    input2: {
        width: 290,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        marginStart: 43,
        fontSize: 14,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        marginLeft: 10,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#1d6fb8',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'none', // Asegura que el texto no se transforme a mayúsculas en Android
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
});

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            validEmail: false,
            emailTouched: false,
            validPass: false,
            passTouched: false,
            showPassword: false,
        }
    }

    handlerLogin = async () => {
        const { validEmail, validPass, emailTouched, passTouched, showPassword, ...loginInfo } = this.state;

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
                message: "La contraseña debe contener por lo menos 6 caracteres",
                type: "danger",
                duration: 2000
            });
            return;
        }

        const url = `${prodUrl}/usuario/login`;
        fetch(url, {
            method: 'post',
            headers,
            body: JSON.stringify(loginInfo)
        })
            .then(resp => {
                return resp.json()
            })
            .then(async (data) => {
                if (data.error ?? false) {
                    throw new Error(`${data.error}\n${data.message}`);
                }

                await AsyncStorage.setItem(usuarioItemKey, JSON.stringify(data));
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
        this.setState({ validEmail: emailRegex.test(text) });
    }

    handleBlurEmail = () => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;
        const isValidEmail = emailRegex.test(this.state.email);
        this.setState({ validEmail: isValidEmail });
    }

    validatePassword = (text) => {
        this.setState({ password: text });
        this.setState({ validPass: text.length >= 6 });
    }

    toggleShowPassword = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    };

    render() {
        const { validEmail, validPass } = this.state;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>

                            <View style={[globalStyle.centerContent]}>
                                <View style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
                                    <Image
                                        source={require('./assets/logo_OP2_2.png')}
                                        style={{ flex: 1, width: 200, height: 150, resizeMode: 'contain' }}
                                    />
                                </View>

                                <Text style={{ textAlign: 'left', fontSize: 15, paddingEnd: 230 }}>Usuario</Text>
                                <TextInput
                                    style={styles.input}
                                    onSubmitEditing={() => this.passInput.focus()}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    placeholder='usuario@mail.com'
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={this.state.email}
                                    onChange={this.validateEmail}
                                    onBlur={this.handleBlurEmail}
                                    onFocus={() => this.setState({ emailTouched: true })}
                                />
                                <Text style={{ textAlign: 'left', fontSize: 15, paddingEnd: 205 }}>Contraseña</Text>
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={[styles.input2, { marginRight: 0 }]}
                                        ref={(input2) => this.passInput = input2}
                                        returnKeyType="done"
                                        onSubmitEditing={this.handlerLogin}
                                        placeholder='contraseña'
                                        autoCapitalize="none"
                                        secureTextEntry={!this.state.showPassword}
                                        value={this.state.password}
                                        onChangeText={this.validatePassword}
                                        onFocus={() => this.setState({ passTouched: true })}
                                    />
                                    <Pressable onPress={this.toggleShowPassword} style={styles.eyeIcon}>
                                        <MaterialIcons name={this.state.showPassword ? "visibility" : "visibility-off"} size={30} color="black" />
                                    </Pressable>
                                </View>
                            </View>

                            <View style={{ marginHorizontal: 50, paddingHorizontal: 70, borderRadius: 15 }}>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.button,
                                        pressed && { backgroundColor: '#1d6fb8' },
                                        (!validEmail || !validPass) && styles.buttonDisabled,
                                    ]}
                                    onPress={this.handlerLogin}
                                    disabled={!validEmail || !validPass}
                                >
                                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                                </Pressable>
                            </View>

                            <View style={globalStyle.centerContent}>
                                <Pressable onPress={() => this.props.navigation.navigate("Signin")}>
                                    <Text style={{ fontSize: 15, color: '#1d6fb8' }}>Registrarme</Text>
                                </Pressable>
                                <Pressable onPress={() => this.props.navigation.navigate("RecoverEmail")} style={{ marginTop: 15 }}>
                                    <Text style={{ fontSize: 15, color: '#1d6fb8' }}>Olvidé mi contraseña</Text>
                                </Pressable>
                            </View>

                            <FlashMessage ref={(flashMessage) => this.flashMessage = flashMessage} position={'bottom'} animated />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default Login;
