import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { base } from "../../api/apiurl";
import { loginStyles } from "./loginStyles";
// import { base, baseURL } from "../../API/apiurl";

const backgroundImage = require("../login/login1.jpg");

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);

  const ListarUser = async () => {
    const rolValue = await AsyncStorage.getItem("rol");
    setUser(rolValue);
  };

  useEffect(() => {
    ListarUser();
  }, [ListarUser]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${base}/login`, {
        username,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("username", response.data.Username);
      navigation.navigate("Redirigir");
    } catch (error) {
      setError("Error en la autenticación");
      console.log(error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={loginStyles.backgroundImage}>
      <View style={loginStyles.container}>
        <Text style={loginStyles.title}>Inicio de Sesión</Text>
        <TextInput style={loginStyles.input} placeholder="Nombre de usuario" onChangeText={(text) => setUsername(text)} value={username} />
        <TextInput style={loginStyles.input} placeholder="Contraseña" onChangeText={(text) => setPassword(text)} value={password} secureTextEntry />
        <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
          <Text style={loginStyles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        {error && <Text style={loginStyles.errorText}>{error}</Text>}
      </View>
    </ImageBackground>
  );
}
