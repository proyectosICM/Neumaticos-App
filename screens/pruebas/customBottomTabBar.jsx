import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pantalla1, VehicleScanOptions } from "./vehicleScanOptions";
import { InfoUser } from "./infoUser";
import { BackHandler, ToastAndroid } from "react-native";

const Tab = createBottomTabNavigator();

export function CustomBottomTabBar() {
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  /*
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { 
      if (!backPressedOnce) {
        setBackPressedOnce(true);
        ToastAndroid.show('Presiona de nuevo para ir a Inicio', ToastAndroid.SHORT);

        // Resetea backPressedOnce después de 2 segundos
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);

        return true;
      } else {
        navigation.navigate('Inicio'); // Navega a la pantalla 'Inicio'
        return true;
      }
    });

    return () => backHandler.remove();
  }, [backPressedOnce, navigation]);
*/

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      // Al retornar true aquí, se indica que el evento de retroceso se ha manejado
      // y no debe tener ningún efecto.
      return true;
    });

    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#A69677",
        tabBarInactiveTintColor: "#9CA4A6",
      }}
    >
      <Tab.Screen
        name="Seleccion del vehiculo"
        component={VehicleScanOptions}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} />,
        }} 
      />
      <Tab.Screen
        name="Informacion del usuario"
        component={InfoUser}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
