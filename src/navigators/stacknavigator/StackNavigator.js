import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from '../../screens/Login';
import BottomNavigator from '../bottomnavigator/BottomNavigator';
import SplashScreen from '../../screens/SplashScreen';
import Signup from '../../screens/Signup';
import CreateReport from '../../screens/CreateReport';
import AddGuestInReport from '../../screens/AddGuestInReport';
import SearchGuest from '../../screens/SearchGuest';
import SubmittedReport from '../../screens/SubmittedReport';
import NoCheckIn from '../../screens/NoCheckIn';
import PendingReport from '../../screens/PendingReport';
import PendingReportDetails from '../../screens/PendingReportDetails';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const [showSplashScreen, setShowSplashScreen] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowSplashScreen(false);
        }, 3000);
    }, []);

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    {showSplashScreen ? (<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />) : null}
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                    <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="CreateReport" component={CreateReport} options={{ headerShown: false, headerTitle: "Create Report" }} />
                    <Stack.Screen name="AddGuestInReport" component={AddGuestInReport} options={{ headerShown: false, headerTitle: "Add Guest" }} />
                    <Stack.Screen name="SearchGuest" component={SearchGuest} options={{ headerShown: false, headerTitle: "Search Guest" }} />
                    <Stack.Screen name="SubmittedReport" component={SubmittedReport} options={{ headerShown: false, headerTitle: "Submitted Report" }} />
                    <Stack.Screen name="PendingReport" component={PendingReport} options={{ headerShown: true, headerTitle: "Pending Reports" }} />
                    <Stack.Screen name="NoCheckIn" component={NoCheckIn} options={{ headerShown: true, headerTitle: "No Check In" }} />
                    <Stack.Screen name="PendingReportDetails" component={PendingReportDetails} options={{ headerShown: true, headerTitle: "Report Details" }} />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})