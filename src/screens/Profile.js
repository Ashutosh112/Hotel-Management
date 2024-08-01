import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Modal, Pressable } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from "react-native-vector-icons/Ionicons";
import { baseUrl } from '../utils/env';
import axios from 'axios';
import Spinner from './Spinner';
import Toast from 'react-native-toast-message';
import LogoutIcon from "react-native-vector-icons/MaterialCommunityIcons"

const Profile = ({ navigation }) => {

    const [profileDetails, setProfileDetails] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [roomCategory, setRoomCategory] = useState('')
    const [roomPrice, setRoomPrice] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [categoryDetails, CategoryDetails] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('hotelmgmt');
            if (value) {
                let updatedValue = JSON.parse(value);
                setProfileDetails(updatedValue);
            }
        };
        fetchData();
        getCategory()
    }, []);


    const addCategorie = async () => {
        setIsLoading(true)
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        const body = [{
            idHotelRoomCategory: 0,
            idHotel: updatedValue.idHotelMaster,
            categoryName: roomCategory,
            iPrice: roomPrice,
            noOfRoom: 1,
            bChecked: true
        }];
        await axios.post(`${baseUrl}InsertCategory`, body, config)
            .then((res) => {
                setIsLoading(false)
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: res.data.Message
                });
                getCategory()
                setRoomCategory('')
                setRoomPrice('')
            })
            .catch(err => {
                setIsLoading(false)
            });
    };


    const getCategory = async () => {
        setIsLoading(true)
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        console.log("opopop", updatedValue)
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}HotelCategory?idHotel=${updatedValue.idHotelMaster}`, {}, config)
            .then((res) => {
                setIsLoading(false)
                CategoryDetails(res.data.Result)
            })
            .catch(err => {
                setIsLoading(false)
            });
    };


    return (
        <ScrollView style={styles.container}>
            <Spinner isLoading={isLoading} />

            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>
                <View style={{ flex: 6, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                    <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>होटल प्रोफ़ाइल</Text>
                </View>
                <TouchableOpacity style={{ flex: 2, flexDirection: "row", justifyContent: "center", alignItems: 'center' }} onPress={() => setOpenModal(true)}>
                    <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>Logout</Text>
                    <LogoutIcon name="location-exit" size={22} color="#fff" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
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
                <View style={{ height: 1, backgroundColor: "#024063", width: '90%', marginVertical: 20 }} />

                <View style={{ width: "90%", justifyContent: "center", paddingVertical: 10, elevation: 2, backgroundColor: "#ccd8df", borderRadius: 10, paddingHorizontal: 15 }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: 13, color: "#000", textAlign: "center", fontWeight: "500" }}>S. No. </Text>
                        <Text style={{ fontSize: 13, color: "#000", textAlign: "center", fontWeight: "500" }}>कमरे की श्रेणी </Text>
                        <Text style={{ fontSize: 13, color: "#000", textAlign: "center", fontWeight: "500" }}>मूल्य </Text>
                    </View>
                    {categoryDetails.length < 1 ?
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <Text style={{ fontSize: 12, fontWeight: "500", color: "grey" }}>No Record</Text>
                        </View>
                        : categoryDetails.map((item, index) => (
                            <View key={index} style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 12, color: "#000", textAlign: "center" }}> {index + 1}</Text>
                                <Text style={{ fontSize: 12, color: "#000", textAlign: "center" }}>{item.CategoryName}</Text>
                                <Text style={{ fontSize: 12, color: "#000", textAlign: "center" }}> {item.iPrice}</Text>
                            </View>
                        ))}
                </View>

                <View style={{ height: 1, backgroundColor: "#024063", width: '90%', marginVertical: 20 }} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <Text style={[styles.lableText, { marginTop: 0, fontWeight: "500" }]}>कमरे की श्रेणी<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    value={roomCategory}
                    placeholder='कमरे की श्रेणी*'
                    onChangeText={(value) => { setRoomCategory(value) }}
                    style={[styles.input2, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 15 }}>
                    <Text style={[styles.lableText, { marginTop: 0, fontWeight: "500" }]}>मूल्य<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    value={roomPrice}
                    placeholder='मूल्य*'
                    onChangeText={(value) => { setRoomPrice(value) }}
                    style={[styles.input2, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => addCategorie()}>
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
        height: 45,
        marginTop: 20,
    },

    input2: {
        width: Dimensions.get('window').width - 60,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 10,
        paddingHorizontal: 20,
        color: "#000",
        height: 45,
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
        width: Dimensions.get('window').width - 60,
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


