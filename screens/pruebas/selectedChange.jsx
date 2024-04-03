import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "../../styles/general";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export function SelectedChange() {
  const navigation  = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Seleccione lo que cambiara</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cambiar Neumatico")}>
        <Icon name="search" size={30} color="#fff" />
        <Text style={styles.buttonText}>Cambiar Neumatico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cambiar Sensor")}>
        <Icon name="search" size={30} color="#fff" />
        <Text style={styles.buttonText}>Cambiar Sensor</Text>
      </TouchableOpacity>
    </View>
  );
}
