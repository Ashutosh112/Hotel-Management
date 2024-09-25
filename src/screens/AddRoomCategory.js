import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Dimensions, Pressable, Modal, Alert, Linking } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Spinner from './Spinner';
import AlertIcon from "react-native-vector-icons/Ionicons";

const AddRoomCategory = ({ navigation, route }) => {
    const hotelCategory = route.params.hotelCategory;

    const [isLoading, setIsLoading] = useState(false);
    const [categoryDetails, CategoryDetails] = useState([])

    const addCategorie = async (values) => {
        setIsLoading(true)
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
            }
        };
        const body = {
            idHotelRoomCategory: 0,
            idHotel: hotelCategory,
            categoryName: values.category,
            iPrice: values.amount,
            noOfRoom: 1,
            bChecked: true
        };
        console.log("bodyyy", body)
        await axios.post(`${baseUrl}InsertCategory`, body, config)
            .then((res) => {
                setIsLoading(false)
                getCategory()
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: res.data.Message
                });

            })
            .catch(err => {
                setIsLoading(false)
                console.log("errrr", err.response)
            });
    };


    const getCategory = async () => {
        setIsLoading(true)

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
            }
        };
        await axios.post(`${baseUrl}HotelCategory?idHotel=${hotelCategory}`, {}, config)
            .then((res) => {
                setIsLoading(false)
                CategoryDetails(res.data.Result)

            })
            .catch(err => {
                setIsLoading(false)
                console.log("errr", err)
            });
    };

    return (
        <View style={styles.container}>
            <Spinner isLoading={isLoading} />
            <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
            <View style={styles.body}>
                <View style={styles.logoContainer2}>
                    <Text style={[styles.text2, { marginTop: 5, fontWeight: "500" }]}>Hotel Guest Reporting System</Text>
                    <Text style={styles.text2}>होटल की रूम कैटेगरी और रेट प्लान बनाए</Text>

                    <Text style={[styles.text2, { marginTop: 30, fontWeight: "500", fontSize: 14, color: "#000" }]}>|| कृपया ध्यान दें ||</Text>
                    <Text style={[styles.text2, { marginTop: 20, fontWeight: "500", fontSize: 14, color: "#000" }]}>एक बार रूम कैटेगरी और रेट डालने के बाद आप इसे अपडेट नहीं कर पाएंगे।</Text>

                    <Formik
                        initialValues={{ category: '', amount: '' }}
                        validationSchema={Yup.object().shape({
                            category: Yup.string().required('मोबाइल नंबर अनिवार्य है'),
                            amount: Yup.string().required('Amount अनिवार्य है')
                        })}
                        onSubmit={(values, { resetForm }) => {
                            addCategorie(values).then(() => {
                                resetForm(); // Reset the form values after successful submit
                            });
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.inputContainer}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 20 }}>
                                    <Text style={styles.lableText}>कमरे की श्रेणी</Text>
                                </View>
                                <TextInput
                                    placeholderTextColor='darkgrey'
                                    placeholder='कमरे की श्रेणी'
                                    style={[styles.input, { borderColor: touched.category && errors.category ? "#FF4545" : '#E3E2E2', marginTop: 5 }]}
                                    onChangeText={handleChange('category')}
                                    onBlur={handleBlur('category')}
                                    value={values.category}
                                />
                                {errors.category && touched.category && <Text style={styles.errorText}>{errors.category}</Text>}




                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                    <Text style={styles.lableText}>मूल्य</Text>
                                </View>
                                <TextInput
                                    placeholderTextColor='darkgrey'
                                    placeholder='मूल्य'
                                    style={[styles.input, { borderColor: touched.amount && errors.amount ? "#FF4545" : '#E3E2E2', marginTop: 5 }]}
                                    onChangeText={handleChange('amount')}
                                    onBlur={handleBlur('amount')}
                                    value={values.amount}
                                />
                                {errors.amount && touched.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

                                <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#01A65B' }]} onPress={handleSubmit}>
                                    <Text style={styles.button}>Add Room</Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: "row", justifyContent: "space-around", width: "85%", marginTop: 10 }}>
                                    <TouchableOpacity style={[styles.buttonContainer, styles.buttonEqual]} onPress={() => navigation.navigate("SubscriptionPlan", { hotelCategory: hotelCategory }, console.log("hotelCategory", hotelCategory))}>
                                        <Text style={styles.button}>Skip</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.buttonContainer, styles.buttonEqual, { backgroundColor: '#E3E2E2' }]} >
                                        <Text style={styles.button}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "90%", justifyContent: "center", paddingVertical: 10, elevation: 2, backgroundColor: "#F5F5F5", borderRadius: 10, paddingHorizontal: 15 }}>
                                    <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: 13, color: "#000", textAlign: "center", fontWeight: "500" }}>S. No. </Text>
                                        <Text style={{ fontSize: 13, color: "#000", textAlign: "center", fontWeight: "500" }}>कमरे की श्रेणी </Text>
                                        <Text style={{ fontSize: 13, color: "#000", textAlign: "center", fontWeight: "500" }}>मूल्य </Text>
                                    </View>
                                    {categoryDetails.length < 1 ?
                                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", color: "grey" }}>No Record</Text>
                                        </View>
                                        : categoryDetails.map((item, index) => (
                                            <View key={index} style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                                <Text style={{ fontSize: 12, color: "#000", textAlign: "center" }}> {index + 1}</Text>
                                                <Text style={{ fontSize: 12, color: "#000", textAlign: "center", textTransform: "capitalize" }}>{item.CategoryName}</Text>
                                                <Text style={{ fontSize: 12, color: "#000", textAlign: "center" }}> ₹{item.iPrice}</Text>
                                            </View>
                                        ))}
                                </View>

                            </View>
                        )}
                    </Formik>
                </View>
            </View>

        </View>
    );
}

export default AddRoomCategory;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 28,
        marginTop: 10
    },
    text2: {
        color: "#024063",
        fontSize: 18,
    },
    logoContainer1: {
        flex: 1,
        justifyContent: "center",
    },
    logoContainer2: {
        flex: 3,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 60
    },
    logoContainer4: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    lableText: {
        fontSize: 12,
        color: "#000",
        marginLeft: 0,
        width: "45%",
        marginTop: 10
    },
    input: {
        width: Dimensions.get('window').width - 60,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 15,
        paddingHorizontal: 20,
        color: "#000",
        height: 50,
    },
    inputContainer: {
        width: Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        borderRadius: 15,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF'
    },
    button: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "500"
    },
    buttonEqual: {
        flex: 1, // makes buttons take equal space in row
        marginHorizontal: 5, // adds some space between buttons
        height: 50, // ensures equal height
    },
    greyText: {
        marginTop: 15,
        fontSize: 14,
        color: '#1AA7FF',
        fontWeight: "bold"
    },
    otpContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    otpBox: {
        borderColor: "#B5B5B5",
        borderWidth: 0.8,
        width: 45,
        height: 40,
        marginHorizontal: 2,
        borderRadius: 10,
    },
    otpText: {
        fontSize: 20,
        color: "black",
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    content: {
        fontSize: 14,
        marginHorizontal: 20,
        color: "#000",
    },
    modalbgforsuggestbtn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000888"
    },
    modalforsuggestbtn: {
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width - 50,
        backgroundColor: "#fff",
        borderRadius: 15,
        minHeight: 330,
    },
    modalheader: {
        flexDirection: "row",
        backgroundColor: '#1AA7FF',
        padding: 15,
        justifyContent: "center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: "center",
    },
    nextButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF',
        marginHorizontal: 30,
        padding: 10,
        borderRadius: 15,
        paddingVertical: 10,
    },
    closeButton: {
        height: 40,
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 30,
        margin: 20,
    },
    errorText: {
        color: "#FF4545",
        marginTop: 5,
        width: "100%",
        marginLeft: 70,
        fontSize: 12
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
    textStyle: {
        color: "white",
        textAlign: "center",
    },
    modalText: {
        textAlign: "center",
        color: "black",
        fontSize: 15,
    },
});
