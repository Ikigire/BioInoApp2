import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, StyleSheet, ActivityIndicator } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { getAllUsuarioWithEmail } from './services/usuario.service';
import { createRecoveryCode } from './services/email-validation.service';
import { gStyles } from './GlobalStyles';

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
        width: 300,
        height: 43,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8, // Make it squared
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginBottom: 20,
        fontSize: 15
    },
    title: {
        fontSize: 15,
        alignSelf: 'center',
        paddingBottom: 5
    },
    button: {
        margin: 10,
        width: '40%',
        height: 40,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal:60,
        borderRadius: 8,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textTransform: 'none',
        textAlign: "center",
    justifyContent: "center",
    alignItems: "center", // Ensure text remains in lowercase
        
    },
    buttonPressed: {
        backgroundColor: '#145a86', // Change to desired color when pressed
    },
    buttonNormal: {
        backgroundColor: '#1d6fb8', // Original button color
    }
});

const RecoveryEnterEmail = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [userEmails, setUserEmails] = useState([]);
    const [disabledButton, setDisabledButton] = useState(false);
    const [ready, setReady] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const flashMessage = useRef();

    const handleButtonPress = () => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!email.match(emailRegex)) {
            flashMessage.current.showMessage({
                message: 'Ingrese un email válido',
                type: 'info',
                icon: 'danger',
                duration: 3000
            });
            return;
        }

        if (!userEmails.includes(email.trim())) {
            flashMessage.current.showMessage({
                message: `No se encuentra ningún usuario con el correo ${email}`,
                type: 'warning',
                icon: 'danger',
                duration: 3000
            });
            return
        }

        createRecoveryCode(email)
            .then(resp => {
                if (resp.status != 200)
                    throw new Error("No fue posible crear el código de recuperación");

                navigation.navigate("RecoverValidateEmail", { email });
            })
            .catch(error => {
                console.error(error);
                flashMessage.current.showMessage({
                    message: error.message,
                    type: 'danger',
                    icon: 'danger',
                    duration: 5000
                });
            });
    }

    useEffect(() => {
        getAllUsuarioWithEmail()
            .then((resp) => {
                if (resp.status != 200) {
                    console.error(resp.status);
                    throw new Error('No fue posible conectarse');
                }
                return resp.json();
            })
            .then(emails => {
                setUserEmails(emails.map((item) => item.email ?? ''));
                setReady(true);
            })
            .catch(error => {
                console.error(error);
                flashMessage.current.showMessage({
                    message: error.message,
                    type: 'danger',
                    icon: 'danger',
                    duration: 5000
                });
            });
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ width: '101%', height: '100%', backgroundColor: '#fff' }}>
                {
                    ready ?
                        <View style={[gStyles.centerContent]}>
                            <Text style={[styles.title]}>Ingrese su correo electrónico</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                placeholder="usuario@mail.com"
                                keyboardType='email-address'
                                onChangeText={(text) => setEmail(text)}
                            />
                            <Pressable
                                style={[styles.button, isButtonPressed ? styles.buttonPressed : styles.buttonNormal]}
                                disabled={disabledButton}
                                onPressIn={() => setIsButtonPressed(true)}
                                onPressOut={() => setIsButtonPressed(false)}
                                onPress={handleButtonPress}
                            >
                                <Text style={[gStyles.buttonText, styles.buttonText]}>Enviar código</Text>
                            </Pressable>
                        </View>
                        :
                        <>
                            <ActivityIndicator size={'large'} color='#1D6FB8' />
                            <Text style={[gStyles.title]}>Espere por favor</Text>
                        </>
                }
                <FlashMessage ref={flashMessage} position={'top'} />
                <FlashMessage ref={(ref) => this.myLocalFlashMessage = ref} position="bottom" />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default RecoveryEnterEmail;
