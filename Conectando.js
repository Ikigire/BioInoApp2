import * as React from "react";
import { Pressable, Text, View, TextInput, ScrollView, StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

globalStyle = require("./Styles");


const conditionalStyles = StyleSheet.create({
    activeButton: (disabled) => {
        const bgColor = disabled ? '#0390fc' : 'gray';
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

function Conectando({ navigation, route }) {
    const [disabled, setDisabled] = React.useState(false);
    const [idDispositivo, setIdDispositivo] = React.useState('');
    const [modelo, setModelo] = React.useState('');

    const [establecimiento, setEstablecimiento] = React.useState('');
    const [grupo, setGrupo] = React.useState('');

    const handleClick = () => {
        // console.log(idDispositivo, modelo);
        if (!disabled) {
            this.flashMessage.showMessage({
                message: "Complete la información para continuar",
                type: 'danger',
                icon: 'danger'
            })
            return;
        }

        navigation.navigate('Nombre', {
            dispositivo: {
                idDispositivo: idDispositivo.toUpperCase(),
                modelo: modelo.toUpperCase()
            },
            establecimiento,
            grupo
        });
    }

    React.useEffect(() => {
        setDisabled((idDispositivo.trim().length && modelo.trim().length));
    }, [idDispositivo, modelo])

    React.useEffect(() => {
        const params = route.params;
        setEstablecimiento(params.establecimiento);
        setGrupo(params.grupo);
        // console.log(establecimiento, grupo);
    }, [])

    return (
        <View style={{ fontSize: 20, flex: 1, paddingHorizontal: 30, marginHorizontal: 30, textAlign: 'left', justifyContent: 'center', alignItems: "center" }}>
            <Pressable style={(pressed) => [{ backgroundColor: pressed ? '#1D6FB8' : '#1D9FB8' }, { display: 'flex', justifyContent: 'center', borderColor: '#1D9FB8', borderWidth: 2, padding: 6 }]}
                onPress={() => { this.flashMessage.showMessage({ message: 'Esta opción está en desarrollo', type: 'default', duration: 4000, icon: 'info' }) }}
            >
                <View style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <MaterialCommunityIcons name="qrcode" color={'white'} size={50} style={{ textAlign: 'center', width: '100%' }} />
                    <Text style={{ color: 'white' }} >Leer QR</Text>
                </View>
            </Pressable>

            <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginVertical: 8 }}>
                <View style={{ backgroundColor: 'black', height: 4, borderWidth: 1, borderColor: 'black', width: '45%', marginTop: '2.5%' }}></View>
                <Text>O</Text>
                <View style={{ backgroundColor: 'black', height: 4, borderWidth: 1, borderColor: 'black', width: '45%', marginTop: '2.5%' }}></View>
            </View>

            <View style={[{ width: '100%' }]}>
                <ScrollView>
                    <Text style={{ textAlign: 'center' }}>Ingrese los siguientes datos</Text>
                    {/* <TextInput
                        style={globalStyle.input}
                        placeholder="Dirección MAC"
                        onChangeText={(text) => {setMac(text.toUpperCase());}}
                        returnKeyType="next"
                        value={mac}
                        blurOnSubmit={false}
                        onSubmitEditing={() => this.modeloInput.focus()}
                    /> */}
                    <></>
                    <TextInput
                        ref={(input) => this.macInput = input}
                        style={globalStyle.input}
                        placeholder="Dirección MAC"
                        onChangeText={async (text) => {await setIdDispositivo(text);}}
                        returnKeyType="next"
                        value={idDispositivo.toUpperCase()}
                        blurOnSubmit={false}
                        textContentType="name"
                        onSubmitEditing={(event) => {
                            // console.log(Object.keys(event.nativeEvent))
                            // console.log((event.nativeEvent.text))
                            // setIdDispositivo(event.nativeEvent.text.toUpperCase());
                            this.modeloInput.focus()
                        }}
                    />
                    <TextInput
                        ref={(input) => this.modeloInput = input}
                        style={globalStyle.input}
                        placeholder="Modelo"
                        value={modelo.toUpperCase()}
                        onChangeText={async (text) => { await setModelo(text); }}
                        blurOnSubmit={false}
                        returnKeyType="done"
                        onSubmitEditing={handleClick}
                    />
                    <View style={{ marginTop: 15, display: 'flex', justifyContent: 'center' }}>
                        <Pressable onPress={handleClick} style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                            <Text style={[conditionalStyles.activeButton(disabled), { width: '100%' }]}>Siguiente</Text>
                        </Pressable>
                    </View>
                </ScrollView>

            </View>
            <FlashMessage ref={(flashMessage) => this.flashMessage = flashMessage} position={'top'} animated />
        </View>
    );
}

export default Conectando;