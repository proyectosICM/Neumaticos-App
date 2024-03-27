import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { styles } from "../../styles/general";
import { tireSensorxVehcileURL, vehicleURL } from "../../api/apiurl";
import { useListarElementos } from "../../hook/CRUDHook";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function VehicleInfo() {
  const [vehicleInfo, setVehicleInfo] = useState();
  const [vehicleId, setVehicleId] = useState();
  const [sensorsData, setSensorsData] = useState();

  const ListarInfo = useListarElementos(`${vehicleURL}/${vehicleId}`, setVehicleInfo);

  const ListSensores = useListarElementos(`${tireSensorxVehcileURL}?vehicleId=${vehicleId}`, setSensorsData);

  const imagen1 = require("../../images/mon4.jpg");
  const imagen2 = require("../../images/mon6.jpg");

  useEffect(() => {
    ListarInfo();
  }, [ListarInfo]);

  useEffect(() => {
    ListSensores();
  }, [ListSensores]);

  const fetchData = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    const idVehicle = await AsyncStorage.getItem("idVehicle");
    setVehicleId(idVehicle);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const seleccionarImagen = (vehicleType) => {
    switch (vehicleType) {
      case 1:
        return require("../../images/mon4.jpg");
      case 2:
        return require("../../images/mon6.jpg");
      default:
        return require("../../images/default.jpg"); 
    }
  };

  const imagenSeleccionada = vehicleInfo ? seleccionarImagen(vehicleInfo.vehicleType.id) : require("../../images/default.jpg");

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.tittleText}>Información del Vehículo</Text>
        <Text style={styles.info}>Placa: {vehicleInfo && vehicleInfo.placa ? vehicleInfo.placa : ""}</Text>
        <Text style={styles.info}>Tipo: {vehicleInfo && vehicleInfo.vehicleType ? vehicleInfo.vehicleType.name : ""}</Text>
        <Text style={styles.info}>Empresa: {vehicleInfo && vehicleInfo.companyModel ? vehicleInfo.companyModel.name : ""}</Text>
        <Image source={imagenSeleccionada} style={{ width: "80%", height: 200, resizeMode: "contain" }} />
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Posicion</Text>
          <Text style={styles.tableCellHeader}>Neumatico</Text>
          <Text style={styles.tableCellHeader}>PSI</Text>
          <Text style={styles.tableCellHeader}>°C</Text>
          <Text style={styles.tableCellHeader}>Bateria %</Text>
        </View>
        {sensorsData &&
          sensorsData.map((data,index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{data.positioning.id}</Text>
              <Text style={styles.tableCell}>{data.identificationCode}</Text>
              <Text style={styles.tableCell}>{data.pressure ? data.pressure : "---"} PSI</Text>
              <Text style={styles.tableCell}>{data.temperature ? data.temperature : "---"} °C</Text>
              <Text style={styles.tableCell}>{data.batteryLevel ? data.batteryLevel : "---"} %</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
