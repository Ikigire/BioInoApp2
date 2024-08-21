import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { baseUrl, usuarioItemKey } from "./utils/constantes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from "react-native-paper";
import { Input, Icon, Button } from "native-base";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
globalStyle = require("./Styles")

s = require("./Styles");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    containercc: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'right',
        justifyContent: 'center',
        width: '100%'
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
    roundedButton: {
        color: '#fff',
        backgroundColor: '#1D6FB8',
        borderRadius: 100,
        borderColor: '#1d6fb8',
        borderWidth: 6,
        marginBottom: 20,
        alignSelf: 'auto'

    }
});
class DiseñoTest extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            validEmail: false,
            emailTouched: false,
            validPass: false,
            passTouched: false,
            errorMessage: "", // Nuevo estado para el mensaje de error
            showPassword: false // Estado para mostrar/ocultar contraseña
        }
    }

    forceUpdateHandler() {
        this.forceUpdate();
    }

    conditionalStyles = StyleSheet.create({
        active: (valueIcon) => {
            const bgColor = valueIcon == this.selectedIcon ? '#1d6fb8' : 'transparent';
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
            const bgColor = !disabled ? '#1d6fb8' : 'gray';
            return {
                height: 50,
                width: '35%',
                borderRadius: 20,
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
            this.setState({ errorMessage: "Ingrese un correo válido" });
            return;
        }
        if (!validPass || !passTouched) {
            this.setState({ errorMessage: "La contraseña debe contener por lo menos 3 caracteres" });
            return;
        }

        const url = `${baseUrl}/usuarios/login`;

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
                this.setState({ errorMessage: "Correo o contraseña incorrectos" });
                return;
            }
            await AsyncStorage.setItem(usuarioItemKey, JSON.stringify(data));
            this.props.navigation.navigate("Tabs");
        })
        .catch(error => {
            this.setState({ errorMessage: "Ocurrió un error al iniciar sesión" });
        });
    }
    

    validateEmail = (text) => {
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
        this.setState({ validPass: this.state.password.length > 3 })
    }


    toggleShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    render() {
        const { showPassword, errorMessage } = this.state;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 90, marginTop: 50 }}>
                        <Image
                            source={require('./assets/propuesta_2_azul.jpeg')}
                            style={{ flex: 0, width: 150, height: 100 }}
                        />
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Input
                            w={{
                                base: "75%",
                                md: "25%",
                            }}
                            InputLeftElement={
                                <Icon as={<Entypo name="email" />} size={5} ml="2" color="muted.400" />
                            }
                            type="text"
                            onSubmitEditing={() => this.passInput.focus()}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            placeholder="Correo"
                            autoCompleteType="email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={this.state.email}
                            onChangeText={(text) => this.validateEmail(text)}
                            onBlur={this.handleBlurEmail}
                            onFocus={() => this.setState({ emailTouched: true })}
                        />
                    </View>

                    <Input
                        w={{
                            base: "75%",
                            md: "25%"
                        }}
                        type={showPassword ? "text" : "password"}
                        InputRightElement={
                            <Pressable onPress={this.toggleShowPassword}>
                                <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                            </Pressable>
                        }
                        placeholder="Contraseña"
                        autoCapitalize="none"
                        value={this.state.password}
                        onChangeText={this.validatePassword}
                        onSubmitEditing={this.handlerLogin}
                        onFocus={() => this.setState({ passTouched: true })}
                    />
                    <Button onPress={this.handlerLogin}  style={{ marginTop: 50, backgroundColor: '#1D6FB8' }}>
                        <Text style={{ color: 'white' }}>Iniciar sesión</Text>
                    </Button>
                    {errorMessage ? (
                                <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
                            ) : null}
                    <View style={{ flexDirection: 'column', justifyContent: 'start', alignItems: 'center',paddingTop: 100 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 60 }}>
                            <Text style={{ color: '#0000EE', fontSize: 25 }} onPress={() => this.props.navigation.navigate("Signin")}>Registrarme</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#0000EE', fontSize: 25}} onPress={() => this.props.navigation.navigate("RecoverEmail")}>Olvidé mi contraseña</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default DiseñoTest;