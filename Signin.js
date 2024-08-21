import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import FlashMessage from "react-native-flash-message";
import { baseUrl, prodUrl } from "./utils/constantes";
import { createValidationCode } from "./services/email-validation.service";

globalStyle = require("./Styles");

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      registeredEmail: true,
      isButtonPressed: false,
    };
  }

  checkEmail = (text) => {
    this.setState({ email: text, disabled: false });
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(text)) {
      this.myLocalFlashMessage.showMessage({
        message: "Correo electrónico inválido",
        type: "danger",
      });
      return;
    }

    const url = `${prodUrl}/usuario?fields=email`;

    fetch(url)
      .then(resp => resp.json())
      .catch(error => console.log(error))
      .then(users => {
        let type = "success";
        let message = "Correo disponible";
        users.forEach(user => {
          if (user.email == text) {
            type = "danger";
            message = "El correo ya fue registrado";
            this.setState({ disabled: true })
            return;
          }
        });

        this.myLocalFlashMessage.showMessage({
          message,
          type
        })
      })
      .catch(error => {
        console.log(error);
      })

  }

  handleRegister = () => {
    this.setState({ disabled: true, isButtonPressed: false });
    Keyboard.dismiss();

    if (!this.state.username || !this.state.email || !this.state.password || !this.state.confirmPassword) {
      this.myLocalFlashMessage.showMessage({
        message: "Faltan campos por llenar",
        type: "danger",
      });

      this.setState({ disabled: false });
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(this.state.email)) {

      this.myLocalFlashMessage.showMessage({
        message: "Correo electrónico inválido",
        type: "danger",
      });

      this.setState({ disabled: false });
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.myLocalFlashMessage.showMessage({
        message: "Las contraseñas no coinciden",
        type: "danger",
      });

      this.setState({ disabled: false });
      return;
    }

    const newUser = {
      nombre: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    createValidationCode(newUser.email)
      .then(async (resp) => {
        if (resp.status != 200) {
          this.myLocalFlashMessage.showMessage({
            message: (await resp.json()).message,
            type: 'danger',
            icon: 'danger',
            duration: 3000
          });
          return;
        }

        this.props.navigation.navigate("ValidateEmail", { newUser });
      })
      .catch((error => {
        console.log(error);
        this.myLocalFlashMessage.showMessage({
          message: error.message,
          type: 'danger',
          icon: 'danger',
          duration: 3000
        });
      }));
  };

  render() {
    const buttonStyle = this.state.isButtonPressed
      ? [styles.activeButton, styles.buttonPressed]
      : styles.activeButton;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ width: "100%", height: "100%", paddingHorizontal: 40, paddingTop: 30, backgroundColor: '#fff' }}>
              <View style={[globalStyle.centerContent]}>
                <View style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                  <Image
                    source={require('./assets/logo_OP2_2.png')}
                    style={{ flex: 8, width: 200, height: 150, resizeMode: 'contain' }}
                  />
                </View>
                <Text style={{ textAlign: 'left', fontSize: 15, paddingEnd: 150 }}>Nombre completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Juan Pérez"
                  autoCapitalize="words"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => { this.emailInput.focus() }}
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })}
                  marginBottom={20} // Incrementa este valor para aumentar la separación
                />
                <Text style={{ textAlign: 'left', fontSize: 15, paddingEnd: 150 }}>Correo electrónico</Text>
                <TextInput
                  ref={(input) => { this.emailInput = input }}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => { this.passwordInput.focus() }}
                  style={styles.input}
                  placeholder="usuario@mail.com"
                  keyboardType="email-address"
                  autoCompleteType="email"
                  autoComplete="off"
                  autoCapitalize="none"
                  value={this.state.email}
                  onChangeText={this.checkEmail}
                  onBlur={() => this.checkEmail(this.state.email)}
                  marginBottom={20} // Incrementa este valor para aumentar la separación
                />
                <Text style={{ textAlign: 'left', fontSize: 15, paddingEnd: 200 }}>Contraseña</Text>
                <TextInput
                  ref={(input) => { this.passwordInput = input }}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => { this.passwordValidationInput.focus() }}
                  style={styles.input}
                  placeholder="contraseña"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                  marginBottom={10} // Incrementa este valor para aumentar la separación
                />
                <TextInput
                  ref={(input) => { this.passwordValidationInput = input }}
                  returnKeyType="done"
                  blurOnSubmit={false}
                  onSubmitEditing={this.handleRegister}
                  style={styles.input}
                  placeholder="confirmar contraseña"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={this.state.confirmPassword}
                  onChangeText={(text) => this.setState({ confirmPassword: text })}
                  marginBottom={20} // Incrementa este valor para aumentar la separación
                />
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={buttonStyle}
                  onPressIn={() => this.setState({ isButtonPressed: true })}
                  onPressOut={() => this.setState({ isButtonPressed: false })}
                  onPress={this.handleRegister}
                  disabled={this.state.disabled}
                >
                  <Text style={styles.buttonText}>Registrar</Text>
                </Pressable>
              </View>
              <FlashMessage ref={(ref) => this.myLocalFlashMessage = ref} position="bottom" />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textTransform: "none",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
     // Ensure text remains in lowercase
  },
  buttonContainer: {
    marginTop: 20,
    height: 50,
    width: 150,
    alignSelf: "center",
    marginVertical: 150,
  },
  activeButton: {
    height: 50,
    width: 150,
    borderRadius: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d6fb8",
    height: 40,
  },
  buttonPressed: {
    backgroundColor: "#1db8b4", // Change to desired color when pressed
  },
});

export default Signin;
