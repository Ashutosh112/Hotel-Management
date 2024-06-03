

import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import Logo1 from "../assets/images/UjjainPoliceLogo.png"
import Logo2 from "../assets/images/SplashLogo.svg"
import Logo3 from "../assets/images/CreateTextLogo.png"
import Logo4 from "../assets/images/Temple.png"
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
            <StatusBar backgroundColor="#fff" barStyle="dark-content" hidden={false} />
            <View style={styles.logoContainer1}>
                <Image source={Logo1} style={{ height: 80, width: 80, marginLeft: 20 }} resizeMode='contain' />
            </View>
            <View style={styles.logoContainer2}>
                <Logo2 />
            </View>
            <View style={styles.logoContainer3}>
                <Image source={Logo3} />
            </View>
            <View style={styles.logoContainer4}>
                <Image source={Logo4} />
            </View>
        </View>
    );
}
export default SplashScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    logoContainer1: {
        flex: 1,
        justifyContent: "center",

    },
    logoContainer2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    logoContainer3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    logoContainer4: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end"
    },
});