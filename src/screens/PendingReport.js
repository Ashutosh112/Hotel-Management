import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, Pressable, Dimensions, View, Image, TouchableOpacity, TextInput, Modal } from "react-native";
import BackIcon from "react-native-vector-icons/Ionicons"
import InfoIcon from "react-native-vector-icons/Feather"

import { baseUrl } from "../utils/env";

const PendingReport = ({ navigation }) => {

    const [openModal, setOpenModal] = useState(false)


    const data = [
        { id: 1, label: 'Darshan', value: '1' },
        { id: 2, label: 'Business', value: '2' },
        { id: 3, label: 'Normal Visit', value: '3' },
        { id: 4, label: 'Appointment', value: '4' },
        { id: 5, label: 'Meeting', value: '5' },
        { id: 6, label: 'Guest', value: '6' },

    ];

    useEffect(() => {
        pendingList()
    }, [])


    const [pendingGuestDetails, setPendingGuestDetails] = useState([])

    const pendingList = async () => {
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}AllPendingGuestList?HotelId=${updatedValue.idHotelMaster}`, {}, config)
            .then((res) => {
                console.log("response>>>", res.data.Result);
                setPendingGuestDetails(res.data.Result)

            })
            .catch(err => {
                console.log("Error", err);
            });
    };

    return (
        <View style={{ backgroundColor: "#F5F5F8" }}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                    <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>पेंडिंग रिपोर्ट</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>

                    <TouchableOpacity onPress={() => setOpenModal(true)}>
                        <InfoIcon name="info" size={24} color="#fff" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>

            </View>
            <TextInput placeholderTextColor="darkgrey" placeholder='Search' style={styles.input}></TextInput>
            <FlatList
                data={pendingGuestDetails}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) =>
                    <View onPress={() => navigation.navigate("OrderHistory")} style={styles.container} key={index}>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require('../assets/images/pendingReport.png')} style={{ height: 45, width: 45, borderWidth: 1, borderRadius: 45, borderColor: "#fff" }} />
                        </View>

                        <View style={{ flex: 2, justifyContent: "center" }}>
                            <Text style={[styles.text1, { textTransform: 'capitalize' }]}>कुल व्यक्ति संख्या  : {item.AddionalGuest}</Text>
                            <Text style={styles.text2}>प्रथम नाम</Text>
                            <Text style={styles.text2}>मोबाइल नंबर
                            </Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", borderRadius: 8, borderColor: "#024063", backgroundColor: "#024063", borderWidth: 1.5 }} onPress={() => navigation.navigate("PendingReportDetails")}>
                                <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "400", color: "#fff", padding: 10, paddingVertical: 8 }}>Show Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                } />

            {/* Open modal for Logout start */}
            <Modal transparent={true}
                animationType={'fade'}
                hardwareAccelerated={true}
                visible={openModal}>

                <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060' }}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.modalText}>अभी तक पुलिस स्टेशन में सबमिट नहीं हुई पेंडिंग चेक-इन रिपोर्ट</Text>
                            <Text style={styles.modalText}>|| कृपया ध्यान दें ||</Text>
                            <Text style={styles.modalText}>1. एक बार रिपोर्ट थाने में सबमिट करने के बाद उस तारीख के लिए आप कोई नए गेस्ट की एंट्री नहीं कर पाएंगे।   </Text>
                            <Text style={styles.modalText}>2. GuestReport.in होटलों द्वारा सबमिट की गई अतिथि जानकारी की सामग्री या सटीकता के लिए जिम्मेदार नहीं है। </Text>
                            <Pressable
                                style={{ backgroundColor: "#024063", paddingHorizontal: 40, paddingVertical: 12, justifyContent: "center", alignItems: "center", borderRadius: 10, marginVertical: 10 }}
                                onPress={() => { setOpenModal(false) }}
                            >
                                <Text style={styles.textStyle}>ठीक</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
            {/* Open modal for Logout end */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
        paddingHorizontal: 15,
        margin: 5,
        height: 80,
        borderRadius: 10,
        elevation: 2,
        marginHorizontal: 15

    },
    text1: {
        fontSize: 12,
        fontWeight: "500",
        color: "#000",
        marginLeft: 20
    },
    text2: {
        fontSize: 12,
        fontWeight: "400",
        color: "grey",
        marginLeft: 20,
        marginTop: 5
    },
    input: {
        height: 45,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 30,
        paddingHorizontal: 20,
        color: "#000",
        marginVertical: 10,
        marginHorizontal: 10
    },
    modalView: {
        // flex: 1,
        height: Dimensions.get("window").height / 2.4,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        paddingHorizontal: 40,
        paddingVertical: 0,
        alignItems: "center",
        justifyContent: "center"

    },
    textStyle: {
        color: "white",
        textAlign: "center",
    },
    modalText: {
        textAlign: "center",
        color: "black",
        fontSize: 14,
        marginVertical: 10
    },
});

export default PendingReport;