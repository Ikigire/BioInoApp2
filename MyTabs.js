import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { BackHandler, Alert } from 'react-native';
import { Component, useEffect, useState } from 'react';

import Home from './Home';
import Settings from './Settings';
import History from './History';
import Realtime from './Realtime';
import MacDir from './MacDir';

const Tab = createMaterialBottomTabNavigator();

const MyTabs = ({ navigation }) => {
    const [isFocused, setIsFocused] = useState(true)
    const backPressed = () => {
        Alert.alert(
            'Está a punto de salir',
            '¿Desea cerrar la apicación?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed') },
                { text: 'Cerrar sesión', onPress: () => { navigation.navigate("Login");} },
                { text: 'Si, Cerrar', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false });
        return true;
    }

    const addBackEventListener = () => {
        BackHandler.addEventListener('hardwareBackPress', backPressed);
        // setIsFocused(true);
    }
    const removeBackEventListener = () => {
        BackHandler.removeEventListener('hardwareBackPress', backPressed);
        // setIsFocused(false);
        console.log("Limpiando intervals");
    }
    
    useEffect(() => {
        navigation.addListener('focus',  () => {addBackEventListener(); setIsFocused(true);});
        navigation.addListener('blur',  () => {removeBackEventListener(); setIsFocused(false);});
    }, []);

    if (!isFocused) {
        return (<></>);
    }
    
    return (
        
        <Tab.Navigator
                initialRouteName='Home'
                activeColor='#1D6FB8'
                inactiveColor='#ffffff'
                labeled={false}
                barStyle={{
                    backgroundColor: '#1D6FB8',
                    height: 70
                }}
            >
                <Tab.Screen
                    name='Home'
                    component={Home}
                    
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='home' color={color} size={30} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Realtime'
                    component={Realtime}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='clock' color={color} size={30} />
                        )
                    }}
                />
                <Tab.Screen
                    name='History'
                    component={History}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='chart-bar' color={color} size={30} />
                        )
                    }}
                />
                <Tab.Screen
                    name='Settings'
                    component={Settings}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='cogs' color={color} size={30} />
                        )
                    }}
                />
            </Tab.Navigator>
    )
}

export default MyTabs