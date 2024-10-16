import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Modal, Pressable } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import Alert from "react-native-vector-icons/Ionicons";
import Spinner from './Spinner';
import moment from 'moment';

const ReportSubmitScreen = ({ navigation, route }) => {

    const SubmitDate = route.params.SubmitDate;

    useEffect(() => {
        validateDateApi();
    }, []);

    const [guestData, setGuestData] = useState("");
    const [commonData, setCommonData] = useState("");
    const [openModal, setOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    // Validation schema for Formik
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('रिपोर्ट बनाने वाले का नाम आवश्यक है*')
    });

    const validateDateApi = async () => {
        setIsLoading(true)
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        console.log("token>>>", updatedValue.Token)
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}ValidateSubmitDate?HotelId=${updatedValue.idHotelMaster}&SubmitDate=${moment(SubmitDate, "DD MMM YYYY").format("MM/DD/YYYY")}`, {}, config)
            .then((res) => {
                setIsLoading(false)
                setGuestData(res.data.Message);
                setCommonData(res.data.Result);
            })
            .catch(err => {
                setIsLoading(false)
            });
    };


    const submitReportApi = async (name) => {
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

        await axios.post(`${baseUrl}SubmitGuestData?HotelId=${updatedValue.idHotelMaster}&SubmitDate=${moment(SubmitDate, "DD MMM YYYY").format("MM/DD/YYYY")}&SubmitBy=${name}`, {}, config)
            .then((res) => {
                setIsLoading(false)
                setOpenModal(false)
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Report Submitted Successfully!',
                    autoHide: true,
                    visibilityTime: 1500,
                });
                setTimeout(() => {
                    navigation.navigate("PendingReport");
                }, 1500);
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
                    <BackIcon name="arrow-back-outline" size={20} color="#fff" style={{ marginLeft: 15 }} />
                </TouchableOpacity>
                <Text style={[styles.lableText, { marginLeft: 10, fontSize: 14, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>रिपोर्ट सबमिट करें</Text>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <Text style={{ fontSize: 12, color: "#000", textAlign: "center" }}>चेक इन रिपोर्ट पुलिस स्टेशन को सबमिट करें</Text>
            </View>
            <Formik
                initialValues={{ name: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    submitReportApi(values.name)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        {commonData == 0 ?
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                <TextInput
                                    placeholderTextColor='darkgrey'
                                    placeholder='रिपोर्ट बनाने वाले का नाम*'
                                    style={[styles.input, { backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center" }]}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                {touched.name && errors.name &&
                                    <Text style={{ color: 'red', marginTop: 5 }}>{errors.name}</Text>
                                }
                            </View>
                            :
                            null
                        }
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <Text style={{ fontSize: 12, color: "#000", textAlign: "justify", marginHorizontal: 25, fontWeight: "bold" }}>{guestData} मैं प्रमाणित करता हूँ की इस रिपोर्ट में दी हुई जानकारी पूर्ण एवं सत्य है |</Text>
                        </View>

                        {/* Submit Button */}
                        {commonData == 0 ?
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => setOpenModal(true)}>
                                    <Text style={styles.button}>पुष्टि करे और सब्मिट करे</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} >
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("BottomNavigator")}>
                                    <Text style={styles.button}>ठीक है</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {/* Open modal for SUBMI REPORT start */}
                        <Modal transparent={true} animationType={'fade'} hardwareAccelerated={true} visible={openModal}>
                            <Pressable style={styles.modalOverlay} >
                                <View style={styles.modalView}>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Alert size={40} name="alert-circle-outline" color='#024063' />
                                    </View>

                                    <Text style={styles.modalText}>आप {SubmitDate} के लिए गेस्ट रिपोर्ट को सबमिट कर रहे है| एक बार रिपोर्ट सबमिट होने के बाद आप उसमे किसी भी तरह का चेंज नहीं कर सकते है और नहीं {SubmitDate} के लिए आप फिर से रिपोर्ट सबमिट कर पाएंगे |</Text>
                                    <Text style={[styles.modalText, { fontWeight: "bold" }]}>|| कृपया ध्यान दें ||</Text>
                                    <Text style={[styles.modalText, { textAlign: "justify" }]}>1. एक बार रिपोर्ट थाने में सबमिट करने के बाद उस तारीख के लिए आप कोई नए गेस्ट की एंट्री नहीं कर पाएंगे।</Text>
                                    <Text style={[styles.modalText, { textAlign: "justify" }]}>2. GuestReport.in होटलों द्वारा सबमिट की गई अतिथि जानकारी की सामग्री या सटीकता के लिए जिम्मेदार नहीं है। </Text>

                                    <View style={{ width: "100%", justifyContent: "space-around", flexDirection: "row" }}>
                                        <Pressable
                                            style={{ backgroundColor: "#024063", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginTop: 10 }}
                                            onPress={handleSubmit} >
                                            <Text style={styles.textStyle}>सब्मिट करे</Text>
                                        </Pressable>
                                        <Pressable
                                            style={{ backgroundColor: "#000", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginTop: 10 }}
                                            onPress={() => { setOpenModal(false) }} >
                                            <Text style={styles.textStyle}>रद्द</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Pressable>
                        </Modal>
                        {/* Open modal for SUBMI REPORT end */}
                    </>

                )}
            </Formik>
        </ScrollView >
    );
};

export default ReportSubmitScreen;


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F8",
        flex: 1,
    },
    guestContainer: {
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 20,
        height: Dimensions.get("window").height / 2 - 100,
        borderRadius: 10,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
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
        marginVertical: 20,
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
    input: {
        width: "90%",
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 12,
        paddingHorizontal: 20,
        color: "#000",
        height: 45,
        marginTop: 20,
        fontSize: 12
    },
    buttonContainer: {
        borderRadius: 12,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 45,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF',
    },
    button: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "500",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        // alignItems: "center",
        // justifyContent: "center"
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontSize: 12
    },
    modalText: {
        textAlign: "center",
        color: "black",
        fontSize: 12,
        marginVertical: 10
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000060'
    },

});

