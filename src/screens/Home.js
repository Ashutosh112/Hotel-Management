import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Alert, BackHandler, Pressable, Modal, Linking } from 'react-native';
import PlusIcon from "react-native-vector-icons/Entypo"
import HomeIcon1 from "../assets/images/HomeIcon1.svg"
import HomeIcon2 from "../assets/images/HomeIcon2.svg"
import HomeIcon3 from "../assets/images/HomeIcon3.svg"
import HomeIcon4 from "../assets/images/HomeIcon4.svg"
import HomeIcon5 from "../assets/images/HomeIcon5.svg"
import HomeIcon6 from "../assets/images/HomeIcon6.svg"
import UserIcon from "react-native-vector-icons/Octicons"
import HamburgerLogo from "../assets/images/HamburgerLogo.svg"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import ContactUs from "react-native-vector-icons/AntDesign"
import PrivacyPolicyIcon from "react-native-vector-icons/MaterialIcons"
import SubscriptionIcon from "../assets/images/subscription.png";
import moment from 'moment';
import { baseUrl } from '../utils/env';
import axios from 'axios';
import AlertIcon from "react-native-vector-icons/Ionicons";

const Home = ({ navigation }) => {
    const [hotelData, setHotelData] = useState({});
    const [expiryDetails, setExpiryDetails] = useState(false);
    const [details, setDetails] = useState("");

    // Run when component mounts and when the user navigates back
    useFocusEffect(
        React.useCallback(() => {
            fetchData(); // Refetch data when the component gains focus
            getExpiryDetails(); // Fetch expiry details

            // Handle back button
            const backAction = () => {
                Alert.alert("Exit App", "Do you want to exit the app?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel",
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            };

            const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

            return () => backHandler.remove();
        }, []) // Empty dependency array ensures it runs only once
    );

    const fetchData = async () => {
        try {
            const value = await AsyncStorage.getItem('hotelmgmt');
            if (value) {
                const updatedValue = JSON.parse(value);
                console.log("Hotel Data Fetched:", updatedValue);
                setHotelData(updatedValue); // Update the state with fetched data
            } else {
                console.log("No data found in AsyncStorage");
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const getExpiryDetails = async () => {
        try {
            const value = await AsyncStorage.getItem('hotelmgmt');
            const updatedValue = JSON.parse(value);
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${updatedValue.Token}`,
                },
            };

            const res = await axios.post(`${baseUrl}ValidateSubcription?HotelId=${updatedValue.idHotelMaster}`, {}, config);
            setDetails(res.data.Message);
            console.log("reeeeeeeeeeeeee1111111111", res.data)
            if (res.data.StatusCode === -1) {
                setExpiryDetails(true);
            }
        } catch (error) {
            console.log("Error fetching expiry details:", error);
        }
    };
    return (

        <View style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>
                <Pressable style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }} onPress={() => navigation.navigate("Profile")}>
                    <UserIcon name="feed-person" size={32} color="#fff" />
                </Pressable>
                <View style={{ flex: 6 }}>
                    <Text style={[styles.lableText, { fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0, textTransform: "capitalize" }]}> {hotelData.HotelName}</Text>
                    <Text style={[styles.lableText, { fontSize: 12, fontWeight: "300", color: "#fff", width: "auto", marginTop: 5 }]}>+91  {hotelData.Contact}</Text>
                </View>
                {/* <Pressable style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }} onPress={() => navigation.navigate("Profile")}>
                    <UserIcon name="feed-person" size={32} color="#fff" />
                </Pressable> */}
            </View>

            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <ScrollView style={styles.inputContainer}>
                <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("CreateReport")}>
                    <View style={{ flex: 1 }}>
                        <HomeIcon1 />
                    </View>
                    <View style={{ flex: 6 }}>
                        <Text style={styles.text}>गेस्ट की जानकारी दर्ज करें</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <PlusIcon name="plus" size={22} color="#484C52" style={{ marginLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("CreateReport")}>
                    <View style={{ flex: 1 }}>
                        <HomeIcon6 />
                    </View>
                    <View style={{ flex: 6 }}>
                        <Text style={styles.text}>गेस्ट जोडे</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <PlusIcon name="plus" size={22} color="#484C52" style={{ marginLeft: 15 }} />
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("SearchGuest")}>
                    <View style={{ flex: 1 }}>
                        <HomeIcon2 />
                    </View>
                    <View style={{ flex: 6 }}>
                        <Text style={styles.text}>सर्च गेस्ट</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <PlusIcon name="plus" size={22} color="#484C52" style={{ marginLeft: 15 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("SubmittedReport")}>
                    <View style={{ flex: 1 }}>
                        <HomeIcon3 />
                    </View>
                    <View style={{ flex: 6 }}>
                        <Text style={styles.text}>सब्मीटेड रिपोर्ट</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <PlusIcon name="plus" size={22} color="#484C52" style={{ marginLeft: 15 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("PendingReport")}>
                    <View style={{ flex: 1 }}>
                        <HomeIcon4 />
                    </View>
                    <View style={{ flex: 6 }}>
                        <Text style={styles.text}>पेंडिंग रिपोर्ट</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <PlusIcon name="plus" size={22} color="#484C52" style={{ marginLeft: 15 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("NoCheckIn")}>
                    <View style={{ flex: 1 }}>
                        <HomeIcon5 />
                    </View>
                    <View style={{ flex: 6 }}>
                        <Text style={styles.text}>जीरो चेक इन रिपोर्ट</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <PlusIcon name="plus" size={22} color="#484C52" style={{ marginLeft: 15 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("ContactWithUS")}>
                    <View style={{ flex: 1 }}>
                        <ContactUs name="contacts" size={24} color='#1AA7FF' />
                    </View>
                    <View style={{ flex: 6 }}>
                        <Text style={styles.text}>हमसे संपर्क करें</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <PlusIcon name="plus" size={22} color="#484C52" style={{ marginLeft: 15 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("PrivacyPolicy")}>
                    <View style={{ flex: 1 }}>
                        <PrivacyPolicyIcon name="policy" size={24} color='#1AA7FF' />
                    </View>
                    <View style={{ flex: 6 }}>
                        <Text style={styles.text}>महत्वपूर्ण नियम एवं शर्तें</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <PlusIcon name="plus" size={22} color="#484C52" style={{ marginLeft: 15 }} />
                    </View>
                </TouchableOpacity>



                <View style={styles.input} >
                    <View style={{ flex: 1 }}>
                        <Image source={SubscriptionIcon} style={{ height: 24, width: 24 }} />
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text style={styles.text}>मैनेज सब्क्रिप्शन </Text>
                        <Text style={styles.text1}>प्लान एन्ड डेट - {hotelData ? moment(hotelData.ValidUpto).format("DD-MMM-YYYY") : "N/A"}</Text>

                    </View>
                    <View style={{ flex: 2, alignItems: "center" }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#1AA7FF', paddingHorizontal: 8, paddingVertical: 5, justifyContent: "center", alignItems: "center", borderRadius: 6 }}
                            onPress={() => Linking.openURL('https://pages.razorpay.com/pl_OVJS2jyJPemwHD/view')}
                        >
                            <Text style={styles.textStyle}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


            {/* Open modal for Add room category start */}
            <Modal transparent={true}
                animationType={'fade'}
                hardwareAccelerated={true}
                visible={expiryDetails}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060' }}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1 }}>
                            <AlertIcon size={50} name="alert-circle-outline" color="#024063" style={{ marginLeft: 5 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.modalText}>{details}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                            <Pressable
                                style={{ backgroundColor: '#1AA7FF', paddingHorizontal: 30, paddingVertical: 12, justifyContent: "center", alignItems: "center", borderRadius: 15 }}
                                onPress={async () => {
                                    await AsyncStorage.removeItem('hotelmgmt'); // Remove token
                                    setExpiryDetails(false); // Close modal
                                    navigation.replace('Login'); // Navigate to Login screen
                                }}
                            >
                                <Text style={styles.textStyle}>Okay</Text>
                            </Pressable>
                            {/* <Pressable
                                style={{ backgroundColor: "#000", paddingHorizontal: 30, paddingVertical: 12, justifyContent: "center", alignItems: "center", borderRadius: 15, marginLeft: 40 }}
                                onPress={() => { setExpiryDetails(false) }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable> */}
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Open modal for Add room category end */}
        </View>


    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        flexDirection: "row",
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 15,
        color: "#000",
        height: 55,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    inputContainer: {
        marginTop: 20,
        // justifyContent: "center",
        // alignItems: "center",
    },
    text: {
        fontSize: 14,
        color: "#000",
        fontWeight: "400"
    },
    text1: {
        fontSize: 12,
        color: "#024063",
        fontWeight: "400"
    },
    textStyle: {
        fontSize: 12,
        color: "white",
        textAlign: "center",
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
    modalText: {
        textAlign: "center",
        color: "black",
        fontSize: 15,
    },
});






