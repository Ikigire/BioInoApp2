import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, Image, View, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MyTabs from './MyTabs';
import AddDevice from './AddDevice';
import ElectricInst from './ElectricInst';
import Conexion from './Conexion';
import Conectando from './Conectando';
import Alias from './Alias';
import Niveles from './Niveles';
import Ubicacion from './Ubicacion';
import HistoryData from './HistoryData';
import Notificar from './Notificar';
import Terminos from './Terminos';
import Politica from './Politica';
import Login from './Login';
import Signin from './Signin';
import PassRecover from './PassRecover';
import ModificarUsuario from './ModificarUsuario';
import MacDir from './MacDir';
import { createContext, useContext, useState } from 'react';
//import MacDir from './MacDir';

const appContext = createContext(null);

export const useAppContext = () => {
  return useContext(appContext);
}

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
      <Image
        style={{ height: 40, width: 40 }}
        source={require('./assets/Propuesta.jpg')}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
        {''}
      </Text>
    </View>
  );
}

function Logo() {
  return (
    <Image
      style={{ height: 45, width: 45 }}
      source={require('./assets/Propuesta.jpg')}
    />
  );
}

export default function App() {
  const [updateEstList, setUpdateEstList] = useState(false);
  return (
    <appContext.Provider value={{
      updateEstList, setUpdateEstList
    }}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerTitle: (props) => <Logo {...props} />, headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Signin'
            component={Signin}
            options={{ headerTitle: (props) => <Logo {...props} />, headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='PassRecovery'
            component={PassRecover}
            options={{ headerTitle: (props) => <Logo {...props} />, headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Root'
            listeners={(obj) => { console.log(obj) }}
            component={MyTabs}
            options={({ navigation }) => ({
              headerTitle: (props) => <LogoTitle {...props} />,
              headerStyle: { backgroundColor: '#1D6FB8' },
              headerBackVisible: false
            })}
          />
          <Stack.Screen
            name='Add Device'
            component={AddDevice}
            options={{ headerTitle: 'Añadir Dispositivo', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Electric'
            component={ElectricInst}
            options={{ headerTitle: 'Añadir Dispositivo', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Conn'
            component={Conexion}
            options={{ headerTitle: 'Sensor', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Cnto'
            component={Conectando}
            options={{ headerTitle: 'Nuevo Dispositivo', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Nombre'
            component={Alias}
            options={{ headerTitle: 'Resumen Dispositivo', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Nivel'
            component={Niveles}
            options={{ headerTitle: 'Personalizar Niveles de Riesgo', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Ubica'
            component={Ubicacion}
            options={{ headerTitle: 'Ubicación', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Histo'
            component={HistoryData}
            options={{ headerTitle: 'Datos Historicos', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Notif'
            component={Notificar}
            options={{ headerTitle: 'Notificaciones', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Term'
            component={Terminos}
            options={{ headerTitle: 'Términos de Uso', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Poli'
            component={Politica}
            options={{ headerTitle: 'Política de Privacidad', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='ModificarUsuario'
            component={ModificarUsuario}
            options={{ headerTitle: 'Modificar Usuario', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />
          <Stack.Screen
            name='Mqtt'
            component={MacDir}
            options={{ headerTitle: 'Device', headerStyle: { backgroundColor: '#1D6FB8' } }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </appContext.Provider>
  );
}