import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { gStyles } from './GlobalStyles';
import FlashMessage from 'react-native-flash-message';
import { validateCode } from './services/email-validation.service';

const RecoveryValidateEmail = ({ route, navigation }) => {
    const { email } = route.params;
    console.log(email);

    const [code, setCode] = useState("");
    const [buttonActive, setButtonActive] = useState(true);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const flashMessage = useRef();

    const handleValidarButtonPress = () => {
        setButtonActive(false);
        if (!code || !code.trim()) {
            flashMessage.current.showMessage({
                message: 'Ingrese el código que recibió por email',
                type: 'info',
                icon: 'info',
                duration: 3000
            });
            setButtonActive(true);
            return;
        }

        validateCode(email, code.toUpperCase())
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
                const { createdAt, updatedAt, ...userData } = (await resp.json()).dataValues;
                userData.password = '';
                console.log(userData);
                navigation.navigate("PassRecovery", { user: userData });
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[gStyles.container]}>
                <Text style={{ fontSize: 15 }}>Se ha enviado un código de verificación a su correo:</Text>
                <Text style={{ marginBottom: 15, textAlign: 'center', fontSize: 15 }}> Ingrésalo a continuación</Text>
                <TextInput
                    style={[styles.input]}
                    value={code}
                    autoCapitalize={'characters'}
                    onChangeText={(text) => setCode(text)}
                    placeholder="1A2B3C"
                />
                <Pressable
                    style={[styles.button, isButtonPressed ? styles.buttonPressed : styles.buttonNormal, { margin: 15, width: '30%' }]}
                    onPressIn={() => setIsButtonPressed(true)}
                    onPressOut={() => setIsButtonPressed(false)}
                    onPress={handleValidarButtonPress}
                    disabled={!buttonActive}
                >
                    <Text style={[ styles.buttonText]}>Validar</Text>
                </Pressable>
                <FlashMessage ref={flashMessage} position={"top"} />
                <FlashMessage ref={(ref) => this.myLocalFlashMessage = ref} position="bottom" />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        fontSize: 15
    },
    button: {
        marginTop: 16,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    buttonText: {
        color: 'white',
        textTransform: 'none',
    },
    buttonPressed: {
        backgroundColor: '#145a86',
    },
    buttonNormal: {
        backgroundColor: '#1d6fb8',
    }
});

export default RecoveryValidateEmail;
