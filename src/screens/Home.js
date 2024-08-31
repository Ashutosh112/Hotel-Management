import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Alert, BackHandler, Pressable } from 'react-native';
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


const Home = ({ navigation }) => {

    const [hotelData, setHotelData] = useState({})

    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert("Exit App", "Do you want to exit the app?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [])
    );


    useEffect(() => {
        const fetchData = async () => {
            const value = await AsyncStorage.getItem('hotelmgmt');
            if (value) {
                let updatedValue = JSON.parse(value);
                console.log("updatedValue", updatedValue)
                setHotelData(updatedValue);
            }
        };
        fetchData();
    }, []);

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>
                <Pressable style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }} onPress={() => navigation.navigate("Profile")}>
                    <UserIcon name="feed-person" size={32} color="#fff" />
                </Pressable>
                <View style={{ flex: 6 }}>
                    <Text style={[styles.lableText, { fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0, textTransform: "capitalize" }]}> {hotelData ? hotelData.HotelName : "Loading..."}</Text>
                    <Text style={[styles.lableText, { fontSize: 12, fontWeight: "300", color: "#fff", width: "auto", marginTop: 5 }]}>+91  {hotelData ? hotelData.Contact : "Loading..."}</Text>
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



                <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("SubscriptionPlan")}>
                    <View style={{ flex: 1 }}>
                        <Image source={SubscriptionIcon} style={{ height: 24, width: 24 }} />
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text style={styles.text}>मैनेज सब्क्रिप्शन </Text>
                        <Text style={styles.text1}>प्लान एन्ड डेट - {hotelData ? moment(hotelData.ValidUpto).format("DD-MMM-YYYY") : "N/A"}</Text>

                    </View>
                    <View style={{ flex: 2, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.navigate("SubscriptionPlan")} style={{ backgroundColor: '#1AA7FF', paddingHorizontal: 8, paddingVertical: 5, justifyContent: "center", alignItems: "center", borderRadius: 6 }}>
                            <Text style={styles.textStyle}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </ScrollView>
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
});






