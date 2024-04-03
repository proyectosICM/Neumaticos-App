import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { VehicleScanOptions } from "./vehicleScanOptions";
import { InfoUser } from "./infoUser";
import { VehicleInfo } from "./vehicleInfo";
import { IrregularitiesTireList } from "./irregularitiesTireList";
import { ChangeTireVehicle } from "./changeTireVehicle";
import { BackHandler, ToastAndroid } from "react-native";
import { SelectedChange } from "./selectedChange";

const Tab = createBottomTabNavigator();

export function SecondCustomBottomTabBar({ navigation }) { 

    const [backPressedOnce, setBackPressedOnce] = useState(false);

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

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#A69677",
        tabBarInactiveTintColor: "#9CA4A6",
      }}
    >
      <Tab.Screen
        name="InformacionV"
        component={VehicleInfo}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Cambiar neumatico"
        component={SelectedChange}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="build" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Irregularidades"
        component={IrregularitiesTireList}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="warning" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
