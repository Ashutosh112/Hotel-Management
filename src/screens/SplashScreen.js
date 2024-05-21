

import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import Logo from "../assets/images/UjjainPoliceLogo.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            auth()
        }, 1650)

    })

    const auth = async () => {
        const value = await AsyncStorage.getItem('hotelm');
        let updatedValue = JSON.parse(value);
        if (updatedValue) {
            navigation.navigate('BottomNavigator')
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />

            <View style={styles.logoContainer}>
                <Image source={Logo} style={{ height: 200, width: 200 }} resizeMode='contain' />
            </View>
        </View>
    );
}
export default SplashScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
});