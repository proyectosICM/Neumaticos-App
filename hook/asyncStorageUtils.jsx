import AsyncStorage from "@react-native-async-storage/async-storage";


export const getAsyncData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value; 
  } catch (error) {
    console.error('Error al obtener datos de AsyncStorage:', error);
    return null;
  }
};