import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Keyboard, Animated } from "react-native";
import FlashMessage from "react-native-flash-message";
import { baseUrl } from "./utils/constantes";


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
      registeredEmail: true
    };
  }

  checkEmail = (text) => {
    this.setState({ email: text, disabled: false });
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(text)) {
      this.refs.myLocalFlashMessage.showMessage({
        message: "Correo electrónico inválido",
        type: "danger",
      });
      return;
    }

    const url = `${baseUrl}/usuarios?fields=email`;
    // console.log(url);

    fetch(url)
      .then(resp => resp.json())
      .catch(error => console.log(error))
      .then(users => {
        // console.log(users);
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

        this.refs.myLocalFlashMessage.showMessage({
          message,
          type
        })
      })
      .catch(error => {
        console.log(error);
      })

  }

  handleRegister = () => {
    this.setState({ disabled: true });
    Keyboard.dismiss();

    if (!this.state.username || !this.state.email || !this.state.password || !this.state.confirmPassword) {
      this.refs.myLocalFlashMessage.showMessage({
        message: "Faltan campos por llenar",
        type: "danger",
      });

      this.setState({ disabled: false });
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(this.state.email)) {
      this.refs.myLocalFlashMessage.showMessage({
        message: "Correo electrónico inválido",
        type: "danger",
      });

      this.setState({ disabled: false });
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.refs.myLocalFlashMessage.showMessage({
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
    // console.log(newUser);

    const url = `${baseUrl}/usuarios`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
      // body: newUser,
    })
      .then((response) => response.json())
      .then((resp) => {
        if (resp.errorType ?? false) {
          this.refs.myLocalFlashMessage.showMessage({
            message: `Algo salió mal\n${resp.message}`,
            type: "danger",
            duration: 3000
          });
        this.setState({ disabled: false });

          return
        }
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
        this.setState({ disabled: false });
        this.refs.myLocalFlashMessage.showMessage({
          message: `No fue posible registrar al usuario ${error}`,
          type: 'danger'
        })
      });

    // fetch(`http://3.133.59.124:4000/checkEmail/${this.state.email}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.emailExists) {
    //       this.refs.myLocalFlashMessage.showMessage({
    //         message: "El correo electrónico ya está en uso.",
    //         type: "danger",
    //       });

    //       this.setState({ disabled: false });
    //     } else {

    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error al verificar el correo electrónico:", error);
    //     this.setState({ disabled: false });
    //   });
  };

  render() {
    return (
      <View style={{ width: "100%", height: "100%", paddingHorizontal: 18 }}>
        <TextInput
          style={globalStyle.input}
          placeholder="Nombre usuario"
          autoCapitalize="words"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => { this.emailInput.focus() }}
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <TextInput
          ref={(input) => { this.emailInput = input }}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => { this.passwordInput.focus() }}
          style={globalStyle.input}
          placeholder="Correo"
          keyboardType="email-address"
          // autoCompleteType="email"
          autoComplete="off"
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={this.checkEmail}
        // onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          ref={(input) => { this.passwordInput = input }}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => { this.passwordValidationInput.focus() }}
          style={globalStyle.input}
          placeholder="Contraseña (letras y números)"
          autoCapitalize="none"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TextInput
          ref={(input) => { this.passwordValidationInput = input }}
          returnKeyType="done"
          blurOnSubmit={false}
          onSubmitEditing={() => { this.handleRegister(); }}
          style={globalStyle.input}
          placeholder="Confirmar contraseña"
          autoCapitalize="none"
          secureTextEntry={true}
          value={this.state.confirmPassword}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
        />

        {/* <Button
          style={{ ...styles.activeButton, color: '#fff', }}
          onPress={this.handleRegister}
          disabled={this.state.disabled}
          ref={button => { this.registrarButton = button; }}
        >
          Registrar
        </Button> */}

        <View style={{ paddingTop: 15, marginBottom: 5 }}>
          <Pressable onPress={this.handleRegister} disabled={this.state.disabled} >
            <Text style={styles.activeButton}>Registrar</Text>
          </Pressable>
        </View>

        {/* Componente FlashMessage para mostrar notificaciones */}
        <FlashMessage ref="myLocalFlashMessage" position="bottom" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activeButton: {
    marginTop: 16,
    height: 50,
    width: "98%",
    borderRadius: 25,
    textAlign: "center",
    color: "white",
    backgroundColor: "#0390fc",
    textAlignVertical: "center",
    alignSelf: "center",
  },
});

export default Signin;
