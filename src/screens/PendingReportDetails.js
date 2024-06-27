// import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
// import React from 'react'
// import BackIcon from "react-native-vector-icons/Ionicons"

// const PendingReportDetails = ({ navigation }) => {
//     return (
//         <ScrollView >
//             <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "flex-start" }}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
//                 </TouchableOpacity>
//                 <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>Report Detail</Text>
//             </View>
//             <View style={{ padding: 15 }}>

//                 <View >
//                     <View style={{ backgroundColor: '#1AA7FF', borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
//                         <Text style={{ color: "white" }}>चेक इन तारीख : 24-05-2024</Text>
//                         <Text style={{ color: "white" }}>कुल व्यक्ति संख्या : 2</Text>

//                     </View>
//                     <View style={{ backgroundColor: '#1AA7FF', padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
//                         <Text style={{ color: "white" }}>चेक आउट तारीख : 24-05-2024</Text>
//                         <Text style={{ color: "white" }}>रिपोर्ट सबमिट: नहीं</Text>
//                     </View>
//                     <View style={{ backgroundColor: "#fff", padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
//                         <View>
//                             <Text style={{ color: "black", fontSize: 12 }}>नाम: Aman Gupta</Text>
//                             <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>जेंडर: Male</Text>
//                             <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>मोबाइल नंबर: 8871369705</Text>
//                             <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>पता: ujjain</Text>
//                             <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>शहर: ujjain</Text>
//                             <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>पिन: 456001</Text>
//                             <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>आईडी प्रकार: ???? ?????</Text>
//                         </View>
//                         <View style={{ alignItems: "center" }}>
//                             <Text style={{ color: "black", fontSize: 12 }}>आईडी का Front:</Text>
//                             <Image source={require('../assets/images/pendingReport.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff", marginTop: 5 }} />

//                             <Text style={{ color: "black", fontSize: 12, marginTop: 20 }}>आईडी का Back:</Text>
//                             <Image source={require('../assets/images/pendingReport.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff", marginTop: 5 }} />
//                         </View>
//                     </View>
//                 </View>
//                 <View style={{ marginTop: 15 }}>
//                     <View style={{ backgroundColor: '#bfbfbf', borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
//                         <Text style={{ color: "white" }}>अतिरिक्त अतिथि 1</Text>
//                     </View>

//                     <View style={{ backgroundColor: "#fff", padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
//                         <View>
//                             <Text style={{ color: "black", fontSize: 12 }}>नाम: Dheeraj Kumar</Text>
//                             <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>जेंडर: Male</Text>
//                             <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>आईडी प्रकार: ???? ?????</Text>
//                             <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>आईडी नंबर: 548574562</Text>

//                         </View>
//                         <View style={{ alignItems: "center" }}>
//                             <Text style={{ color: "black", fontSize: 12 }}>आईडी का Front:</Text>
//                             <Image source={require('../assets/images/pendingReport.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff", marginTop: 5 }} />

//                             <Text style={{ color: "black", fontSize: 12, marginTop: 20 }}>आईडी का Back:</Text>
//                             <Image source={require('../assets/images/pendingReport.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff", marginTop: 5 }} />
//                         </View>
//                     </View>
//                 </View>
//             </View>

//         </ScrollView>
//     )
// }

// export default PendingReportDetails

// const styles = StyleSheet.create({})



import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Pressable } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import Spinner from './Spinner';

const PendingReportDetails = ({ navigation, route }) => {

    const SubmitDate = route.params.SubmitDate;

    useEffect(() => {
        searchGuest();
    }, []);

    const [guestData, setGuestData] = useState([]);
    const [commonData, setCommonData] = useState({})
    const [isLoading, setIsLoading] = useState(false);


    const searchGuest = async () => {
        setIsLoading(true)
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        setCommonData(updatedValue)
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}GuestPandingDetailForReport?HotelId=${updatedValue.idHotelMaster}&fromDate=${SubmitDate}&toDate=${SubmitDate}`, {}, config)
            .then((res) => {
                setIsLoading(false)
                setGuestData(res.data.Result);
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
            <View style={{ height: 90, elevation: 1, backgroundColor: "white", borderRadius: 10, marginHorizontal: 20, marginTop: 20, borderWidth: 1, borderColor: "#1b5372", padding: 10, paddingHorizontal: 20, justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 12, color: "#000" }}>होटल का नाम : {commonData.HotelName}</Text>
                    <Text style={{ fontSize: 12, color: "#000" }}>कुल व्यक्ति संख्या  : {guestData.length}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 12, color: "#000" }}>चेक इन तारीख : {SubmitDate}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    {/* <Text style={{ fontSize: 12, color: "#000" }}>चेक आउट तारीख : {commonData.CheckOutDate}</Text> */}
                    <Text style={{ fontSize: 12, color: "#000" }}>रिपोर्ट सबमिट : {commonData.isSubmitted == true ? "हाँ" : "रिपोर्ट सबमिट नहीं की गई है।"}</Text>


                </View>
            </View>

            {guestData.map((item, index) => (
                <View key={index} style={styles.guestContainer}>
                    <View style={styles.guestHeader}>
                        <Text style={styles.guestHeaderText}>Guest {index + 1}</Text>
                    </View>
                    <View style={styles.guestContent}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require("../assets/images/aadhar_card_front.jpg")} style={styles.image} resizeMode="contain" />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require("../assets/images/aadhar_back.jpeg")} style={styles.image} resizeMode="contain" />
                        </View>
                    </View>
                    <View style={styles.guestContent}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={[styles.text, { textTransform: "capitalize" }]}>नाम : {item.GuestName} {item.GuestLastName}</Text>
                            <Text style={styles.text2}>जेंडर : {item.gender}</Text>
                            <Text style={styles.text2}>मोबाइल नंबर	 : {item.ContactNo}</Text>
                            <Text style={styles.text2}>पता : {item.Address}</Text>
                            <Text style={styles.text2}></Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.text2}>यात्रा का उद्देश्य : {item.TravelReson}</Text>
                            <Text style={styles.text2}>आईडी प्रकार	 : {item.IdentificationType}</Text>
                            <Text style={styles.text2}>आईडी नंबर	 : {item.IdentificationNo}</Text>
                            <Text style={styles.text2}></Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", marginBottom: 10, marginHorizontal: 30 }}>
                        <Pressable style={{ justifyContent: "center", alignItems: "flex-end", borderRadius: 4, borderColor: "lightgrey", backgroundColor: "lightgrey", borderWidth: 1.5 }} >
                            <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "400", color: "#fff", paddingHorizontal: 25, paddingVertical: 10 }}>Edit</Text>
                        </Pressable>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default PendingReportDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F8",
        flex: 1,
    },
    guestContainer: {
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 20,
        // height: Dimensions.get("window").height / 2,
        borderRadius: 10,
        elevation: 2,
        // justifyContent: "center",
        // alignItems: "center",
        marginBottom: 10,
        marginTop: 10
    },
    guestHeader: {
        height: 40,
        backgroundColor: "#1b5372",
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center"
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
    image: {
        height: 100,
        width: 150,
        // marginHorizontal: 5,
        borderRadius: 12,
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
        fontWeight: "500",
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

