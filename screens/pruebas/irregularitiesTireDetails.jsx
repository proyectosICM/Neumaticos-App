import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, FlatList, BackHandler } from "react-native";
import { styles } from "../../styles/general";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IrregularitiesTiredBaseURL } from "../../api/apiurl";
import { useListarElementos } from "../../hook/CRUDHook";

// Asumimos que estos detalles se pasan como props al componente
export function IrregularitiesTireDetails({ navigation, descripcion, fecha, severidad, recomendaciones, imagenes }) {
  const [irregularityId, SetIrregularityId] = useState();
  const [irregularityData, setIrregularityData] = useState();

  const fetchData = useCallback(async () => {
    const irregularity = await AsyncStorage.getItem("irregularityId");
    SetIrregularityId(irregularity);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ListarIrregularidades = useListarElementos(`${IrregularitiesTiredBaseURL}/${irregularityId}`, setIrregularityData);

  console.log(irregularityData);

  useEffect(() => {
    ListarIrregularidades();
  }, [ListarIrregularidades]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Irregularidades");
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView style={styles.scrollContainer}>
      {irregularityData && (
        <View style={styles.container}>
          <Text style={styles.tittleText}>Detalle de Irregularidad</Text>
          <Text style={styles.info}>{irregularityData.nameIrregularity}</Text>
          <Text style={styles.tittleText}>Descripción: </Text>
          <Text style={styles.info}>{irregularityData.detailsIrregularity}</Text>
          <Text style={styles.info}>Fecha de detección: {new Date(irregularityData.createdAt * 1000).toLocaleDateString("es-ES")}</Text>
          <Text style={styles.info}>Severidad: {severidad}</Text>
          <Text style={styles.info}>Recomendaciones: {recomendaciones}</Text>
          <Text style={styles.info}>Placa del vehiculo: {irregularityData.vehicleModel.placa}</Text>
          <Text style={styles.info}>{irregularityData.vehicleModel.placa}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
});
