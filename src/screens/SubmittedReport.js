import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, ScrollView, Image, Modal, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import BackIcon from "react-native-vector-icons/Ionicons";
import InfoIcon from "react-native-vector-icons/Feather";
import { baseUrl } from '../utils/env';
import moment from 'moment';
import Logo from "../assets/images/submittedReport.png";

const SubmittedReport = ({ navigation }) => {
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const submittedReportApi = async () => {
        setLoading(true);
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}AllSubmitedGuestByHotelId?HotelId=${updatedValue.idHotelMaster}&fromDate=${moment(checkinDate).format("DD/MMM/YYYY")}&toDate=${moment(checkoutDate).format("DD/MMM/YYYY")}`, {}, config)
            .then((res) => {
                setData(res.data.Result);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (checkinDate && checkoutDate) {
            submittedReportApi();
        }
    }, [checkinDate, checkoutDate]);


    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                    <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>सब्मीटेड रिपोर्ट</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => setOpenModal(true)}>
                        <InfoIcon name="info" size={24} color="#fff" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <Text style={styles.lableText}>दिनांक से*</Text>
                    <Text style={styles.lableText}>दिनांक तक*</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <DatePicker
                        modal
                        mode='date'
                        open={open}
                        date={checkinDate || new Date()}
                        onConfirm={(date) => {
                            setOpen(false);
                            setCheckinDate(date);
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                    <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 8, width: "45%" }]} onPress={() => setOpen(true)}>
                        <Text>{checkinDate ? moment(checkinDate).format("DD/MMM/YYYY") : "दिनांक से*"}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        mode='date'
                        open={open2}
                        date={checkoutDate || new Date()}
                        onConfirm={(date) => {
                            setOpen2(false);
                            setCheckoutDate(date);
                        }}
                        onCancel={() => {
                            setOpen2(false);
                        }}
                    />
                    <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 8, width: "45%" }]} onPress={() => setOpen2(true)}>
                        <Text>{checkoutDate ? moment(checkoutDate).format("DD/MMM/YYYY") : "दिनांक तक*"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {!checkinDate || !checkoutDate ? (
                <Text style={styles.noDataText}>डेटा देखने के लिए दिनांक चुनें</Text>
            ) : loading ? (

                <Text style={styles.noDataText}>Loading...</Text>
            ) : data.length === 0 ? (
                <Text style={styles.noDataText}>कोई डेटा नहीं!</Text>
            ) : (
                data.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <View style={{ flex: 0.8 }}>
                            <Image source={Logo} style={{ height: 45, width: 45 }} resizeMode="contain" />
                        </View>
                        <View style={{ flex: 3 }}>
                            <View style={{ flex: 2, justifyContent: "center" }}>
                                <Text style={styles.text}>सबमिट की तारीख : {item.SubmitDate}</Text>
                                <Text style={styles.text}>कुल अतिथि : {item.AddionalGuest}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("SubmittedReportDetails", { checkInD: item.SubmitDate, checkOutD: item.SubmitDate })} style={styles.detailButton}>
                            <Text style={{ fontSize: 12, color: "#fff", paddingVertical: 7 }}>Detail</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}
            <Modal transparent={true} animationType={'fade'} hardwareAccelerated={true} visible={openModal}>
                <Pressable style={styles.modalOverlay} onPress={() => setOpenModal(false)}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.modalText}>पुलिस स्टेशन में सबमिट की गई रिपोर्ट.</Text>
                            <Text style={styles.modalText}>|| कृपया ध्यान दें ||</Text>
                            <Text style={styles.modalText}>इस पोर्टल पर आप एक महीने तक की पुरानी रिपोर्ट देख सकते हैं। अपने रिकॉर्ड के लिए आप समय-समय पर रिपोर्ट डाउनलोड कर के रख सकते हैं।</Text>
                            <Pressable style={styles.modalButton} onPress={() => setOpenModal(false)}>
                                <Text style={styles.textStyle}>ठीक</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </ScrollView>
    );
};

export default SubmittedReport;

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
        marginBottom: 20
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
    modalView: {
        height: Dimensions.get("window").height / 2.6,
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
    itemContainer: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
        paddingHorizontal: 15,
        marginHorizontal: 20,
        height: 100,
        borderRadius: 10,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    detailButton: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: "#024063",
        backgroundColor: "#024063",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 100,
        fontSize: 16,
        color: '#36454F',
        fontWeight: "400"
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000060'
    },
    modalButton: {
        backgroundColor: "#024063",
        paddingHorizontal: 40,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10
    },
});
