import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { BackHandler, Alert } from 'react-native';
import { Component } from 'react';

import Home from './Home';
import Settings from './Settings';
import History from './History';
import Realtime from './Realtime';
import MacDir from './MacDir';

const Tab = createMaterialBottomTabNavigator();

class MyTabs extends Component {
    constructor() {
        super();
    }
    
    backPressed = () => {
        Alert.alert(
            'Está a punto de salir',
            '¿Desea cerrar la apicación?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed') },
                { text: 'Cerrar sesión', onPress: () => { this.props.navigation.navigate("Login");} },
                { text: 'Si, Cerrar', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false });
        return true;
    }

    componentDidMount() {
        this.props.navigation.addListener('focus',  () => {this.addBackEventListener()});
        this.props.navigation.addListener('blur',  () => {this.removeBackEventListener()});
    }

    addBackEventListener() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }
    removeBackEventListener() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }
    shouldComponentUpdate() {
        return true;
    }

    render() {
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
        );
    }
}

export default MyTabs;