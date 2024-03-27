import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { styles } from "../../styles/general";
import { Icon } from "react-native-elements";

export function ChangeTireVehicle() {
  const [placa, setPlaca] = useState("");
  const [tipoNeumatico, setTipoNeumatico] = useState("");
  const [razon, setRazon] = useState("");

  const handleSubmit = () => {
    // Aquí iría la lógica para procesar los datos del formulario
    console.log(placa, tipoNeumatico, razon);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Cambio de Neumático</Text>

      <TextInput style={styles.input} placeholder="Placa del Vehículo" placeholderTextColor="white" value={placa} onChangeText={setPlaca} />

      <TextInput
        style={styles.input}
        placeholder="Tipo de Neumático"
        placeholderTextColor="white"
        value={tipoNeumatico}
        onChangeText={setTipoNeumatico}
      />

      <TextInput style={styles.input} placeholder="Razón del Cambio" placeholderTextColor="white" value={razon} onChangeText={setRazon} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Icon name="save" size={30} color="#fff" />
        <Text style={styles.buttonText}>Registrar Cambio</Text>
      </TouchableOpacity>
    </View>
  );
}
