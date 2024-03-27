import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../../styles/general";

/**
 * VehicleScanOptions provides two main functionalities for the user: scanning a vehicle's QR code or entering the
 * vehicle's license plate manually.
 * This component displays buttons that trigger navigation to the respective screens for each functionality.
 * Upon interaction, the user is directed to the corresponding screen based on their choice of action.
 *
 */
export function VehicleScanOptions({ navigation }) {
  const options = [
    { label: "Escanear QR", icon: "qr-code-scanner", screen: "Second" },
    { label: "Ingresar Placa", icon: "keyboard", screen: "Buscar por placa" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Escanee el Código QR o Ingrese la placa de su camión</Text>

      {/* Button that navigates based on the option selected. */}
      {options.map((option, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => navigation.navigate(option.screen)}>
          <Icon name={option.icon} size={30} color="#fff" />
          <Text style={styles.buttonText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
