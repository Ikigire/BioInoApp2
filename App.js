import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, Image, View, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeBaseProvider, extendTheme } from "native-base";
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
import { appContext } from './utils/app-context';
import GraphicHistory from './GraphicHistory';
import ValidateEmail from './ValidateEmail';
import RecoveryEnterEmail from './RecoveryEnterEmail';
import RecoveryValidateEmail from './RecoveryValidateEmail';
import DiseñoTest from './DiseñoTest';
//import MacDir from './MacDir';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
     <Image
        source={require('./assets/logo_OP2_2.png')} 
        style={{ width: 50, height: 50, marginRight: 10,resizeMode: 'contain'  }} 
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
        {'MonCAI'}
      </Text>
    </View>
  );
}

function Logo() {
  
}

const theme = extendTheme({
  // Aquí puedes personalizar el tema según tus preferencias
});
export default function App() {
  const [updateEstList, setUpdateEstList] = useState(false);
  return (
    
    <appContext.Provider value={{
      updateEstList, setUpdateEstList
    }}>

      <NavigationContainer>
        <Stack.Navigator >
          
          <Stack.Screen 
            name='Login'
            component={Login}
            options={{ headerShown: false , backgroundColor: '#fff'}}
          />
          <Stack.Screen
            name='Signin'
            component={Signin}
            options={{ headerTitle: 'Registrarme' ,backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' }
          }}
          />
          <Stack.Screen
            name='ValidateEmail'
            component={ValidateEmail}
            options={{ headerTitle: 'Registrarme', backgroundColor: '#fff',headerStyle: {backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='RecoverEmail'
            component={RecoveryEnterEmail}
            options={{ headerTitle: 'Recuperacion', backgroundColor: '#fff',headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='RecoverValidateEmail'
            component={RecoveryValidateEmail}
            options={{ headerTitle: 'Recuperacion',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='PassRecovery'
            component={PassRecover}
            options={{ headerTitle: 'Recuperacion',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Tabs'
            component={MyTabs}
            options={({ navigation }) => ({
              headerTitle: 'Inicio',
              headerShown: false,
              backgroundColor: '#fff',
              headerStyle: { backgroundColor: '#fff' },
              headerBackVisible: false
            })}
          />
          <Stack.Screen
            name='Add Device'
            component={AddDevice}
            options={{ headerTitle: 'Añadir Dispositivo',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Electric'
            component={ElectricInst}
            options={{ headerTitle: 'Añadir Dispositivo',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Conn'
            component={Conexion}
            options={{ headerTitle: 'Sensor', backgroundColor: '#fff',headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Cnto'
            component={Conectando}
            options={{ headerTitle: 'Nuevo Dispositivo',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Nombre'
            component={Alias}
            options={{ headerTitle: 'Resumen Dispositivo', backgroundColor: '#fff',headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Nivel'
            component={Niveles}
            options={{ headerTitle: 'Personalizar Niveles de Riesgo',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Ubica'
            component={Ubicacion}
            options={{ headerTitle: 'Ubicación',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Histo'
            component={HistoryData}
            options={{ headerTitle: 'Datos Historicos', backgroundColor: '#fff',headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Notif'
            component={Notificar}
            options={{ headerTitle: 'Mi cuenta', backgroundColor: '#fff',headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Term'
            component={Terminos}
            options={{ headerTitle: 'Términos de Uso',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Poli'
            component={Politica}
            options={{ headerTitle: 'Política de Privacidad',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='ModificarUsuario'
            component={ModificarUsuario}
            options={{ headerTitle: 'Modificar Usuario',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='Mqtt'
            component={MacDir}
            options={{ headerTitle: 'Dispositivo',backgroundColor: '#fff', headerStyle: { backgroundColor: '#fff' } }}
          />
          <Stack.Screen
            name='graphics'
            component={GraphicHistory}
            options={{ headerTitle: 'Historial', backgroundColor: '#fff',headerStyle: { backgroundColor: '#fff' }}}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </appContext.Provider>
  );
}