import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { styles } from "../../styles/general";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IrregularitiesTiredCompanyAndVehicleURL } from "../../api/apiurl";
import { useListarElementos } from "../../hook/CRUDHook";

// Supongamos que recibimos las irregularidades como un array de objetos
export function IrregularitiesTireList({ navigation }) {
  const [vehicleId, setVehicleId] = useState();
  const [irregularities, setIrregularities] = useState([]);

  const fetchData = useCallback(async () => {
    const idVehicle = await AsyncStorage.getItem("idVehicle");
    setVehicleId(idVehicle);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ListarIrregularidades = useListarElementos(
    `${IrregularitiesTiredCompanyAndVehicleURL}?companyId=1&vehicleId=${vehicleId}`,
    setIrregularities
  );

  useEffect(() => {
    ListarIrregularidades();
  }, [ListarIrregularidades]);


  const handleDetails = async(data) => {
    await AsyncStorage.setItem("irregularityId", data.id.toString());
    navigation.navigate("Detalle")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittleText}>Irregularidades de Neumáticos</Text>
      <FlatList
        data={irregularities}
        style={{ width: "90%" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles2.irregularityItem}>
            <Text style={styles.infoBlack}>Descripción: {item.nameIrregularity}</Text>
            <Text style={styles.infoBlack}>Fecha: {new Date(item.createdAt * 1000).toLocaleDateString("es-ES")}</Text>
            <Button title="Ver Detalles" onPress={() => handleDetails(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  irregularityItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});
