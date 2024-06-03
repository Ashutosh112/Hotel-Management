import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeLogoBlue from "../../assets/images/Homeblue.svg"
import HomeLogoGrey from "../../assets/images/Homegrey.svg"
import ProfileBlue from "../../assets/images/Profileblue.svg"
import ProfileGrey from "../../assets/images/Profilegrey.svg"
import SearchBlue from "../../assets/images/Searchblue.svg"
import SearchGrey from "../../assets/images/Searchgrey.svg"
import AddGuestBlue from "../../assets/images/AddGuestblue.svg"
import AddGuestGrey from "../../assets/images/AddGuestgrey.svg"
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import SearchGuest from '../../screens/SearchGuest';
import AddGuestInReport from '../../screens/AddGuestInReport';

const Tab = createBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {
    return (
        <Tab.Navigator shifting={true} screenOptions={{ tabBarHideOnKeyboard: true, tabBarActiveTintColor: '#1AA7FF' }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            focused ?
                                <HomeLogoGrey />
                                :
                                <HomeLogoBlue />
                        )

                    }, headerShown: false
                }} />

            <Tab.Screen name="AddGuestInReport" component={AddGuestInReport}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            focused ?
                                <AddGuestBlue />
                                :
                                <AddGuestGrey />
                        )
                    }, headerTitleAlign: "left", headerTintColor: '#000', headerShown: false, tabBarLabel: "Add Guest"
                }}
            />

            <Tab.Screen name="SearchGuest" component={SearchGuest}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            focused ?
                                <SearchBlue />
                                :
                                <SearchGrey />
                        )
                    }, headerTitleAlign: "left", headerTintColor: '#000', headerShown: false, tabBarLabel: "Search"
                }}
            />



            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            focused ?
                                <ProfileBlue />
                                :
                                <ProfileGrey />
                        )
                    }, headerTitleAlign: "left", headerTintColor: '#000', headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigator
