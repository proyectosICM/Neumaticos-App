import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

export const useLogout = () => {
  const navigation = useNavigation();

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  return logout;
};
