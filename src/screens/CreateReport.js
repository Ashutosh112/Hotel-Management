import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhotoIcon from "../assets/images/photologoicon.png";
import BackIcon from "react-native-vector-icons/Ionicons";
import CalendorIcon from "../assets/images/CalenderIcon.png";
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
    checkinDate: Yup.date().required('चेक इन तारीख अनिवार्य'),
    checkoutDate: Yup.date().required('चेक आउट तारीख अनिवार्य'),
    guestCount: Yup.number().required('गेस्ट की कुल संख्या अनिवार्य').positive().integer(),
    firstName: Yup.string().required('प्रथम नाम अनिवार्य'),
    lastName: Yup.string().required('अंतिम नाम अनिवार्य'),
    gender: Yup.string().required('जेंडर अनिवार्य'),
    mobileNumber: Yup.string().required('मोबाइल नंबर अनिवार्य').matches(/^[0-9]{10}$/, 'मोबाइल नंबर 10 अंकों का होना चाहिए'),
    travelReason: Yup.string().required('यात्रा का उद्देश्य अनिवार्य'),
    address: Yup.string().required('पता अनिवार्य'),
    city: Yup.string().required('शहर अनिवार्य'),
    pin: Yup.string().required('पिन अनिवार्य').matches(/^[0-9]{6}$/, 'पिन 6 अंकों का होना चाहिए'),
    idType: Yup.string().required('आईडी प्रकार अनिवार्य'),
    idNumber: Yup.string().required('आईडी नंबर अनिवार्य'),
    idFront: Yup.array().min(1, 'आईडी का Front अनिवार्य'),
    idBack: Yup.array().min(1, 'आईडी का Back अनिवार्य'),
    // Validation for additional guests
    guestFirstName1: Yup.string().when('guestCount', {
        is: val => val > 1,
        then: Yup.string().required('Required')
    }),
    guestLastName1: Yup.string().when('guestCount', {
        is: val => val > 1,
        then: Yup.string().required('Required')
    }),
    guestGender1: Yup.string().when('guestCount', {
        is: val => val > 1,
        then: Yup.string().required('Required')
    }),
    guestIdType1: Yup.string().when('guestCount', {
        is: val => val > 1,
        then: Yup.string().required('Required')
    }),
    guestIdNumber1: Yup.string().when('guestCount', {
        is: val => val > 1,
        then: Yup.string().required('Required')
    })
});

const CreateReport = ({ navigation }) => {
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [travelReason, setTravelReason] = useState(null);
    const [selectgender, setSelectgender] = useState(null);
    const [guestCount, setGuestCount] = useState(1); // Default to 1
    const [hotelData, setHotelData] = useState(null);

    const travelReasonData = [
        { label: 'Darshan', value: 'Darshan' },
        { label: 'Business', value: 'Business' },
        { label: 'Normal Visit', value: 'Normal Visit' },
        { label: 'Appointment', value: 'Appointment' },
        { label: 'Meeting', value: 'Meeting' },
        { label: 'Guest', value: 'Guest' },
    ];

    const genderData = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' },
    ];

    const totalNoofGuest = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
    ];

    const selectIdFrontFile = async (setFieldValue) => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false,
            });
            setFieldValue('idFront', doc);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the file selection');
            } else {
                console.log(err);
            }
        }
    };

    const selectIdBackFile = async (setFieldValue) => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false,
            });
            setFieldValue('idBack', doc);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the file selection');
            } else {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const value = await AsyncStorage.getItem('hotelmgmt');
                if (value !== null) {
                    let updatedValue = JSON.parse(value);
                    setHotelData(updatedValue);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchHotelData();
    }, []); // Empty dependency array to run only once

    // const sendFormData = async (values) => {

    //     const config = {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Content-type": "application/json"
    //         }
    //     };

    //     // Collect additional guest details dynamically
    //     let details = [];
    //     for (let i = 1; i < values.guestCount; i++) {
    //         // Assuming you have an array of image data for each guest
    //         let image1 = values[`guestImage1${i}`]; // Replace with your actual field name for guest image 1
    //         let image2 = values[`guestImage2${i}`]; // Replace with your actual field name for guest image 2

    //         // Base64 encode the images if needed
    //         // For example, if image1 is a file, you can encode it like this:
    //         // const image1Base64 = await convertImageToBase64(image1);

    //         details.push({
    //             idGuest: 0,
    //             sName: values[`guestFirstName${i}`],
    //             identificationNo: values[`guestIdNumber${i}`],
    //             identificationType: values[`guestIdType${i}`],
    //             image: image1, // Replace with actual image data
    //             gender: values[`guestGender${i}`],
    //             filePass: null,
    //             lastName: values[`guestLastName${i}`],
    //             image2: image2 // Replace with actual image data
    //         });
    //     }


    //     let body = {
    //         idGuestMaster: 0,
    //         idHotel: hotelData?.idHotelMaster,
    //         contactNo: values.mobileNumber,
    //         checkInDate: values.checkinDate,
    //         checkOutDate: values.checkoutDate,
    //         description: "None",
    //         bActive: true,
    //         guestName: values.firstName + values.lastName,
    //         identificationNo: values.idNumber,
    //         identificationType: values.idType,
    //         address: values.address,
    //         isDeleted: false,
    //         details: details,
    //         addionalGuest: values.guestCount - 1,
    //         hotelName: hotelData?.HotelName,
    //         guestLastName: "patil",
    //         gender: values.gender,
    //         travelReson: values.travelReason,
    //         city: values.city,
    //         pIncode: values.pin,
    //         filePass: "7d465d03",
    //         image1: "82110f8a-a1df-49c3-be32-ca9f78bb02f3_WhatsApp Image 2024-03-10 at 15.52.08_bd3315ca.jpg",
    //         image2: "565cb8c4-cbf4-47fc-81ee-7483a2c84b6d_WhatsApp Image 2024-03-10 at 15.52.06_48034e3c.jpg"
    //     };
    //     console.log("BODYYYYYY---", body);
    //     await axios.post(`${baseUrl}InsertUpdateDeleteGuestMaster`, body, config)
    //         .then((res) => {
    //             console.log("rsssss", res.data);
    //             Toast.show({
    //                 type: 'success',
    //                 text1: 'Success',
    //                 text2: res.data.Message
    //             });
    //         })
    //         .catch(err => {
    //             console.log("errr", err);
    //         });
    // };


    const sendFormData = (values) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };

        // Collect additional guest details dynamically
        let details = [];
        for (let i = 1; i <= values.guestCount; i++) {
            let image1Base64 = ""; // Placeholder for base64 encoded image 1
            let image2Base64 = ""; // Placeholder for base64 encoded image 2

            // Check if guestImage1 and guestImage2 exist in values
            if (values[`guestImage1${i}`]) {
                // Assuming values[`guestImage1${i}`] contains the base64 encoded string
                image1Base64 = values[`guestImage1${i}`];
            }

            if (values[`guestImage2${i}`]) {
                // Assuming values[`guestImage2${i}`] contains the base64 encoded string
                image2Base64 = values[`guestImage2${i}`];
            }

            details.push({
                idGuest: 0,
                sName: values[`guestFirstName${i}`],
                identificationNo: values[`guestIdNumber${i}`],
                identificationType: values[`guestIdType${i}`],
                image: image1Base64, // Assign base64 encoded image 1
                gender: values[`guestGender${i}`],
                filePass: null,
                lastName: values[`guestLastName${i}`],
                image2: image2Base64 // Assign base64 encoded image 2
            });
        }

        // Prepare the request body
        let body = {
            idGuestMaster: 0,
            idHotel: hotelData?.idHotelMaster,
            contactNo: values.mobileNumber,
            checkInDate: values.checkinDate,
            checkOutDate: values.checkoutDate,
            description: "None",
            bActive: true,
            guestName: values.firstName + values.lastName,
            identificationNo: values.idNumber,
            identificationType: values.idType,
            address: values.address,
            isDeleted: false,
            details: details,
            addionalGuest: values.guestCount - 1,
            hotelName: hotelData?.HotelName,
            guestLastName: "patil",
            gender: values.gender,
            travelReson: values.travelReason,
            city: values.city,
            pIncode: values.pin,
            filePass: "7d465d03", // Example filePass value
            image1: values.image1, // Replace with actual image 1 filename or identifier
            image2: values.image2 // Replace with actual image 2 filename or identifier
        };

        console.log("Request Body:", body);

        // Make the API call using Axios
        axios.post(`${baseUrl}InsertUpdateDeleteGuestMaster`, body, config)
            .then(response => {
                // Handle response
                console.log("Response:", response.data);
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response.data.Message
                });
            })
            .catch(error => {
                console.error('Error sending form data:', error);
                // Handle error, show error message or log
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to send form data'
                });
            });
    };


    return (
        <Formik
            initialValues={{
                checkinDate: '',
                checkoutDate: '',
                guestCount: '',
                firstName: '',
                lastName: '',
                gender: '',
                mobileNumber: '',
                travelReason: '',
                address: '',
                city: '',
                pin: '',
                idType: '',
                idNumber: '',
                idFront: [],
                idBack: [],
                // Initial values for additional guests
                guestFirstName1: '',
                guestLastName1: '',
                guestGender1: '',
                guestIdType1: '',
                guestIdNumber1: '',
                // Add more fields as needed
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                console.log("VALUES", values);
                sendFormData(values, hotelData);
            }} >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                <ScrollView style={styles.container}>
                    <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "flex-start" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                        </TouchableOpacity>
                        <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>प्राथमिक अतिथि की जानकारी</Text>
                    </View>
                    <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
                    <View style={styles.inputContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            <Text style={styles.lableText}>प्रथम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            <Text style={styles.lableText}>अंतिम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='प्रथम नाम*'
                                style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />
                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='अंतिम नाम*'
                                style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            {touched.firstName && errors.firstName ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.firstName}</Text> : null}
                            {touched.lastName && errors.lastName ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.lastName}</Text> : null}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>चेक इन तारीख<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            <Text style={styles.lableText}>चेक आउट तारीख<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
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
                                    setFieldValue('checkinDate', date);
                                }}
                                onCancel={() => {
                                    setOpen(false);
                                }} />
                            <TouchableOpacity style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "space-between", marginTop: 8, flexDirection: "row", alignItems: "center", paddingHorizontal: 15, }]}
                                onPress={() => setOpen(true)}>
                                <Text>{checkinDate ? checkinDate.toLocaleDateString() : "चेक इन तारीख*"}</Text>
                                <Image source={CalendorIcon} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode='date'
                                open={open2}
                                date={checkoutDate || new Date()}
                                onConfirm={(date) => {
                                    setOpen2(false);
                                    setCheckoutDate(date);
                                    setFieldValue('checkoutDate', date);
                                }}
                                onCancel={() => {
                                    setOpen2(false);
                                }} />
                            <TouchableOpacity style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "space-between", marginTop: 8, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }]}
                                onPress={() => setOpen2(true)}>
                                <Text>{checkoutDate ? checkoutDate.toLocaleDateString() : "चेक आउट तारीख*"}</Text>
                                <Image source={CalendorIcon} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            {touched.checkinDate && errors.checkinDate ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.checkinDate}</Text> : null}
                            {touched.checkoutDate && errors.checkoutDate ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.checkoutDate}</Text> : null}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>मोबाइल नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <TextInput
                            maxLength={10}
                            keyboardType='number-pad'
                            placeholderTextColor='darkgrey'
                            placeholder='मोबाइल नंबर*'
                            style={[styles.input, { marginTop: 8 }]}
                            onChangeText={handleChange('mobileNumber')}
                            onBlur={handleBlur('mobileNumber')}
                            value={values.mobileNumber} />
                        {touched.mobileNumber && errors.mobileNumber ? <Text style={styles.errorText}>{errors.mobileNumber}</Text> : null}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>जेंडर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            <Text style={styles.lableText}>गेस्ट की कुल संख्या<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            <Dropdown
                                style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={genderData}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="जेंडर*"
                                value={selectgender}
                                onChange={item => {
                                    setSelectgender(item.value);
                                    setFieldValue('gender', item.value);
                                }} />
                            <Dropdown
                                style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={totalNoofGuest}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='कुल गेस्ट संख्या*'
                                value={guestCount}
                                onChange={item => {
                                    setGuestCount(item.value);
                                    setFieldValue('guestCount', item.value);
                                }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            {touched.gender && errors.gender ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.gender}</Text> : null}
                            {touched.guestCount && errors.guestCount ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.guestCount}</Text> : null}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>यात्रा का उद्देश्य<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <Dropdown
                            style={[styles.input, { marginTop: 8 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={travelReasonData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="यात्रा का उद्देश्य*"
                            value={travelReason}
                            onChange={item => {
                                setTravelReason(item.value);
                                setFieldValue('travelReason', item.value);
                            }} />
                        {touched.travelReason && errors.travelReason ? <Text style={styles.errorText}>{errors.travelReason}</Text> : null}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>पता<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='पता*'
                            style={[styles.input, { marginTop: 8 }]}
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address} />
                        {touched.address && errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>शहर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='शहर*'
                            style={[styles.input, { marginTop: 8 }]}
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={values.city}
                        />
                        {touched.city && errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>पिन<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='पिन*'
                            style={[styles.input, { marginTop: 8 }]}
                            onChangeText={handleChange('pin')}
                            onBlur={handleBlur('pin')}
                            value={values.pin}
                            keyboardType='number-pad'
                        />
                        {touched.pin && errors.pin ? <Text style={styles.errorText}>{errors.pin}</Text> : null}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='आईडी प्रकार*'
                            style={[styles.input, { marginTop: 8 }]}
                            onChangeText={handleChange('idType')}
                            onBlur={handleBlur('idType')}
                            value={values.idType} />
                        {touched.idType && errors.idType ? <Text style={styles.errorText}>{errors.idType}</Text> : null}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>आईडी नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='आईडी नंबर*'
                            style={[styles.input, { marginTop: 8 }]}
                            onChangeText={handleChange('idNumber')}
                            onBlur={handleBlur('idNumber')}
                            value={values.idNumber}
                        />
                        {touched.idNumber && errors.idNumber ? <Text style={styles.errorText}>{errors.idNumber}</Text> : null}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                            <Text style={styles.lableText}>आईडी के फोटो अपलोड करें<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            {values.idFront.length > 0 ? (
                                <TouchableOpacity
                                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectIdFrontFile(setFieldValue)}>
                                    <Text>Image Uploaded</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectIdFrontFile(setFieldValue)}>
                                    <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                                </TouchableOpacity>
                            )}
                            {values.idBack.length > 0 ? (
                                <TouchableOpacity
                                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectIdBackFile(setFieldValue)}>
                                    <Text>Image Uploaded</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectIdBackFile(setFieldValue)}>
                                    <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            {touched.idFront && errors.idFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idFront}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>आईडी का Front</Text>}
                            {touched.idBack && errors.idBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idBack}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>आईडी का Back</Text>}
                        </View>

                        {/* Render additional guest forms */}
                        {[...Array(Math.max(values.guestCount - 1, 0))].map((_, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <Text style={{ fontSize: 20, color: "#000", marginBottom: 10 }}>Guest {index + 2}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                    <Text style={styles.lableText}>प्रथम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                    <Text style={styles.lableText}>अंतिम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                    <TextInput
                                        placeholderTextColor='darkgrey'
                                        placeholder='प्रथम नाम*'
                                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
                                        onChangeText={handleChange(`guestFirstName${index + 1}`)}
                                        onBlur={handleBlur(`guestFirstName${index + 1}`)}
                                        value={values[`guestFirstName${index + 1}`]} />
                                    <TextInput
                                        placeholderTextColor='darkgrey'
                                        placeholder='अंतिम नाम*'
                                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
                                        onChangeText={handleChange(`guestLastName${index + 1}`)}
                                        onBlur={handleBlur(`guestLastName${index + 1}`)}
                                        value={values[`guestLastName${index + 1}`]} />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                    {touched[`guestFirstName${index + 1}`] && errors[`guestFirstName${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors[`guestFirstName${index + 1}`]}</Text> : null}
                                    {touched[`guestLastName${index + 1}`] && errors[`guestLastName${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors[`guestLastName${index + 1}`]}</Text> : null}
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                    <Text style={styles.lableText}>लिंग<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                    <Text style={styles.lableText}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                    <Dropdown
                                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}

                                        placeholderStyle={{ color: 'darkgrey' }}
                                        selectedTextStyle={{ color: '#000', fontSize: 14 }}
                                        data={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]}
                                        labelField="label"
                                        valueField="value"
                                        placeholder='लिंग*'
                                        value={values[`guestGender${index + 1}`]}
                                        onChange={item => {
                                            setFieldValue(`guestGender${index + 1}`, item.value);
                                        }}
                                    />
                                    <Dropdown
                                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}

                                        placeholderStyle={{ color: 'darkgrey' }}
                                        selectedTextStyle={{ color: '#000', fontSize: 14 }}
                                        data={[{ label: 'Passport', value: 'Passport' }, { label: 'Aadhar', value: 'Aadhar' }, { label: 'Voter ID', value: 'Voter ID' }]}
                                        labelField="label"
                                        valueField="value"
                                        placeholder='आईडी प्रकार*'
                                        value={values[`guestIdType${index + 1}`]}
                                        onChange={item => {
                                            setFieldValue(`guestIdType${index + 1}`, item.value);
                                        }}
                                    />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                    {touched[`guestGender${index + 1}`] && errors[`guestGender${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors[`guestGender${index + 1}`]}</Text> : null}
                                    {touched[`guestIdType${index + 1}`] && errors[`guestIdType${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors[`guestIdType${index + 1}`]}</Text> : null}
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                    <Text style={styles.lableText}>आईडी नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                    <TextInput
                                        placeholderTextColor='darkgrey'
                                        placeholder='आईडी नंबर*'
                                        style={[styles.input, { width: "100%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
                                        onChangeText={handleChange(`guestIdNumber${index + 1}`)}
                                        onBlur={handleBlur(`guestIdNumber${index + 1}`)}
                                        value={values[`guestIdNumber${index + 1}`]} />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                    {touched[`guestIdNumber${index + 1}`] && errors[`guestIdNumber${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "100%", }]}>{errors[`guestIdNumber${index + 1}`]}</Text> : null}
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                    <Text style={styles.lableText}>आईडी के फोटो अपलोड करें<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                    {values[`guestImage1${index + 1}`]?.length > 0 ? (
                                        <TouchableOpacity
                                            style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                            onPress={() => selectIdFrontFile(setFieldValue, `guestIdFront${index + 1}`)}>
                                            <Text>Image Uploaded</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                            onPress={() => selectIdFrontFile(setFieldValue, `guestIdFront${index + 1}`)}>
                                            <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                                        </TouchableOpacity>
                                    )}

                                    {values[`guestImage2${index + 1}`]?.length > 0 ? (
                                        <TouchableOpacity
                                            style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                            onPress={() => selectIdBackFile(setFieldValue, `guestIdBack${index + 1}`)}>
                                            <Text>Image Uploaded</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                            onPress={() => selectIdBackFile(setFieldValue, `guestIdBack${index + 1}`)}>
                                            <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                                        </TouchableOpacity>
                                    )}

                                    {/* <TouchableOpacity
                                        onPress={() => selectIdFrontFile(setFieldValue, `guestIdFront${index + 1}`)}
                                        style={{ borderWidth: 1, marginBottom: 10, padding: 10, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Text>Upload ID Front Image</Text>
                                        {values[`guestIdFront${index + 1}`] ? (
                                            <Text>Image Uploaded</Text>
                                        ) : (
                                            <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                                        )}
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => selectIdBackFile(setFieldValue, `guestIdBack${index + 1}`)}
                                        style={{ borderWidth: 1, marginBottom: 10, padding: 10, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Text>Upload ID Back Image</Text>
                                        {values[`guestIdBack${index + 1}`] ? (
                                            <Text>Image Uploaded</Text>
                                        ) : (
                                            <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                                        )}
                                    </TouchableOpacity> */}
                                </View>



                            </View>
                        ))}
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                            <Text style={styles.button}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )
            }
        </Formik >
    );
};

export default CreateReport;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",

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
    }
});


