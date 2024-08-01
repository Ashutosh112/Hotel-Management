import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import Spinner from './Spinner';
import { ScaledSheet, moderateScale, scale, verticalScale } from 'react-native-size-matters';

const SubmittedReportDetails = ({ navigation, route }) => {

    const checkInD = route.params.checkInD;
    const checkOutD = route.params.checkOutD;

    useEffect(() => {
        submittedReportApi();
    }, []);

    const [guestData, setGuestData] = useState([]);
    const [commonData, setCommonData] = useState({})
    const [hotelName, setHotelName] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const submittedReportApi = async () => {
        setIsLoading(true)
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        setHotelName(updatedValue.HotelName)
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}SubmitedGuestDetailForReport?HotelId=${updatedValue.idHotelMaster}&fromDate=${checkInD}&toDate=${checkInD}`, {}, config)
            .then((res) => {
                setIsLoading(false)
                setGuestData(res.data.Result);
                setCommonData(res.data.Result[0])
            })
            .catch(err => {
                setIsLoading(false)
            });
    };


    return (
        <ScrollView style={styles.container}>
            <Spinner isLoading={isLoading} />
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                </TouchableOpacity>
                <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>अतिथि की जानकारी रिपोर्ट</Text>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={{ paddingVertical: 10, elevation: 1, backgroundColor: "white", borderRadius: 10, marginHorizontal: 15, marginTop: 20, borderWidth: 1, borderColor: "#1b5372", paddingHorizontal: 15 }}>
                <View style={{ justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 12, color: "#000" }}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>होटल का नाम :</Text> {hotelName}</Text>
                </View>
                <View style={{ justifyContent: "space-between", marginTop: 8 }}>
                    <Text style={{ fontSize: 12, color: "#000" }}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>सबमिट की तारीख :</Text> {checkInD}</Text>
                </View>
                <View style={{ justifyContent: "space-between", marginTop: 8 }}>
                    <Text style={{ fontSize: 12, color: "#000" }}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>वारा प्रस्तुत रिपोर्ट :</Text> {commonData.SubmitBy} ({moment(commonData.CreatedDate).format("DD-MMM-YYYY LT")})</Text>
                </View>
                <View style={{ justifyContent: "space-between", marginTop: 8 }}>
                    <Text style={{ fontSize: 12, color: "#000" }}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>कुल व्यक्ति संख्या :</Text> {guestData.length}</Text>
                </View>
            </View>

            {guestData.map((item, index) => (
                <View key={index} style={styles.guestContainer}>
                    <View style={styles.guestHeader}>
                        <Text style={styles.guestHeaderText}>अतिथि क्र.{index + 1}</Text>
                    </View>
                    <View style={styles.guestContentImage}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={{ uri: "data:image/jpeg;base64," + item.Image1 }} style={styles.image} resizeMode="contain" />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={{ uri: "data:image/jpeg;base64," + item.Image2 }} style={styles.image} resizeMode="contain" />
                        </View>
                    </View>
                    <View style={styles.guestContent}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={[styles.text2, { textTransform: "capitalize" }]}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>नाम :</Text> {item.GuestName} {item.GuestLastName}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>जेंडर :</Text> {item.gender}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>मोबाइल नंबर :</Text> {item.ContactNo}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>पता :</Text> {item.Address}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.text2}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>यात्रा का उद्देश्य :</Text> {item.TravelReson}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>आईडी प्रकार :</Text> {item.IdentificationType}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 12, color: "#8E8E8E" }}>आईडी नंबर :</Text> {item.IdentificationNo}</Text>
                            <Text style={styles.text2}></Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default SubmittedReportDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F8",
        flex: 1,
    },
    guestContainer: {
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 15,
        // height: Dimensions.get("window").height / 2 - 100,
        borderRadius: 10,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 15
    },
    guestHeader: {
        height: 40,
        backgroundColor: "#1b5372",
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
    },
    guestHeaderText: {
        fontSize: 14,
        color: "#fff",
        marginHorizontal: 10,
        fontWeight: "500"
    },
    guestContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    guestContentImage: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    image: {
        height: verticalScale(120),
        width: scale(120),
    },
    text: {
        fontSize: 12,
        fontWeight: "500",
        color: "#000",
        marginTop: 5,
        marginHorizontal: 10
    },
    text2: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000",
        marginTop: 5,
        marginHorizontal: 10

    },
    detailButton: {
        borderWidth: 0.5,
        borderColor: "#024063",
        backgroundColor: "#024063",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    detailButtonText: {
        fontSize: 12,
        color: "#fff",
        paddingVertical: 7
    },
    lableText: {
        fontSize: 12,
        color: "#000",
        marginLeft: 0,
        width: "45%",
        marginTop: 10
    },

});

