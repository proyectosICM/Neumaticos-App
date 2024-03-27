import React, { useEffect, useState, useCallback } from "react";
import { Text } from "react-native";
import { View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { infoURL } from "../../api/apiurl";
import { useListarElementos } from "../../hook/CRUDHook";
import { styles } from "../../styles/general";

export function Redirect({ navigation }) {
  const [info, setInfo] = useState();
  const [user, setUser] = useState(null);
  const [showText, setShowText] = useState(false);

  const fetchData = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    const username = await AsyncStorage.getItem("username");
    setUser(username);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ListarInfo = useListarElementos(`${infoURL}/${user}`, setInfo);

  useEffect(() => {
    ListarInfo();
  }, [ListarInfo]);

  useEffect(() => {
    const obtenerDatosUser = async () => {
      if (info) {
        await AsyncStorage.setItem("username", info.username);
        navigation.navigate("Inicio");
      }
    };
    obtenerDatosUser();
  }, [info, navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUser("");
      console.log("Sesión cerrada. Todos los datos eliminados de AsyncStorage.");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error al cerrar la sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} color="black" style={{ marginVertical: 15 }} />
      {showText && (
        <>
          <Text style={styles.tittleText}>Algo a fallado en su inico de sesion</Text>
          <Text style={styles.tittleText}>Por favor cierra sesion </Text>
          <Text style={styles.tittleText}>y comunicate con tu administrador</Text>
          <Button title="Cerrar Sesión" buttonStyle={styles.styleButton} titleStyle={styles.tittleText} onPress={() => handleLogout()} />
        </>
      )}
    </View>
  );
}
