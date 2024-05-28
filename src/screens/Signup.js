import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Dimensions, ScrollView, Pressable } from 'react-native';
import Logo from "../assets/images/UjjainPoliceLogo.png"
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';


const Signup = ({ navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [GumastaFile, setGumastaFile] = useState([])
    const [aadharFile, setAadharFile] = useState([])


    const selectGumastaFile = async () => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false
            });
            setGumastaFile(doc)
        } catch (err) {
            if (DocumentPicker.isCancel(err))
                Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: 'User cancelled the file selection'
                });

            else
                console.log(err)
        }
    }

    const selectAadharFile = async () => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false
            });
            console.log(doc)
            setAadharFile(doc)
        } catch (err) {
            if (DocumentPicker.isCancel(err))
                Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: 'User cancelled the file selection'
                });
            else
                console.log(err)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />

            <View style={styles.body}>
                <Image source={Logo} style={{ height: 80, width: 80 }} />
                <Text style={styles.text}>Hotel Registration</Text>
                <Text style={styles.text2}>Register to create account</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholderTextColor='darkgrey' placeholder='होटल का नाम' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='होटल का पता' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='होटल मलिक का नाम' style={styles.input}></TextInput>
                    <TextInput maxLength={10} keyboardType='number-pad' placeholderTextColor='darkgrey' placeholder='होटल मलिक का मोबाइल' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='होटल की वेबसाइट' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='होटल मेल आईडी' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='रजिस्टर मोबाइल न.' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='प्रॉपर्टी प्रकार' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='शहर' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='राज्य' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='क्षेत्र' style={styles.input}></TextInput>
                    <TextInput placeholderTextColor='darkgrey' placeholder='थाना' style={styles.input}></TextInput>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                        {
                            GumastaFile.length > 0 ?
                                <TextInput placeholderTextColor='darkgrey' placeholder='File Uploaded' style={[styles.input, { width: "45%" }]}></TextInput>
                                :
                                <TextInput placeholderTextColor='darkgrey' placeholder='होटल का गुमस्ता' style={[styles.input, { width: "45%" }]}></TextInput>
                        }

                        <TouchableOpacity onPress={selectGumastaFile} style={[styles.input, { width: "45%", backgroundColor: '#2AAA8A', justifyContent: "center", alignItems: "center" }]}>
                            <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "white" }}>Choose File</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                        {
                            aadharFile.length > 0 ?
                                <TextInput placeholderTextColor='darkgrey' placeholder='Aadhar Uploaded' style={[styles.input, { width: "45%" }]}></TextInput>
                                :
                                <TextInput placeholderTextColor='darkgrey' placeholder='मालिक का आधार' style={[styles.input, { width: "45%" }]}></TextInput>
                        }

                        <TouchableOpacity onPress={selectAadharFile} style={[styles.input, { width: "45%", backgroundColor: '#2AAA8A', justifyContent: "center", alignItems: "center" }]}>
                            <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "white" }}>Choose File</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: "85%", marginTop: 20, flexDirection: "row", alignItems: "center" }}>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text> I agree to all terms & conditions</Text>
                    </View>


                    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.button}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} onPress={() => navigation.navigate("Login")}>
                <Text style={[styles.greyText, { marginVertical: 20, color: "black", fontWeight: "400" }]}>Already have an account?
                    <Text style={[styles.greyText, { marginVertical: 20, fontWeight: "500" }]}> Login</Text>
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

export default Signup

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    text: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 28,
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
        marginTop: 20,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        borderRadius: 10,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginBottom: 10,
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
    checkbox: {
        width: 64,
        height: 64
    }

});