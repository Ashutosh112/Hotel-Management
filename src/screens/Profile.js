import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, } from 'react-native';

const Profile = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
            <View style={styles.inputContainer}>

                <Image source={require('../assets/images/profileLogo.png')} style={{ height: 100, width: 100, borderWidth: 1, borderRadius: 100, borderColor: "#fff" }} />

                <TextInput placeholderTextColor='darkgrey' placeholder='होटल का नाम*' style={styles.input}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='पता*' style={styles.input}></TextInput>
                <TextInput maxLength={10} keyboardType='number-pad' placeholderTextColor='darkgrey' placeholder='मोबाइल नंबर*' style={styles.input}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='संपर्क न.*' style={styles.input}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='ईमेल आईडी*' style={styles.input}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='पुलिस स्टेशन*' style={styles.input}></TextInput>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    body: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 28,
        marginTop: 20
    },
    text2: {
        color: "#000",
        fontSize: 16,
    },
    input: {
        width: Dimensions.get('window').width - 60,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 10,
        paddingHorizontal: 20,
        color: "#000",
        height: 50,
        marginTop: 20

    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        borderRadius: 10,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#2AAA8A'
    },
    button: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "bold"
    },
    greyText: {
        marginTop: 15,
        fontSize: 14,
        color: "#FFBF00",
        fontWeight: "bold"
    },
    google_button: {
        color: 'white',
        width: Dimensions.get('window').width - 60,
        backgroundColor: "#000",
        borderRadius: 30,
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 20,
        paddingHorizontal: 20,
        height: 50
    },

    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },

    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});