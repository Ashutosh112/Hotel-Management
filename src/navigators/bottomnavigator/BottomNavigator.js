import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeLogo from "react-native-vector-icons/FontAwesome"
import SettingLogo from "react-native-vector-icons/EvilIcons"
import Home from '../../screens/Home';
import Settings from '../../screens/Settings';

const Tab = createBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {
    return (
        <Tab.Navigator shifting={true} screenOptions={{ tabBarHideOnKeyboard: true, tabBarActiveTintColor: '#04686d' }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <HomeLogo name="user-o" size={24} style={{ color: focused ? '#04686d' : "grey", }} />
                    }, headerShown: false
                }} />

            <Tab.Screen name="Settings" component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <SettingLogo name="gear" size={28} style={{ color: focused ? '#04686d' : "grey", }} />
                    }, headerTitleAlign: "left", headerTintColor: "#fff", headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigator
