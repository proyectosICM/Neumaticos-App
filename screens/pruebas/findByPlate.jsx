import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, BackHandler, ToastAndroid } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../../styles/general";
import { vehicleFindPlateURL, vehicleURL } from "../../api/apiurl";
import { useListarElementos } from "../../hook/CRUDHook";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function FindByPlate({ navigation }) {
  const [plate, setPlate] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const [vehicleInfo2, setVehicleInfo2] = useState();
  const [change, setChange] = useState();

  const ListarInfo = useListarElementos(`${vehicleFindPlateURL}?placa=${change}`,  setVehicleInfo);

  useEffect(() => {
      ListarInfo();
  }, [ListarInfo]);

  useEffect(() => {
    const updateAsyncStorage = async () => {
      if (vehicleInfo) {
        await AsyncStorage.setItem("idVehicle", vehicleInfo.id.toString());
        navigation.navigate("Second");
      }
    };
  
    updateAsyncStorage();
  }, [vehicleInfo]);

  const handleSearch = () => {
    // console.log("Buscar información del vehículo para la placa:", plate);
    setChange(plate);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Inicio");
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Ingrese la placa del vehículo:</Text>
      <TextInput style={styles.input} value={plate} onChangeText={setPlate} placeholder="Placa" placeholderTextColor="white" />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Icon name="search" size={30} color="#fff" />
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {vehicleInfo && (
        <View>
          <Text style={styles.text}>Placa: {vehicleInfo.placa ? vehicleInfo.placa : "--"}</Text>
          <Text style={styles.text}>Placa: {vehicleInfo.vehicleType && vehicleInfo.vehicleType.name ? vehicleInfo.vehicleType.name : "--"}</Text>
        </View>
      )}
    </View>
  );
}
