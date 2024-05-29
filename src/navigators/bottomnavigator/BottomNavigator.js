import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeLogo from "react-native-vector-icons/Ionicons"
import ProfileLogo from "react-native-vector-icons/FontAwesome"
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';

const Tab = createBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {
    return (
        <Tab.Navigator shifting={true} screenOptions={{ tabBarHideOnKeyboard: true, tabBarActiveTintColor: '#04686d' }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <HomeLogo name="home-outline" size={24} style={{ color: focused ? '#04686d' : "grey", }} />
                    }, headerShown: false
                }} />

            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <ProfileLogo name="user-o" size={24} style={{ color: focused ? '#04686d' : "grey", }} />
                    }, headerTitleAlign: "left", headerTintColor: '#000', headerShown: true
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigator
