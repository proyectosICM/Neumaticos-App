import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button, Icon } from "react-native-elements";
import { styles } from "../../styles/general";
import { useListarElementos } from "../../hook/CRUDHook";
import { infoURL } from "../../api/apiurl";
import { getAsyncData } from "../../hook/asyncStorageUtils";

export function InfoUser({ navigation }) {
  // State to store user info fetched from API
  const [info, setInfo] = useState();
  // State to store the current user's username
  const [user, setUser] = useState("");

  // Function to fetch user info based on username
  const ListarInfo = useListarElementos(`${infoURL}/${user}`, setInfo);
  useEffect(() => {
    ListarInfo();
  }, [ListarInfo]);

  useEffect(() => {
    const fetchData = async () => {
      const usuariov = await getAsyncData("username");
      setUser(usuariov);
    };

    fetchData();
  }, []);

  // Handler for the logout process
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  // Conditional rendering based on the availability of user info
  return info ? (
    <View style={styles.container}>
      <Image source={{ uri: info.profilePicture || "https://via.placeholder.com/150" }} style={styles.profilePic} />
      <Text style={styles.nameText}>
        {info.name} {info.lastname}
      </Text>
      <Text style={styles.emailText}>{info.email}</Text>
      <Text style={styles.emailText}>{info.role?.name}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Icon name="exit-to-app" size={30} color="#fff" />
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <ActivityIndicator size={100} color="black" style={{ marginVertical: 15 }} />
  );
}
