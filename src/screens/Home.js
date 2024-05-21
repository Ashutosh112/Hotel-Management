import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from "../assets/images/UjjainPoliceLogo.png"

const Home = () => {
    return (
        <LinearGradient
            colors={['#0047AB', '#04686d']}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>

            <LinearGradient
                colors={['#0047AB', '#04686d']}
                style={styles.linearGradient2}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                    {/* <Text style={styles.text}>Menu</Text> */}
                    <Text style={styles.text}>Welcome!</Text>
                    <Text style={[styles.text, { fontSize: 24, fontWeight: "bold" }]}>Ajay Sharma</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", }}>
                    <Image source={Logo} style={{ height: 70, width: 70 }} />
                </View>

            </LinearGradient>

            <View style={styles.underContainer}>

            </View>

        </LinearGradient>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    linearGradient: {
        flex: 1,
    },

    linearGradient2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 20
    },
    text: {
        fontSize: 16,
        color: "white",
        marginVertical: 2
    },

    underContainer: {
        flex: 5,
        backgroundColor: "white",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    }
});

