import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { gStyles } from './GlobalStyles'
import FlashMessage from 'react-native-flash-message';
import { validateCode } from './services/email-validation.service';


const RecoveryValidateEmail = ({route, navigation}) => {
    const { email } = route.params;
    console.log(email);

    const [code, setCode] = useState("");
    const [buttonActive, setButtonActive] = useState(true)
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
                const {createdAt, updatedAt, ...userData} = (await resp.json()).dataValues;
                userData.password = '';
                console.log(userData);
                navigation.navigate("PassRecovery", {user: userData});
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
            <View style={[gStyles.container]}>
                <Text style={[gStyles.title, { marginBottom: 15 }]}>Validación de Correo</Text>
                <Text>Hemos enviado un código de verificación al correo {email}.</Text>
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

export default RecoveryValidateEmail