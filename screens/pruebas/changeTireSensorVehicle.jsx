import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { styles } from "../../styles/general";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { ColorFondo } from "../../styles/paletaColores";
import { editarElemento, useListarElementos } from "../../hook/CRUDHook";
import {
  tireInfoTireURL,
  tireSearchURL,
  tireSensorSearchURL,
  tireSensorURL,
  tireSensorxVehicleAndPosURL,
  tireURL,
  vehicleURL,
} from "../../api/apiurl";
import { getAsyncData } from "../../hook/asyncStorageUtils";

export function ChangeTireSensorVehicle() {
  const [searchValue, setSearchValue] = useState("");
  const [posicionSelected, setPosicionSelected] = useState(0);

  const [vehicleInfo, setVehicleInfo] = useState();
  const [vehicleId, setVehicleId] = useState();
  const [companyId, setCompanyId] = useState();

  const [sensorActual, setSensorActual] = useState();
  const [sensorForChange, setSensorForChange] = useState();
  const [sensorForChangeData, setSensorForChangeData] = useState();
  const ListarInfo = useListarElementos(`${vehicleURL}/${vehicleId}`, setVehicleInfo);

  const ListarInfoSensor = useListarElementos(
    `${tireSensorxVehicleAndPosURL}?vehicleId=${vehicleId}&positioning=${posicionSelected}`,
    setSensorActual
  );
  const ListarInfoSensorChange = useListarElementos(
    `${tireSensorSearchURL}?companyModelId=${companyId}&id=${sensorForChange}`,
    setSensorForChangeData
  );

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
    ListarInfoSensor();
  }, [ListarInfoSensor]);

  useEffect(() => {
    ListarInfoSensorChange();
  }, [ListarInfoSensorChange]);

  const handleSearch = (text) => {
    setPosicionSelected(text);
    setSearchValue(text);
    console.log("Hola" + sensorActual);
  };

  const handleSearchSecond = (text) => {
    setSensorForChange(text);
  };

  const handleChange = async () => {
    const requestData = {
      identificationCode: sensorForChangeData.identificationCode,
      status: true,
      vehicleModel: {
        id: vehicleId,
      },
      positioning: {
        id: posicionSelected,
      },
      companyModel: {
        id: companyId,
      },
    };
    console.log(requestData);
    console.log(sensorForChangeData.id);
    await editarElemento(`${tireSensorURL}/${sensorForChangeData.id}`, requestData), setSensorActual(null);
    setSensorForChangeData(null);
    setSearchValue(null);
    setSensorForChange(null);
  };

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
        <Text style={styles.tittleText}>Cambio de Sensor</Text>
        <Image source={imagenSeleccionada} style={{ width: "80%", height: 200, resizeMode: "contain" }} />
        <Text style={styles.tittleText}>Selecione la posicion Sensor que cambiara</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Ingrese la posicion del sensor"
          value={searchValue}
          onChangeText={handleSearch}
        />

        <Text style={styles.info}>{sensorActual ? `Sensor a cambiar con id: ${sensorActual.id}` : "Sin seleccionar"}</Text>

        <Text style={styles.tittleText}>Ingrese el id del sensor que colocara</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Ingrese el id del sensor que colocara"
          value={sensorForChange}
          onChangeText={handleSearchSecond}
        />
        <Text style={styles.info}>{sensorForChangeData ? `Sensor a cambiar: ${sensorForChangeData.id}  disponible` : "Sin seleccionar"}</Text>

        <TouchableOpacity style={styles.button} onPress={handleChange}>
          <Icon name="search" size={30} color="#fff" />
          <Text style={styles.buttonText}>Cambiar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
