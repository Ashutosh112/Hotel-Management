import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Alert, Platform, Modal, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhotoIcon from "../assets/images/photologoicon.png";
import Logo from "../assets/images/UjjainPoliceLogo.png";
import axios from 'axios';
import { baseUrl } from '../utils/env';
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from "../../Permissions"
import Spinner from './Spinner';
import AlertIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('प्रथम नाम अनिवार्य'),
    lastName: Yup.string().required('अंतिम नाम अनिवार्य'),
    hotelName: Yup.string().required('होटल का नाम अनिवार्य'),
    propertyType: Yup.string().required('सम्पत्ती का प्रकार अनिवार्य'),
    gender: Yup.string().required('जेंडर अनिवार्य'),
    mobileNumber: Yup.string().required('मोबाइल नंबर अनिवार्य').matches(/^[0-9]{10}$/, 'मोबाइल नंबर 10 अंकों का होना चाहिए'),
    noOfRoom: Yup.string().required('कमरों की संख्या अनिवार्य'),
    // contactNumber: Yup.string().required('मोबाइल नंबर अनिवार्य').matches(/^[0-9]{10}$/, 'मोबाइल नंबर 10 अंकों का होना चाहिए'),
    address: Yup.string().required('होटल का पता अनिवार्य'),
    city: Yup.string().required('शहर अनिवार्य'),
    state: Yup.string().required('राज्य अनिवार्य'),
    policeStation: Yup.string().required('थाना का नाम अनिवार्य'),
    district: Yup.string().required('district अनिवार्य'),
    emailID: Yup.string().required('होटल की ईमेल आईडी अनिवार्य'),
    // website: Yup.string().required('होटल की वेबसाइट अनिवार्य'),
    idFront: Yup.array().min(1, 'होटल का गुमस्ता अनिवार्य'),
    aadharIdFront: Yup.array().min(1, 'मालिक का आधार अनिवार्य (Front)'),
    aadharIdBack: Yup.array().min(1, 'मालिक का आधार अनिवार्य (Back)'),

});

const Signup = ({ navigation, route }) => {
    const [stateData, setStateData] = useState([])
    const [stateValue, setStateValue] = useState(null)
    const [cityData, setCityData] = useState([]);
    const [cityValue, setCityValue] = useState(null)
    const [districtData, setDistrictData] = useState([])
    const [districtValue, setDistrictValue] = useState(null)
    const [policeStationData, setPoliceStationData] = useState([])
    const [policeStationValue, setPoliceStationValue] = useState(null)
    const [propertyTypeData, setPropertyTypeData] = useState([])
    const [propertyTypeValue, setPropertyTypeValue] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [hotelCategory, setHotelCategory] = useState('')

    const mobileNumber = route.params.mobileNumber


    useEffect(() => {
        getState()
        getProType()
    }, [])

    // Function to handle image selection
    const onSelectImage = async (imagePickerFunc, setFieldValue, field) => {
        const permissionStatus = await androidCameraPermission();
        if (permissionStatus || Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert(
                'Image',
                'Choose an option',
                [
                    { text: 'Camera', onPress: () => imagePickerFunc(setFieldValue, field) },
                    { text: 'Gallery', onPress: () => imagePickerFunc(setFieldValue, field, false) },
                    { text: 'Cancel', onPress: () => alert("You cancelled image selection") }
                ]
            );
        }
    };

    // Image picker function with size and type validation
    const imagePicker = async (setFieldValue, field, isCamera = true) => {
        const options = {
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            includeBase64: true,
        };

        let result;
        try {
            result = isCamera ? await ImagePicker.openCamera(options) : await ImagePicker.openPicker(options);

            // Validate file type
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedMimeTypes.includes(result.mime)) {
                Alert.alert('Invalid File', 'Please select a JPG or PNG image.');
                return;
            }

            // Validate file size (limit: 5MB)
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (result.size > maxSizeInBytes) {
                Alert.alert('File Too Large', 'The selected file size should not exceed 5MB.');
                return;
            }

            const base64Image = `${result.data}`;
            setFieldValue(field, base64Image);

        } catch (err) {
            if (ImagePicker.isCancel(err)) {
                Alert.alert('Canceled', 'Image picker was canceled');
            } else {
                Alert.alert('Error', 'Failed to pick image');
            }
        }
    };

    const userSignup = (values) => {
        setIsLoading(true)
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };

        let body = {
            idHotelMaster: 0,
            hotelName: values.hotelName,
            address: values.address,
            contact: mobileNumber, // Using the mobile number from route
            noOfRoom: values.noOfRoom,
            contactPerson: `${values.firstName} ${values.lastName}`,
            emailAddress: values.emailID,
            bActive: false,
            idPoliceStation: values.policeStation,
            idState: values.state,
            idCity: values.city,
            idDistrict: values.district,
            propertyType: values.propertyType,
            filePass: "",
            fileGumasta: values.idFront,
            fileAdhar: values.aadharIdFront,
            fileAdharBack: values.aadharIdBack,
            contactPersonMobile: values.mobileNumber,
            website: values.website,
        };

        const data = body;
        AsyncStorage.setItem("signupdetail", JSON.stringify(data));

        axios.post(`${baseUrl}HotelSignUp`, body, config)
            .then(res => {
                setIsLoading(false)
                setOpenModal(true)
                setHotelCategory(res.data.Result)
            })
            .catch(err => {
                setIsLoading(false)
                Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: err
                });
            });
    };


    const getProType = async () => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };

        await axios.get(`${baseUrl}GetAllPropertyType`, config)
            .then((res) => {
                const propertyTypeData = res.data.Result.map(item => ({
                    label: item.PropertyType,
                    value: item.idProperty
                }));
                setPropertyTypeData(propertyTypeData)
            })
            .catch(err => {
            });
    };

    const getState = async () => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };

        await axios.get(`${baseUrl}GetAllState`, config)
            .then((res) => {
                const stateData = res.data.Result.map(item => ({
                    label: item.stateName,
                    value: item.StateID
                }));
                setStateData(stateData)
            })
            .catch(err => {
            });
    };

    const getCity = async (stateId) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };
        await axios.post(`${baseUrl}GetAllCity?StateId=${stateId}`, config)
            .then((res) => {
                const cityData = res.data.Result.map(item => ({
                    label: item.CityName,
                    value: item.CityId
                }));
                setCityData(cityData)
            })
            .catch(err => {
            });
    };


    const getDistrict = async (stateId) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };
        await axios.post(`${baseUrl}GetAllDistrict?StateId=${stateId}`, config)
            .then((res) => {
                const DistrictData = res.data.Result.map(item => ({
                    label: item.DistrictName,
                    value: item.idDistrict
                }));
                setDistrictData(DistrictData)
            })
            .catch(err => {
                console.log("errrrroooo", err)
            });
    };

    const getPoliceStation = async (cityId) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };
        await axios.post(`${baseUrl}GetAllPoliceStation?idCity=${cityId}`, config)
            .then((res) => {

                const policeStationData = res.data.Result.map(item => ({
                    label: item.PoliceStationName,
                    value: item.idPoliceStationMaster
                }));
                setPoliceStationData(policeStationData)
            })
            .catch(err => {
                console.log("111111", err)

            });
    };
    return (
        <ScrollView style={styles.container}>
            <Spinner isLoading={isLoading} />

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    hotelName: '',
                    propertyType: '',
                    mobileNumber: '',
                    // contactNumber: '',
                    noOfRoom: '',
                    address: '',
                    city: '',
                    state: '',
                    district: '',
                    policeStation: '',
                    emailID: '',
                    filePass: "", // Example filePass value
                    website: '',
                    idFront: '',
                    aadharIdFront: '',
                    aadharIdBack: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    userSignup(values);
                }} >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <ScrollView style={styles.container}>
                        <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                            <Image source={Logo} style={{ height: 70, width: 70 }} resizeMode='contain' />
                            <Text style={[styles.text2, { marginTop: 5, fontWeight: "500" }]}>Hotel Guest<Text style={[styles.text2, { marginTop: 5, fontWeight: "400" }]}> Reporting System</Text></Text>
                            <Text style={styles.text2}>Property Registration Page</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            {/* First Name and Last Name */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                <Text style={styles.lableText}>होटल मालिक नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                <Text style={styles.lableText}>अंतिम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                <TextInput
                                    placeholderTextColor='darkgrey'
                                    placeholder='होटल मालिक नाम*'
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

                            {/* Hotel Name */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>होटल का नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='होटल का नाम*'
                                style={[styles.input, { marginTop: 8 }]}
                                onChangeText={handleChange('hotelName')}
                                onBlur={handleBlur('hotelName')}
                                value={values.hotelName}
                            />
                            {touched.hotelName && errors.hotelName ? <Text style={styles.errorText}>{errors.hotelName}</Text> : null}

                            {/* Mobile Number */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>मोबाइल नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <TextInput
                                maxLength={10}
                                keyboardType='number-pad'
                                placeholderTextColor='darkgrey'
                                placeholder='मोबाइल नंबर*'
                                style={[styles.input, { marginTop: 8, backgroundColor: "#E5E5E5" }]}
                                value={mobileNumber} // Set the mobile number from route params
                                editable={false} // Disable the input field
                            />
                            {touched.contactNumber && errors.contactNumber ? <Text style={styles.errorText}>{errors.contactNumber}</Text> : null}

                            {/* Email ID */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>होटल की ईमेल आईडी<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='होटल ईमेल आईडी*'
                                style={[styles.input, { marginTop: 8 }]}
                                onChangeText={handleChange('emailID')}
                                onBlur={handleBlur('emailID')}
                                value={values.emailID}
                            />
                            {touched.emailID && errors.emailID ? <Text style={styles.errorText}>{errors.emailID}</Text> : null}

                            {/* Webiste ID */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>होटल की वेबसाइट आईडी</Text>
                            </View>
                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='होटल वेबसाइट आईडी'
                                style={[styles.input, { marginTop: 8 }]}
                                onChangeText={handleChange('website')}
                                onBlur={handleBlur('website')}
                                value={values.website}
                            />
                            {touched.website && errors.website ? <Text style={styles.errorText}>{errors.website}</Text> : null}

                            {/* Address */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>होटल का पता<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='होटल का पता*'
                                style={[styles.input, { marginTop: 8 }]}
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                            />
                            {touched.address && errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

                            {/* Property Type */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>सम्पत्ती का प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <Dropdown
                                style={[styles.input, { marginTop: 8 }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                data={propertyTypeData}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="सम्पत्ती का प्रकार*"
                                value={propertyTypeValue}
                                onChange={item => {
                                    setPropertyTypeValue(item.value);
                                    setFieldValue('propertyType', item.value);
                                }}
                            />
                            {touched.propertyType && errors.propertyType ? <Text style={styles.errorText}>{errors.propertyType}</Text> : null}

                            {/* Room Quantity */}
                            {/* <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>कमरों की कुल संख्या<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <TextInput
                                maxLength={10}
                                keyboardType='number-pad'
                                placeholderTextColor='darkgrey'
                                placeholder='कमरों की संख्या*'
                                style={[styles.input, { marginTop: 8 }]}
                                onChangeText={handleChange('roomQty')}
                                onBlur={handleBlur('roomQty')}
                                value={values.roomQty}
                            />
                            {touched.roomQty && errors.roomQty ? <Text style={styles.errorText}>{errors.roomQty}</Text> : null} */}
                            {/* Number Of Rooms */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>कमरों की कुल संख्या<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <TextInput
                                maxLength={10}
                                keyboardType='number-pad'
                                placeholderTextColor='darkgrey'
                                placeholder='कमरों की कुल संख्या *'
                                style={[styles.input, { marginTop: 8 }]}
                                onChangeText={handleChange('noOfRoom')}
                                onBlur={handleBlur('noOfRoom')}
                                value={values.noOfRoom}
                            />
                            {touched.noOfRoom && errors.noOfRoom ? <Text style={styles.errorText}>{errors.noOfRoom}</Text> : null}

                            {/* Mobile Number */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>होटल मालिक का मो. नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <TextInput
                                maxLength={10}
                                keyboardType='number-pad'
                                placeholderTextColor='darkgrey'
                                placeholder='मोबाइल नंबर*'
                                style={[styles.input, { marginTop: 8 }]}
                                onChangeText={handleChange('mobileNumber')}
                                onBlur={handleBlur('mobileNumber')}
                                value={values.mobileNumber}
                            />
                            {touched.mobileNumber && errors.mobileNumber ? <Text style={styles.errorText}>{errors.mobileNumber}</Text> : null}

                            {/* City and Pin */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>राज्य<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                {/* <Text style={styles.lableText}>पिन<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text> */}
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                <Dropdown
                                    style={[styles.input, { marginTop: 8 }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    labelField="label"
                                    valueField="value"
                                    placeholder='राज्य*'
                                    search
                                    searchPlaceholder="Search"
                                    data={stateData}  // Use the transformed state data
                                    value={stateValue}
                                    onChange={item => {
                                        setStateValue(item.value)
                                        setFieldValue('state', item.value);
                                        getCity(item.value); // Call getCity when stateValue changes
                                        getDistrict(item.value)
                                    }}

                                />

                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                {touched.state && errors.state ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.state}</Text> : null}
                                {/* {touched.pin && errors.pin ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.pin}</Text> : null} */}
                            </View>

                            {/* State */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>शहर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>

                                <Dropdown
                                    style={[styles.input, { marginTop: 8 }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    labelField="label"
                                    valueField="value"
                                    placeholder='शहर*'
                                    search
                                    searchPlaceholder="Search"
                                    data={cityData}
                                    value={cityValue}
                                    onChange={item => {
                                        setCityValue(item.value);
                                        setFieldValue('city', item.value);
                                        getPoliceStation(item.value)
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                {touched.city && errors.city ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.city}</Text> : null}
                            </View>


                            {/* State */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>District<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>

                                <Dropdown
                                    style={[styles.input, { marginTop: 8 }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    labelField="label"
                                    valueField="value"
                                    placeholder='ज़िला*'
                                    search
                                    searchPlaceholder="Search"
                                    data={districtData}
                                    value={districtValue}
                                    onChange={item => {
                                        setDistrictValue(item.value);
                                        setFieldValue('district', item.value);
                                        // getDistrict(item.value)
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                {touched.city && errors.city ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.city}</Text> : null}
                            </View>

                            {/* Police Station */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>थाना<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <Dropdown
                                style={[styles.input, { marginTop: 8 }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                data={policeStationData}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="थाना*"
                                value={policeStationValue}
                                onChange={item => {
                                    setPoliceStationValue(item.value);
                                    // getPoliceStation(item.value)
                                    setFieldValue('policeStation', item.value);
                                }}
                            />
                            {touched.policeStation && errors.policeStation ? <Text style={styles.errorText}>{errors.policeStation}</Text> : null}

                            {/* // JSX structure with Formik */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "75%", marginTop: 10 }}>
                                <Text style={styles.lableText}>आईडी के फोटो अपलोड करें<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", width: "90%" }}>
                                {values.idFront.length > 0 ? (
                                    <TouchableOpacity
                                        style={[styles.input, { height: 70, width: "90%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                        onPress={() => { onSelectImage(imagePicker, setFieldValue, 'idFront') }}>
                                        <Text style={{ fontSize: 12, color: "green" }}>होटल गुमस्ता Uploaded</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={[styles.input, { height: 70, width: "90%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                        onPress={() => onSelectImage(imagePicker, setFieldValue, 'idFront')}>
                                        <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "75%" }}>
                                {touched.idFront && errors.idFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idFront}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>होटल का गुमस्ता <Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>}
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>

                                {values.aadharIdFront.length > 0 ? (
                                    <TouchableOpacity
                                        style={[styles.input, { height: 70, width: "40%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                        onPress={() => onSelectImage(imagePicker, setFieldValue, 'aadharIdFront')}>
                                        <Text style={{ fontSize: 10, color: "green" }}>मालिक का आधार Front Side Uploaded</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={[styles.input, { height: 70, width: "40%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                        onPress={() => onSelectImage(imagePicker, setFieldValue, 'aadharIdFront')}>
                                        <Image source={PhotoIcon} style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                )}

                                {values.aadharIdBack.length > 0 ? (
                                    <TouchableOpacity
                                        style={[styles.input, { height: 70, width: "40%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                        onPress={() => { onSelectImage(imagePicker, setFieldValue, 'aadharIdBack') }}>
                                        <Text style={{ fontSize: 10, color: "green" }}>मालिक का आधार Back Side Uploaded</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={[styles.input, { height: 70, width: "40%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
                                        onPress={() => onSelectImage(imagePicker, setFieldValue, 'aadharIdBack')}>
                                        <Image source={PhotoIcon} style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                {touched.aadharIdFront && errors.aadharIdFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.aadharIdFront}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>मालिक का आधार [Front] <Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>}
                                {touched.aadharIdBack && errors.aadharIdBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.aadharIdBack}</Text> : <Text style={[styles.lableText, { marginTop: 8, width: "40%" }]}>मालिक का आधार [Back] <Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>}
                            </View>

                            {/* Submit Button */}
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={() => {
                                    if (!values.firstName || !values.lastName || !values.hotelName || !values.mobileNumber || !values.noOfRoom || !values.emailID || !values.propertyType || !values.address || !values.state || !values.city || !values.policeStation || values.idFront.length === 0 || values.aadharIdFront.length === 0 || values.aadharIdBack.length === 0) {
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Warning',
                                            text2: "Please fill all required fields."
                                        });
                                        return;
                                    }
                                    userSignup(values)
                                }}>
                                <Text style={styles.button}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
            </Formik>


            {/* Open modal for Success Signup start */}
            <Modal transparent={true}
                animationType={'fade'}
                hardwareAccelerated={true}
                visible={openModal}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060' }}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1 }}>
                            <AlertIcon size={40} name="alert-circle-outline" color="#024063" style={{ marginLeft: 5 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.modalText}>धन्यवाद, आपकी जानकारी सुरक्षित कर ली गई है। आप अगले चरण में अपनी रूम कैटेगरी जोड़ सकते हैं।</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <Pressable
                                style={{ backgroundColor: '#1AA7FF', paddingHorizontal: 25, paddingVertical: 10, justifyContent: "center", alignItems: "center", borderRadius: 12 }}
                                onPress={() => navigation.navigate('AddRoomCategory', { hotelCategory: hotelCategory }, setOpenModal(false))}
                            >
                                <Text style={styles.textStyle}>ठीक है</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Open modal for Success Signup end */}

            <TouchableOpacity style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} onPress={() => navigation.navigate("Login")}>
                <Text style={[styles.greyText, { marginVertical: 20, color: "black", fontWeight: "400" }]}>Already have an account?
                    <Text style={[styles.greyText, { marginVertical: 20, fontWeight: "500", color: '#1AA7FF' }]}> Login</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Signup;

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
        height: 45,
        marginTop: 20,
        fontSize: 12
    },
    inputContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "black",
        fontSize: 22,
        fontWeight: "bold"
    },
    text2: {
        color: "#666666",
        fontSize: 14,
    },
    buttonContainer: {
        borderRadius: 12,
        marginTop: 20,
        width: Dimensions.get('window').width - 60,
        height: 45,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF',
    },
    button: {
        fontSize: 14,
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
        fontSize: 12,
        color: "grey"
    },
    selectedTextStyle: {
        fontSize: 12,
        color: "black"
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 12,
    },
    lableText: {
        fontSize: 10,
        color: "#000",
        marginLeft: 0,
        width: "45%",
        marginTop: 10
    },
    modalView: {
        // flex: 1,
        height: 230,
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
        fontSize: 12
    },
    modalText: {
        textAlign: "center",
        color: "black",
        fontSize: 13,
    },
});