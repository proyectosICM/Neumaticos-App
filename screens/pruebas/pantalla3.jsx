import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function Pantalla3() {
  return (
    <View style={styles.container}>
      <Text>Montacargas que han aceptado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
