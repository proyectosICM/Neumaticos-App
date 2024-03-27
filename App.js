import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomBottomTabBar } from './screens/pruebas/customBottomTabBar';
import { Pantalla3 } from './screens/pruebas/pantalla3';
import { Pantalla4 } from './screens/pruebas/pantalla4';
import Login from './screens/login/login';
import { VehicleInfo } from './screens/pruebas/vehicleInfo';
import { SecondCustomBottomTabBar } from './screens/pruebas/secondCustomBottomTabBar';
import { Redirect } from './screens/login/redirect';
import { FindByPlate } from './screens/pruebas/findByPlate';
import { IrregularitiesTireDetails } from './screens/pruebas/irregularitiesTireDetails';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />

        <Stack.Screen
          name="Inicio"
          component={CustomBottomTabBar}
          options={{ headerShown: false }}
        />

        <Stack.Screen name='Redirigir' component={Redirect} />

        <Stack.Screen
          name="Second"
          component={SecondCustomBottomTabBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='p3' component={Pantalla3} />
        <Stack.Screen name='p4' component={Pantalla4} />
        <Stack.Screen name='Buscar por placa' component={FindByPlate} />
        <Stack.Screen name='Detalle' component={IrregularitiesTireDetails} />

        {   /*     <Stack.Screen name='InformacionV' component={VehicleInfo} options={{ headerShown: false }} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}


