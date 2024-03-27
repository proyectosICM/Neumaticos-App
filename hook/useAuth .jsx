import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { base } from "../api/apiurl";
import { useNavigation } from "@react-navigation/native";

export const useAuth = () => {
  const navigation = useNavigation();
  const login = async (username, password, setError) => {
    try {
      const response = await axios.post(`${base}/login`, { username, password });
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("username", response.data.Username);

      return navigation.navigate("Redirigir");
    } catch (error) {
      setError("Error en la autenticación");
      return { success: false, message: "Error en la autenticación" };
    }
  };

  return { login };
};
