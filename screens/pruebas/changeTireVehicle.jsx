import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { styles } from "../../styles/general";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { ColorFondo } from "../../styles/paletaColores";
import { editarElemento, useListarElementos } from "../../hook/CRUDHook";
import { tireInfoTireURL, tireSearchURL, tireURL, vehicleURL } from "../../api/apiurl";
import { getAsyncData } from "../../hook/asyncStorageUtils";

export function ChangeTireVehicle() {
  const [searchValue, setSearchValue] = useState("");
  const [posicionSelected, setPosicionSelected] = useState(0);

  const [vehicleInfo, setVehicleInfo] = useState();
  const [vehicleId, setVehicleId] = useState();
  const [companyId, setCompanyId] = useState();

  const [tireActual, setTireActual] = useState();
  const [tireForChange, setTireForChange] = useState();
  const [tireForChangeData, setTireForChangeData] = useState();
  const ListarInfo = useListarElementos(`${vehicleURL}/${vehicleId}`, setVehicleInfo);

  const ListarInfoTire = useListarElementos(`${tireInfoTireURL}?vehicleId=${vehicleId}&positioning=${posicionSelected}`, setTireActual);
  const ListarInfoTireChange = useListarElementos(`${tireSearchURL}?companyModelId=1&codname=${tireForChange}`, setTireForChangeData);

  useEffect(() => {
    const fetchData = async () => {
      const vehiclev = await getAsyncData("idVehicle");
      const companyv = await getAsyncData("companyId");
      setVehicleId(vehiclev);
      setCompanyId(companyv);
    };

    fetchData();
  }, []);

  useEffect(() => {
    ListarInfo();
  }, [ListarInfo]);

  useEffect(() => {
    ListarInfoTire();
  }, [ListarInfoTire]);

  useEffect(() => {
    ListarInfoTireChange();
  }, [ListarInfoTireChange]);

  const handleSearch = (text) => {
    setPosicionSelected(text);
    setSearchValue(text);
  };

  const handleSearchSecond = (text) => {
    setTireForChange(text);
  };

  const handleChange = async() => {
    console.log("Neumatico antiguo: " + tireActual.codname);
    console.log("Neumatico nuevo: " + tireForChangeData.codname);

    const requestData = {
      codname: tireForChangeData.codname,
      status: "IN_USE",
      positioningModel: {
        id: posicionSelected,
      },
      vehicleModel: {
        id: vehicleId,
      },
      companyModel: {
        id: companyId,
      },
    };

    await editarElemento(`${tireURL}/${tireForChangeData.id}`, requestData),
    setTireActual(null);
    setTireForChangeData(null);
    setSearchValue(null);
    setTireForChange(null);
  }

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
        <Text style={styles.tittleText}>Cambio de Neumático</Text>
        <Image source={imagenSeleccionada} style={{ width: "80%", height: 200, resizeMode: "contain" }} />
        <Text style={styles.tittleText}>Selecione la posicion Neumático que cambiara</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Ingrese la posicion del neumático"
          value={searchValue}
          onChangeText={handleSearch}
        />

        <Text style={styles.info}>{tireActual ? `Neumatico a cambiar: ${tireActual.codname}` : "Sin seleccionar"}</Text>

        <Text style={styles.tittleText}>Ingrese el codname del Neumático que colocara</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Ingrese el codname del Neumático que colocara"
          value={tireForChange}
          onChangeText={handleSearchSecond}
        />
        <Text style={styles.info}>{tireForChangeData ? `Neumatico a cambiar: ${tireForChangeData.codname}` : "Sin seleccionar"}</Text>

        <TouchableOpacity style={styles.button} onPress={handleChange}>
          <Icon name="search" size={30} color="#fff" />
          <Text style={styles.buttonText}>Cambiar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
