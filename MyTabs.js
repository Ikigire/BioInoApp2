import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useEffect, useState } from 'react';
import { View, BackHandler, Alert } from 'react-native';

import Home from './Home';
import Settings from './Settings';
import History from './History';
import Realtime from './Realtime';
import MacDir from './MacDir';

const Tab = createMaterialBottomTabNavigator();

const MyTabs = ({ navigation }) => {
    const [isFocused, setIsFocused] = useState(true);

    const backPressed = () => {
        Alert.alert(
            'Está a punto de salir',
            '¿Desea cerrar la aplicación?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed') },
                { text: 'No, Cerrar sesión', onPress: () => { navigation.navigate("Login"); } },
                { text: 'Sí, Cerrar la aplicación', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
        );
        return true;
    }

    const addBackEventListener = () => {
        BackHandler.addEventListener('hardwareBackPress', backPressed);
    }

    const removeBackEventListener = () => {
        BackHandler.removeEventListener('hardwareBackPress', backPressed);
        console.log("Limpiando intervals");
    }

    useEffect(() => {
        navigation.addListener('focus', () => { addBackEventListener(); setIsFocused(true); });
        navigation.addListener('blur', () => { removeBackEventListener(); setIsFocused(false); });
    }, []);

    if (!isFocused) {
        return null;
    }

    return (
        <Tab.Navigator
            initialRouteName='Home'
            activeColor='#1D6FB8'
            inactiveColor='#ffffff'
            alignItems='center'
            labeled={false}
            barStyle={{
                backgroundColor: '#1D6FB8',
                height: 70,
                justifyContent: 'center',
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons style={{alignContent:'center',alignItems:'center',alignSelf:'center',marginTop:-5}} name='home' color={color} size={30} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name='Realtime'
                component={Realtime}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons style={{alignContent:'center',alignItems:'center',alignSelf:'center',marginTop:-5}} name='clock' color={color} size={30} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name='History'
                component={History}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons style={{alignContent:'center',alignItems:'center',alignSelf:'center',marginTop:-5}} name='chart-bar' color={color} size={30} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name='Settings'
                component={Settings}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View >
                            <MaterialCommunityIcons style={{alignContent:'center',alignItems:'center',alignSelf:'center',marginTop:-5}} name='cogs' color={color} size={30}  />
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = {
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        
    }
};

export default MyTabs;
