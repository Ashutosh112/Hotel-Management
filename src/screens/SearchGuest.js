import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons"
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GuestLogo from "../assets/images/guests.png"

const SearchGuest = ({ navigation }) => {

    const [mobileNumber, setMobileNumber] = useState("")
    const [name, setName] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [Aadhar, setAadhar] = useState("")
    const [guestData, setGuestData] = useState([])

    const searchGuest = async () => {
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}SearchGuest?HotelId=${idNumber}&GuestName=${name}`, {}, config)
            .then((res) => {
                setGuestData(res.data.Result)
            })
            .catch(err => {
                console.log("Errorr----", err)
            });
    };

    return (


        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                </TouchableOpacity>
                <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>सर्च गेस्ट</Text>

            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <Text style={styles.lableText}>नाम</Text>
                    <Text style={styles.lableText}>होटल आईडी</Text>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <TextInput
                        value={name} onChangeText={(value) => { setName(value) }}
                        placeholderTextColor='darkgrey'
                        placeholder='नाम'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} />
                    {/* <TextInput
                        value={mobileNumber} onChangeText={(value) => { setMobileNumber(value) }}

                        placeholderTextColor='darkgrey'
                        placeholder='मोबाइल नंबर'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} /> */}
                    <TextInput
                        value={idNumber} onChangeText={(value) => { setIdNumber(value) }}
                        placeholderTextColor='darkgrey'
                        placeholder='होटल आईडी'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} />
                </View>

                {/* <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <Text style={styles.lableText}>आधार नंबर</Text>
                    <Text style={styles.lableText}>होटल आईडी</Text>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <TextInput
                        value={Aadhar} onChangeText={(value) => { setAadhar(value) }}
                        placeholderTextColor='darkgrey'
                        placeholder='आधार नंबर'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} />
             
                </View> */}
                <TouchableOpacity style={styles.buttonContainer} onPress={() => searchGuest()}>
                    <Text style={styles.button}>Search</Text>
                </TouchableOpacity>
            </View>

            {guestData.map((item, index) => (
                <View key={index} style={{
                    flex: 1,
                    backgroundColor: "white",
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    marginHorizontal: 20,
                    height: 100,
                    borderRadius: 10,
                    elevation: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10
                }}>
                    <View style={{ flex: 1 }} >
                        <Image source={GuestLogo} style={{ height: 40, width: 40 }} resizeMode="contain" />
                    </View>
                    <View style={{ flex: 3 }}>
                        <View style={{ flex: 2, justifyContent: "center" }}>
                            <Text style={[styles.text, { textTransform: "capitalize" }]}>{item.GuestName} {item.GuestLastName}</Text>
                            <Text style={styles.text}>{item.ContactNo}</Text>
                            <Text style={styles.text}>{item.CheckInDate} - {item.CheckOutDate}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("SearchGuestDetails", { masterId: item.idGuestMaster })} style={{ flex: 1, borderWidth: 0.5, borderColor: "#024063", backgroundColor: "#024063", borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 12, color: "#fff", paddingVertical: 7 }}>Detail</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default SearchGuest;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F8",
        flex: 1,
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
        marginTop: 20,
    },
    inputContainer: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        borderRadius: 20,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF',
    },
    button: {
        fontSize: 18,
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
    text: {
        fontSize: 13,
        fontWeight: "400",
        color: "#36454F",
        marginTop: 5
    },
});


