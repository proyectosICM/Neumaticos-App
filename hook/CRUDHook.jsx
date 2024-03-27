import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useEffect } from "react";

export function useListarElementos(url, setDatos) { 
  const navigation = useNavigation();
  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token"); 
      const results = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatos(results.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        /*
          if(!logout){
            alert("Su sesion a caducado, la sesion se cerro");
          }
          */
        await AsyncStorage.clear();
        navigation.navigate("Login");
      } else {
        // Otro error, manejarlo adecuadamente
        //console.error(`Error al obtener los datos del camión: ${url}`, error);
        // Token expirado, redirigir al inicio de sesión
      }
    }
  }, [navigation, setDatos, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return fetchData;
}

export function useListarElementosParams(url, param1 ,setDatos) { 
  console.log(`${url}${param1}`);
  const navigation = useNavigation();
  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token"); 
      const results = await axios.get(`${url}${param1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatos(results.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        /*
          if(!logout){
            alert("Su sesion a caducado, la sesion se cerro");
          }
          */
        await AsyncStorage.clear();
        navigation.navigate("Login");
      } else {
        // Otro error, manejarlo adecuadamente
        //console.error(`Error al obtener los datos del camión: ${url}`, error);
        // Token expirado, redirigir al inicio de sesión
      }
    }
  }, [navigation, setDatos, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return fetchData;
}
