import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { gStyles } from './GlobalStyles'
import FlashMessage from 'react-native-flash-message';
import { getAllUsuarioWithEmail } from './services/usuario.service';
import { ActivityIndicator } from 'react-native-paper';
import { createRecoveryCode } from './services/email-validation.service';

const RecoveryEnterEmail = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [userEmails, setUserEmails] = useState([]);
    const [disabledButton, setDisabledButton] = useState(false);
    const [ready, setReady] = useState(false);

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
                if ( resp.status != 200 )
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
                    throw new Error('No fue posible conectarse')
                }
                return resp.json()
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
            })
    }, [])

    return (
        <View style={[gStyles.container]}>
            {
                ready ?
                    <>
                        <Text style={gStyles.title}>Ingrese su correo electrónico</Text>
                        <TextInput
                            style={[gStyles.input]}
                            value={email}
                            placeholder='Correo electrónico'
                            keyboardType='email-address'
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Pressable style={[{ margin: 10, width: '90%' }]}
                            disabled={disabledButton}
                            onPress={handleButtonPress}
                        >
                            <Text style={[gStyles.button]}>Enviar código de recuperación</Text>
                        </Pressable>
                    </>
                    :
                    <>
                        <ActivityIndicator size={'large'} color='#1D6FB8' />
                        <Text style={[gStyles.title]}>Espere por favor</Text>
                    </>
            }

            <FlashMessage ref={flashMessage} position={'top'} />
        </View>
    )
}

export default RecoveryEnterEmail