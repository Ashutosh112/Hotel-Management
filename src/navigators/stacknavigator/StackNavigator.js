import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from '../../screens/Login';
import BottomNavigator from '../bottomnavigator/BottomNavigator';
import SplashScreen from '../../screens/SplashScreen';
import Signup from '../../screens/Signup';
import CreateReport from '../../screens/CreateReport';


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
                    <Stack.Screen name="CreateReport" component={CreateReport} options={{ headerShown: true, headerTitle: "Create Report" }} />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})