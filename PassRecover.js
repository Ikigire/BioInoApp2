import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";

globalStyle = require("./Styles")


class PassRecover extends Component {
    constructor() {
        super();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
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


    render() {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <View style={[globalStyle.centerContent]}>
                    <Text style={[globalStyle.title]}>Recuperar contraseña</Text>

                    <TextInput
                        style={globalStyle.input}
                        placeholder='Nueva contraseña (letras y números)'
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={globalStyle.input}
                        placeholder='Confirmar nueva contraseña'
                        autoCapitalize="none"
                    />

                </View>
                <View style={{ marginBottom: 5 }}>
                    <Pressable onPress={() => { this.props.navigation.navigate("Login"); }} disabled={false}>
                        <Text style={this.conditionalStyles.activeButton(false)} >Aceptar</Text>
                    </Pressable>
                </View>


                <View style={{minHeight: 50, width: '100%', backgroundColor: '#0390fc'}}>
                </View>
            </View>
        );
    }
}

export default PassRecover;