import { ImageBackground, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../utils/env';
import AlertIcon from "react-native-vector-icons/Ionicons";

const SubscriptionPlan = ({ navigation, route }) => {

    const hotelCategory = route.params.hotelCategory;

    const [hotelData, setHotelData] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [subsResult, setSubsResult] = useState()

    useEffect(() => {
        getSubscriptionPlan()
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('signupdetail');
            if (value) {
                let updatedValue = JSON.parse(value);
                setHotelData(updatedValue);
            }
        };
        fetchData();
    }, []);


    const getSubscriptionPlan = async () => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
            }
        };
        await axios.get(`${baseUrl}GetHotelDetails?HotelId=${hotelCategory}`, config)
            .then((res) => {
                console.log("ressssss", res.data)
            })
            .catch(err => {
                console.log("errrr", err)
            });
    };

    const freeDayPlan = async () => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
            }
        };
        await axios.post(`${baseUrl}Free7DaysTrail?HotelId=${hotelCategory}`, {}, config)
            .then((res) => {
                setOpenModal(true)
                setSubsResult(res.data.Result)
            })
            .catch(err => {
                console.log("errrr", err)
            });
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.text1}>Hotel Guesting Reporting System</Text>
                <Text style={styles.text1}>कृपया अपना सब्सक्रिप्शन चुनें</Text>
            </View>

            <View style={{ paddingVertical: 10, borderRadius: 10, marginHorizontal: 15, borderWidth: 1, borderColor: "grey", paddingHorizontal: 15 }}>
                <Text style={styles.text2}>होटल का नाम - {hotelData.hotelName}</Text>
                <Text style={styles.text2}>रजिस्टर्ड मोबाइल नंबर - {hotelData.contact}</Text>
                <Text style={styles.text2}>कमरों की कुल संख्या - N/A</Text>
            </View>

            <View style={{ borderWidth: 1, borderColor: "grey", borderRadius: 10, marginHorizontal: 20, marginTop: 20 }}>
                <View style={styles.container2}>
                    <ImageBackground
                        source={require('../assets/images/greenbadge.png')}  // replace with your image path
                        style={styles.image}>
                        <Text style={styles.text}>7 DAYS FREE TRIAL</Text>
                    </ImageBackground>
                </View>

                <View style={styles.subscriptionContainer}>
                    <Text style={[styles.subscriptionPrice, { color: "#8BC03C" }]}>₹ 0</Text>
                </View>

                <TouchableOpacity style={styles.payButton} onPress={() => freeDayPlan()}>
                    <Text style={[styles.payButtonText, { backgroundColor: "#8BC03C" }]}>Activate Now</Text>
                </TouchableOpacity>
            </View>

            <View style={{ borderWidth: 1, borderColor: "grey", borderRadius: 10, marginHorizontal: 20, marginVertical: 20 }}>
                <View style={styles.container2}>
                    <ImageBackground
                        source={require('../assets/images/badgepink.png')}  // replace with your image path
                        style={styles.image}
                    >
                        <Text style={styles.text}>12 MONTH</Text>
                    </ImageBackground>
                </View>

                <View style={styles.subscriptionContainer}>
                    <Text style={[styles.subscriptionPrice, { color: "#E8569D" }]}>₹ 2500</Text>
                </View>

                <TouchableOpacity style={styles.payButton}
                    onPress={() => Linking.openURL('https://pages.razorpay.com/pl_OVJS2jyJPemwHD/view')}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
            </View>

            {/* Open modal for subscription success start */}
            <Modal transparent={true}
                animationType={'fade'}
                hardwareAccelerated={true}
                visible={openModal}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060' }}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1 }}>
                            <AlertIcon size={50} name="alert-circle-outline" color="#024063" style={{ marginLeft: 5 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.modalText}>आपका आज से 7 दिनों का ट्रायल शुरू हो गया है। अब आप लॉगिन करके चेक-इन रिपोर्ट बना सकते हैं। धन्यवाद।</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <Pressable
                                style={{ backgroundColor: '#1AA7FF', paddingHorizontal: 30, paddingVertical: 12, justifyContent: "center", alignItems: "center", borderRadius: 15 }}
                                onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.textStyle}>ठीक है</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Open modal for subscription success end */}
        </ScrollView>
    )
}

export default SubscriptionPlan

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: "auto",
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    container1: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 20

    },
    text1: {
        color: "#22BFF1",
        fontSize: 14,
        marginVertical: 5,
        fontWeight: "bold"
    },
    container2: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 20
    },
    text2: {
        color: "#000",
        fontSize: 12,
        marginVertical: 5,
        fontWeight: "400"
    },
    subscriptionContainer: {
        flex: 1,
        alignItems: 'center',
    },
    subscriptionDuration: {
        width: "70%",
        backgroundColor: '#E8569D',
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: "center"
    },
    subscriptionPrice: {
        fontSize: 24,
        color: '#E8569D',
        fontWeight: 'bold',
        marginVertical: 10
    },
    payButton: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 20
    },
    payButtonText: {
        width: "35%",
        backgroundColor: '#E8569D',
        fontSize: 12,
        color: '#ffffff',
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: "center",
        borderRadius: 7
    },
    modalView: {
        // flex: 1,
        height: 250,
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
        fontSize: 14,
    },
})