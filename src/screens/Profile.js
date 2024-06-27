import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Modal, Pressable } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from "react-native-vector-icons/Ionicons";



const Profile = ({ navigation }) => {

    const [profileDetails, setProfileDetails] = useState({})
    const [openModal, setOpenModal] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('hotelmgmt');
            if (value) {
                let updatedValue = JSON.parse(value);
                setProfileDetails(updatedValue);
            }
        };

        fetchData();
    }, []);



    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>
                <View style={{ flex: 6, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                    <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>होटल प्रोफ़ाइल</Text>
                </View>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}>
                    <Image source={require('../assets/images/profileLogo.png')} style={{ height: 40, width: 40, borderWidth: 1, borderRadius: 40, borderColor: "#fff" }} />
                </View>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>होटल का नाम*<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='होटल का नाम*'
                    value={profileDetails.HotelName || ''}
                    editable={false}
                    style={[styles.input, { marginTop: 8 }]}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>पता<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='पता*'
                    editable={false}
                    value={profileDetails.Address || ''}
                    style={[styles.input, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>मोबाइल नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='मोबाइल नंबर*'
                    editable={false}
                    value={profileDetails.Contact || ''}
                    style={[styles.input, { marginTop: 8 }]} />
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>संपर्क न.<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='संपर्क न.*'
                    editable={false}
                    value={profileDetails.ContactPersonMobile || ''}
                    style={[styles.input, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>ईमेल आईडी<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='ईमेल आईडी*'
                    editable={false}
                    value={profileDetails.EmailAddress || ''}
                    style={[styles.input, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>पुलिस स्टेशन<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='पुलिस स्टेशन*'
                    editable={false}
                    // value={profileDetails.HotelName || ''}
                    style={[styles.input, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", width: "85%", justifyContent: "space-between", alignItems: "center" }}>

                    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: "#000" }]} onPress={() => setOpenModal(true)}>
                        <Text style={styles.button}>Logout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} >
                        <Text style={styles.button}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Open modal for Logout start */}
            <Modal transparent={true}
                animationType={'fade'}
                hardwareAccelerated={true}
                visible={openModal}>

                <Pressable onPress={() => { setOpenModal(false) }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060' }}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1 }}>
                            <Alert size={50} name="alert-circle-outline" color="#024063" style={{ marginLeft: 5 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.modalText}>क्या आप लॉग आउट करना चाहते हैं?</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", flexDirection: "row" }}>
                            <Pressable
                                style={{ backgroundColor: '#1AA7FF', paddingHorizontal: 30, paddingVertical: 12, justifyContent: "center", alignItems: "center", borderRadius: 15 }}
                                onPress={async () => {
                                    await AsyncStorage.clear();
                                    setOpenModal(false);
                                    navigation.navigate('Login'); // Adjust 'Login' to your login screen name
                                }}
                            >
                                <Text style={styles.textStyle}>Logout</Text>
                            </Pressable>
                            <Pressable
                                style={{ backgroundColor: "#000", paddingHorizontal: 30, paddingVertical: 12, justifyContent: "center", alignItems: "center", borderRadius: 15, marginLeft: 40 }}
                                onPress={() => { setOpenModal(false) }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
            {/* Open modal for Logout end */}

        </ScrollView>

    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    input: {
        width: Dimensions.get('window').width - 60,
        backgroundColor: '#EEEEEE',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 10,
        paddingHorizontal: 20,
        color: "#000",
        height: 50,
        marginTop: 20,
    },
    inputContainer: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        borderRadius: 15,
        marginTop: 16,
        width: "45%",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF',
    },
    button: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "500",
    },
    errorText: {
        color: "#FF4545",
        marginTop: 5,
        width: "100%",
        marginLeft: 70,
        fontSize: 12
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    lableText: {
        fontSize: 12,
        color: "#000",
        marginLeft: 0,
        width: "45%",
        marginTop: 10
    },
    modalView: {
        // flex: 1,
        height: 200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#000",

    },
    textStyle: {
        color: "white",
        textAlign: "center",
    },
    modalText: {
        textAlign: "center",
        color: "black",
        fontSize: 15,
    },

});


