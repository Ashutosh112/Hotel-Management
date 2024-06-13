import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Alert, BackHandler } from 'react-native';
import PlusIcon from "react-native-vector-icons/Entypo"
import HomeIcon1 from "../assets/images/HomeIcon1.svg"
import HomeIcon2 from "../assets/images/HomeIcon2.svg"
import HomeIcon3 from "../assets/images/HomeIcon3.svg"
import HomeIcon4 from "../assets/images/HomeIcon4.svg"
import HomeIcon5 from "../assets/images/HomeIcon5.svg"
import HomeIcon6 from "../assets/images/HomeIcon6.svg"
import BellIcon from "react-native-vector-icons/FontAwesome"
import HamburgerLogo from "../assets/images/HamburgerLogo.svg"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {

    const [hotelData, setHotelData] = useState(null)

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


    const fetchHotelData = useCallback(async () => {
        try {
            const value = await AsyncStorage.getItem('hotelmgmt');
            if (value) {
                let updatedValue = JSON.parse(value);
                setHotelData(prevState => {
                    // Only update state if the data is different
                    if (JSON.stringify(prevState) !== JSON.stringify(updatedValue)) {
                        return updatedValue;
                    } else {
                        return prevState;
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching hotel data:', error);
        }
    }, []);

    useEffect(() => {
        fetchHotelData();
    }, [fetchHotelData]);

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>
                <View style={{ flex: 1 }}>
                    <HamburgerLogo />
                </View>
                <View style={{ flex: 6 }}>
                    <Text style={[styles.lableText, { fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}> {hotelData ? hotelData.HotelName : "Loading..."}</Text>
                    <Text style={[styles.lableText, { fontSize: 12, fontWeight: "300", color: "#fff", width: "auto", marginTop: 5 }]}>+91  {hotelData ? hotelData.Contact : "Loading..."}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                    <BellIcon name="bell" size={22} color="#fff" />
                </View>
            </View>

            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={styles.inputContainer}>
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
                {/* <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("AddGuestInReport")}>
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
                        <Text style={styles.text}>प्रस्तुत रिपोर्ट</Text>
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
                        <Text style={styles.text}>लंबित रिपोर्ट</Text>
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
                        <Text style={styles.text}>कल कोई चेक इन नहीं हुआ</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <PlusIcon name="plus" size={22} color="#484C52" style={{ marginLeft: 15 }} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>


    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    input: {
        flexDirection: "row",
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 15,
        color: "#000",
        height: 60,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    inputContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: "#000",
        fontWeight: "400"
    }
});






