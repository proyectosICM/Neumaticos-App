import React from "react";
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../../styles/general";
import { useUserInfo } from "../../hook/useUserInfo";
import { useLogout } from "../../hook/useLogout";

/**
 * 
 * InfoUser displays user information and provides a logout functionality. 
 * It utilizes custom hooks to fetch and display user data, including the user's name, email, and role. 
 * An image representing the user is shown, with a default placeholder if none is provided. 
 * The component also includes a logout button that triggers a logout function, clearing user data and navigating to the login screen. 
 * The presence of an ActivityIndicator ensures feedback is given while user data is being fetched.
 */
export function InfoUser() {

  const info = useUserInfo();
  const logout = useLogout();

  return info ? (
    <View style={styles.container}>
      <Image source={{ uri: info.profilePicture || "https://via.placeholder.com/150" }} style={styles.profilePic} />
      <Text style={styles.nameText}>
        {info.name} {info.lastname}
      </Text>
      <Text style={styles.emailText}>{info.email}</Text>
      <Text style={styles.emailText}>{info.role?.name}</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Icon name="exit-to-app" size={30} color="#fff" />
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <ActivityIndicator size={100} color="black" style={{ marginVertical: 15 }} />
  );
}
