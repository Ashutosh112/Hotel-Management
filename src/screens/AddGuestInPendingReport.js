import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Image, Modal, Pressable } from 'react-native';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import BackIcon from "react-native-vector-icons/Ionicons";
import { baseUrl } from '../utils/env';
import PhotoIcon from "../assets/images/photologoicon.png";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CalendorIcon from "../assets/images/CalenderIcon.png";
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import AlertIcon from "react-native-vector-icons/Ionicons";
import Spinner from './Spinner';



const GuestForm = ({ index, guest, handleGuestChange, handleDocumentPicker, errors }) => (
    <View style={styles.guestContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 14, color: "#000", marginBottom: 10, textAlign: "left", marginTop: 15, fontWeight: "600" }}>अतिरिक्त अतिथि {index + 1}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
            <Text style={styles.lableText}>प्रथम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
            <Text style={styles.lableText}>अंतिम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
            <TextInput
                onChangeText={text => handleGuestChange(index, 'firstName', text)}
                value={guest.firstName}
                placeholderTextColor='darkgrey'
                placeholder='प्रथम नाम*'
                style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
            />
            <TextInput
                onChangeText={text => handleGuestChange(index, 'lastName', text)}
                value={guest.lastName}
                placeholderTextColor='darkgrey'
                placeholder='अंतिम नाम*'
                style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
            />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
            {errors.firstName ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.firstName}</Text> : <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text>}
            {errors.lastName ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.lastName}</Text> : <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text>}
        </View>

        {/* <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 0 }}>
            <Text style={styles.lableText}>जेंडर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
            <Text style={styles.lableText}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
        </View>*/}

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: errors.firstName && errors.lastName ? 10 : 0 }}>
            <Text style={styles.lableText}>जेंडर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
        </View>

        <Dropdown
            style={[styles.input, { width: "95%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.selectedTextStyle}
            data={[
                { label: 'पुरुष', value: 'पुरुष' },
                { label: 'महिला', value: 'महिला' },
                { label: 'अन्य', value: 'अन्य' },
            ]}
            labelField="label"
            valueField="value"
            placeholder="जेंडर"
            value={guest.gender}
            onChange={item => handleGuestChange(index, 'gender', item.value)}
        />
        {errors.gender && errors.gender ? <Text style={[styles.errorText, { marginLeft: 0, width: "90%", }]}>{errors.gender}</Text> : <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text>}

        <Text style={[styles.lableText, { marginTop: errors.gender ? 10 : 0, width: '90%' }]}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
        <Dropdown
            style={[styles.input, { width: "95%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.selectedTextStyle} data={[
                { label: 'आधार कार्ड', value: 'आधार कार्ड' },
                { label: 'पासपोर्ट', value: 'पासपोर्ट' },
                { label: 'वोटर आई कार्ड', value: 'वोटर आई कार्ड' },
                { label: 'ड्राइविंग लाइसेंस', value: 'ड्राइविंग लाइसेंस' },
                { label: 'पैन कार्ड', value: 'पैन कार्ड' },
                { label: 'राशन कार्ड', value: 'राशन कार्ड' },
                { label: 'सरकारी कर्मचारी पहचान पत्र', value: 'सरकारी कर्मचारी पहचान पत्र' },
                { label: 'विदेशियों का पंजीकरण कार्ड (FRC)', value: 'विदेशियों का पंजीकरण कार्ड (FRC)' },
                { label: ' कोई अन्य सरकारी जारी किया गया पहचान पत्र', value: ' कोई अन्य सरकारी जारी किया गया पहचान पत्र' },
            ]}
            labelField="label"
            valueField="value"
            placeholder="आईडी प्रकार*"
            value={guest.idType}
            onChange={item => handleGuestChange(index, 'idType', item.value)}
        />
        {errors.idType && errors.idType ? <Text style={[styles.errorText, { marginLeft: 0, width: "90%", }]}>{errors.idType}</Text> : <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text>}

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: errors.idType ? 10 : 0 }}>
            <Text style={styles.lableText}>आईडी नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
        </View>
        <TextInput
            style={styles.input}
            placeholder="आईडी नंबर"
            placeholderTextColor={"darkgrey"}
            onChangeText={text => handleGuestChange(index, 'idNumber', text)}
            value={guest.idNumber} />

        {errors.idNumber && errors.idNumber ? <Text style={[styles.errorText, { marginLeft: 0, width: "90%", }]}>{errors.idNumber}</Text> : <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text>}

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: errors.idNumber ? 10 : 0 }}>
            <Text style={styles.lableText}>मोबाइल नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
        </View>
        <TextInput
            style={styles.input}
            placeholder="मोबाइल नंबर"
            placeholderTextColor={"darkgrey"}
            onChangeText={text => handleGuestChange(index, 'mobileNumber', text)}
            value={guest.mobileNumber}
            keyboardType="numeric"
            maxLength={10} />

        {errors.mobileNumber && errors.mobileNumber ? <Text style={[styles.errorText, { marginLeft: 0, width: "90%", }]}>{errors.mobileNumber}</Text> : <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text>}

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 10 }}>
            <Text style={styles.lableText}>आईडी के फोटो अपलोड करें<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
            {guest.idFront ? (
                <TouchableOpacity
                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => handleDocumentPicker(index, 'idFront')}>
                    <Text style={{ fontSize: 12, color: "green" }}>Image Uploaded</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => handleDocumentPicker(index, 'idFront')}>
                    <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
            )}
            {guest.idBack ? (
                <TouchableOpacity
                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => handleDocumentPicker(index, 'idBack')}>
                    <Text style={{ fontSize: 12, color: "green" }}>Image Uploaded</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => handleDocumentPicker(index, 'idBack')}>
                    <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
            )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
            {guest.idFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text> : (errors.idFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idFront}</Text> : null)}
            {guest.idBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text> : (errors.idBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idBack}</Text> : null)}
        </View>
    </View >
);


const AddGuestInPendingReport = ({ navigation }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('पुरुष');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [idType, setIdType] = useState('आधार कार्ड');
    const [idNumber, setIdNumber] = useState('');
    const [pincode, setPincode] = useState('')
    const [travelReason, setTravelReason] = useState('दर्शन')
    const [additionalGuests, setAdditionalGuests] = useState("1");
    const [guests, setGuests] = useState([]);
    const [idFront, setIdFront] = useState(null);
    const [idBack, setIdBack] = useState(null);
    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        city: '',
        address: '',
        phoneNumber: '',
        idFront: '',
        idBack: '',
        idType: '',
        idNumber: '',
        travelReason: '',
        pincode: '',
        gender: "",
        guests: [],
    });

    const [hotelCategories, setHotelCategories] = useState([]);
    const [categoryErrors, setCategoryErrors] = useState('');
    const [openModal2, setOpenModal2] = useState(false)
    const [statusCode, setStatusCode] = useState({})
    const [submitValidateDateStatusCode, setSubmitValidateDateStatusCode] = useState('')
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        hotelRoomCategory()
        submitValidateDate()
    }, [])

    const handleGuestChange = (index, field, value) => {
        const newGuests = [...guests];
        newGuests[index][field] = value;
        setGuests(newGuests);
        validateGuestField(index, field, value);
    };

    const validateGuestField = (index, field, value) => {
        const newErrors = { ...errors };
        let error = '';

        if (field === 'firstName') {
            if (/\d/.test(value)) {
                error = 'प्रथम नाम में संख्याएँ नहीं हो सकतीं';
            } else if (!value) {
                error = 'कृपया प्रथम नाम दर्ज करें।';
            }
        } else if (field === 'lastName') {
            if (/\d/.test(value)) {
                error = 'अंतिम नाम में संख्याएँ नहीं हो सकतीं';
            } else if (!value) {
                error = 'कृपया अंतिम नाम दर्ज करें।';
            }
        } else if (field === 'mobileNumber') {
            if (!/^[0-9]+$/.test(value) || value.length !== 10) {
                error = 'मोबाइल नंबर 10 अंकों का होना चाहिए';
            }
        }

        if (!newErrors.guests[index]) {
            newErrors.guests[index] = {};
        }

        newErrors.guests[index][field] = error;
        setErrors(newErrors);
    };


    const handleDocumentPicker = async (index, field) => {
        try {
            const result = await ImagePicker.openPicker({
                includeBase64: true,
                mediaType: 'photo',
            });

            // Check the MIME type of the selected file
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedMimeTypes.includes(result.mime)) {
                Alert.alert('Invalid File', 'Please select a JPG or PNG image.');
                return;
            }

            // Check the file size (5MB = 5 * 1024 * 1024 bytes)
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (result.size > maxSizeInBytes) {
                Alert.alert('File Too Large', 'The selected file size should not exceed 5MB.');
                return;
            }
            // const base64Image = `data:${result.mime};base64,${result.data}`;
            const base64Image = `${result.data}`;

            if (index === -1) {
                if (field === 'idFront') setIdFront(base64Image);
                if (field === 'idBack') setIdBack(base64Image);
            } else {
                const newGuests = [...guests];
                newGuests[index] = { ...newGuests[index], [field]: base64Image };
                setGuests(newGuests);
            }
        } catch (err) {
            if (ImagePicker.isCancel(err)) {
                Alert.alert('Canceled', 'Image picker was canceled');
            } else {
                Alert.alert('Error', 'Failed to pick image');
            }
        }
    };

    const hotelRoomCategory = async () => {
        // setIsLoading(true);
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}HotelCategory?idHotel=${updatedValue.idHotelMaster}`, {}, config)
            .then((res) => {
                // setIsLoading(false);
                const categories = res.data.Result.map(cat => ({ ...cat, isChecked: false }));
                setHotelCategories(categories);
            })
            .catch(err => {
                // setIsLoading(false);
            });
    };

    const handleCategoryCheck = (index) => {
        const newCategories = [...hotelCategories];
        newCategories[index].isChecked = !newCategories[index].isChecked;
        setHotelCategories(newCategories);
    };


    const genderData = [
        { label: 'पुरुष', value: 'पुरुष' },
        { label: 'महिला', value: 'महिला' },
        { label: 'अन्य', value: 'अन्य' },
    ];

    const idTypeData = [
        { label: 'आधार कार्ड', value: 'आधार कार्ड' },
        { label: 'पासपोर्ट', value: 'पासपोर्ट' },
        { label: 'वोटर आई कार्ड', value: 'वोटर आई कार्ड' },
        { label: 'ड्राइविंग लाइसेंस', value: 'ड्राइविंग लाइसेंस' },
        { label: 'पैन कार्ड', value: 'पैन कार्ड' },
        { label: 'राशन कार्ड', value: 'राशन कार्ड' },
        { label: 'सरकारी कर्मचारी पहचान पत्र', value: 'सरकारी कर्मचारी पहचान पत्र' },
        { label: 'विदेशियों का पंजीकरण कार्ड (FRC)', value: 'विदेशियों का पंजीकरण कार्ड (FRC)' },
        { label: ' कोई अन्य सरकारी जारी किया गया पहचान पत्र', value: ' कोई अन्य सरकारी जारी किया गया पहचान पत्र' },
    ];

    const travelReasonData = [
        { label: 'दर्शन', value: 'दर्शन' },
        { label: 'अध्यन या सेमिनार', value: 'अध्यन या सेमिनार' },
        { label: 'सत्संग', value: 'सत्संग' },
        { label: 'पारिवारिक या मित्रो से मिलना', value: 'पारिवारिक या मित्रो से मिलना' },
        { label: 'व्यापारिक या व्यावासयिक यात्रा', value: 'व्यापारिक या व्यावासयिक यात्रा' },
        { label: 'अन्य', value: 'अन्य' },
    ];

    const guestOptions = [
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

    const idValidationPatterns = {
        "Aadhar": /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
        "Driving License": /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
        "Passport": /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
        "Voter ID": /^[A-Z]{3}[0-9]{7}$/,
        "PAN": /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        "Ration Card": /^([a-zA-Z0-9]){8,12}\s*$/,
        "default": /^(?=.*\d).{5,}$/
    };

    const [checkoutDate, setCheckoutDate] = useState(new Date());
    const [showCheckoutPicker, setShowCheckoutPicker] = useState(false);

    const submitValidateDate = async () => {
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}ValidateDateForAddGuest?HotelId=${updatedValue.idHotelMaster}&SubmitDate=${moment(yesterday).format("DD/MMM/YYYY")}`, {}, config)
            .then((res) => {
                setSubmitValidateDateStatusCode(res.data)
            })
            .catch(err => {
            });
    };

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Set the default selected date label
    const [checkinDate, setCheckinDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeCheckout = (event, selectedDate) => {
        const currentDate = selectedDate || checkoutDate;
        setShowCheckoutPicker(false);

        if (moment(currentDate).isSame(today, 'day') && moment(checkinDate).isSame(today, 'day')) {
            setCheckoutDate(currentDate);
            setFieldValue('checkoutDate', currentDate); // Assuming you have a setFieldValue function
        } else if (currentDate >= checkinDate) {
            setCheckoutDate(currentDate);
            setFieldValue('checkoutDate', currentDate); // Assuming you have a setFieldValue function
        } else {
            Alert.alert('Warning', 'चेकआउट कि दिनांक चेक-इन दिनांक से पहले नहीं हो सकती।');
        }
    };

    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const selectDate = (date) => {
        if (submitValidateDateStatusCode.StatusCode == 1 && moment(date).isSame(yesterday, 'day')) {
            Alert.alert('Warning', `${submitValidateDateStatusCode.Message}`);
        } else {
            setCheckinDate(date);
            setShowDatePicker(false);
        }
    };

    const validatePhoneNumber = (text) => {
        setPhoneNumber(text);
        let error = '';
        if (!/^[0-9]+$/.test(text) || text.length !== 10) {
            error = 'फ़ोन नंबर 10 अंकों का होना चाहिए';
        }
        setErrors(prevErrors => ({ ...prevErrors, phoneNumber: error }));
    };

    const validateName = (text, field) => {
        let error = '';
        if (/[\d]/.test(text)) {
            error = 'नाम में संख्याएँ नहीं हो सकतीं';
        }
        setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
        if (field === 'name') {
            setName(text);
        } else {
            setLastName(text);
        }
    };

    const handleCityChange = (text) => {
        // Remove numeric characters from the text
        const filteredText = text.replace(/[0-9]/g, '');
        setCity(filteredText);
    };

    const handleIdNumberChange = (text) => {
        setIdNumber(text);
        const pattern = idValidationPatterns[idType] || idValidationPatterns["default"];
        if (!pattern.test(text)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                idNumber: `अमान्य ${idType} नंबर`
            }));
        } else if (pattern.test(text) && text.length === getPatternLength(idType)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                idNumber: ''
            }));
        }
    };

    const getPatternLength = (type) => {
        switch (type) {
            case 'आधार कार्ड':
                return 12;
            case 'पैन कार्ड':
                return 10;
            case 'वोटर आई कार्ड':
                return 10;
            default:
                return null;
        }
    }


    const lastNameInputRef = useRef(null);
    const cityInputRef = useRef(null);
    const pincodeInputRef = useRef(null);

    const validate = () => {
        let valid = true;
        let newErrors = {
            name: '',
            lastName: '',
            city: '',
            address: '',
            phoneNumber: '',
            idFront: '',
            idBack: '',
            idType: '',
            idNumber: '',
            travelReason: '',
            pincode: '',
            guests: guests.map(() => ({ firstName: '', lastName: '', phoneNumber: '', idType: '', idNumber: '', mobileNumber: '' })),
        };

        if (!name) {
            newErrors.name = 'कृपया प्रथम नाम दर्ज करें।';
            valid = false;
        }

        if (!lastName) {
            newErrors.lastName = 'कृपया अंतिम नाम दर्ज करें।';
            valid = false;
        }

        if (!city) {
            newErrors.city = 'कृपया शहर दर्ज करें।';
            valid = false;
        }

        if (!address) {
            newErrors.address = 'कृपया पता दर्ज करें।';
            valid = false;
        }

        if (!phoneNumber) {
            newErrors.phoneNumber = 'कृपया मोबाइल नंबर दर्ज करें।';
            valid = false;
        } else if (!/^[0-9]+$/.test(phoneNumber) || phoneNumber.length !== 10) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
            valid = false;
        }

        if (!gender) {
            newErrors.gender = 'जेंडर दर्ज करें।';
            valid = false;
        }

        if (!travelReason) {
            newErrors.travelReason = 'यात्रा का उद्देश्य दर्ज करें।';
            valid = false;
        }

        if (!idType) {
            newErrors.idType = 'आईडी प्रकार दर्ज करें।';
            valid = false;
        }

        if (!pincode) {
            newErrors.pincode = 'कृपया पिनकोड दर्ज करें।';
            valid = false;
        }

        if (!idNumber) {
            newErrors.idNumber = 'कृपया पहचान संख्या दर्ज करें।';
            valid = false;
        } else {
            const pattern = idValidationPatterns[idType] || idValidationPatterns["default"];
            if (!pattern.test(idNumber)) {
                newErrors.idNumber = `Invalid ${idType} number`;
                valid = false;
            }
        }

        if (!idFront) {
            newErrors.idFront = 'आईडी का Front अपलोड करें। केवल .jpg, .JPG, .jpeg, .png और .PNG छवि प्रारूपों की अनुमति है। फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए...  ';
            valid = false;
        }

        if (!idBack) {
            newErrors.idBack = 'आईडी का Back अपलोड करें। केवल .jpg, .JPG, .jpeg, .png और .PNG छवि प्रारूपों की अनुमति है। फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए...  ';
            valid = false;
        }

        guests.forEach((guest, index) => {
            if (!guest.firstName) {
                newErrors.guests[index].firstName = 'कृपया प्रथम नाम दर्ज करें।';
                valid = false;
            }

            if (!guest.lastName) {
                newErrors.guests[index].lastName = 'कृपया अंतिम नाम दर्ज करें।';
                valid = false;
            }

            if (!guest.gender) {
                newErrors.guests[index].gender = 'जेंडर दर्ज करें।';
                valid = false;
            }

            if (!guest.idType) {
                newErrors.guests[index].idType = 'आईडी प्रकार दर्ज करें।';
                valid = false;
            }

            if (!guest.mobileNumber) {
                newErrors.guests[index].mobileNumber = 'मोबाइल नंबर दर्ज करें।';
                valid = false;
            }

            if (!guest.idNumber) {
                newErrors.guests[index].idNumber = 'कृपया पहचान संख्या दर्ज करें।';
                valid = false;
            } else {
                const pattern = idValidationPatterns[guest.idType] || idValidationPatterns["default"];
                if (!pattern.test(guest.idNumber)) {
                    newErrors.guests[index].idNumber = `Invalid ${guest.idType} number`;
                    valid = false;
                }
            }

            if (!guest.idFront) {
                newErrors.guests[index].idFront = 'आईडी का Front अपलोड करें। केवल .jpg, .JPG, .jpeg, .png और .PNG छवि प्रारूपों की अनुमति है। फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए...  ';
                valid = false;
            }

            if (!guest.idBack) {
                newErrors.guests[index].idBack = 'आईडी का Back अपलोड करें। केवल .jpg, .JPG, .jpeg, .png और .PNG छवि प्रारूपों की अनुमति है। फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए...  ';
                valid = false;
            }
        });

        // Validate categories
        const checkedCategories = hotelCategories.filter(cat => cat.isChecked);
        if (hotelCategories.length > 1 && checkedCategories.length === 0) {
            setCategoryErrors('कमरे की एक श्रेणी चुनें');
            valid = false;
        } else {
            setCategoryErrors('');
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
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
        const selectedCategories = hotelCategories
            .filter(cat => cat.isChecked)
            .map(cat => ({
                categoryName: cat.CategoryName,
                iPrice: cat.iPrice,
                noOfRoom: 1,
            }));

        let body = {
            idHotel: updatedValue.idHotelMaster,
            contactNo: phoneNumber,
            checkInDate: moment(checkinDate).format("MM/DD/YYYY"),
            checkOutDate: moment(checkoutDate).format("MM/DD/YYYY"),
            enterDate: moment(new Date()).format("MM/DD/YYYY"),
            description: "None",
            bActive: true,
            guestName: name,
            identificationNo: idNumber,
            identificationType: idType,
            address: address,
            isDeleted: false,
            details: guests.map(guest => ({
                idGuest: 0,
                sName: guest.firstName,
                identificationNo: guest.idNumber,
                identificationType: guest.idType,
                gender: guest.gender,
                contactNo: guest.mobileNumber,
                filePass: "",
                lastName: guest.lastName,
                image: guest.idFront,
                image2: guest.idBack,
            })),
            categories: selectedCategories,
            AddionalGuest: additionalGuests,
            hotelName: updatedValue.HotelName,
            guestLastName: lastName,
            gender: gender,
            travelReson: travelReason,
            city: city,
            pIncode: pincode,
            filePass: "",
            image1: idFront,
            image2: idBack
        };
        await axios.post(`${baseUrl}InsertUpdateDeleteGuestMaster`, body, config)
            .then(response => {
                setIsLoading(false)
                setStatusCode(response.data)
                setOpenModal2(true)
            })
            .catch(error => {
                console.error('Error sending form data:');
                setIsLoading(false)
                console.log("errr", error.response)
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to send form data'
                });
            });
    };



    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <Spinner isLoading={isLoading} />
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                    <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>अतिथि की जानकारी दर्ज करें</Text>
                </View>
            </View>

            <View style={{ marginHorizontal: 25, justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.modalText, { fontSize: 14, fontWeight: "600" }]}>|| कृपया ध्यान दें ||</Text>
                <Text style={[styles.modalText, { textAlign: "justify" }]}>1. इस फॉर्म के माध्यम से आप गेस्ट की एंट्री सेव कर रहे हैं। इसे थाने में भेजने के लिए कृपया पेंडिंग रिपोर्ट में जाकर इस रिपोर्ट को सबमिट करें।</Text>
                <Text style={[styles.modalText, { textAlign: "justify" }]}>2. एक बार रिपोर्ट थाने में सबमिट करने के बाद उस तारीख के लिए आप कोई नए गेस्ट की एंट्री नहीं कर पाएंगे।</Text>
                <Text style={[styles.modalText, { textAlign: "justify" }]}>3. आप सिर्फ आज (Today)और कल(Yesterday) के चेक-इन के लिए ही एंट्री कर सकते हैं।</Text>
                <Text style={[styles.modalText, { textAlign: "justify" }]}>4. 5MB से अधिक की इमेज अपलोड नहीं हो पाएगी। कृपया इमेज का साइज कम करके अपलोड करें।</Text>
                <Text style={[styles.modalText, { textAlign: "justify" }]}>4. होटलों की जिम्मेदारी है कि वे वेबसाइट के माध्यम से सबमिट की गई सभी अतिथि जानकारी की सटीकता और वैधता सुनिश्चित करें। इसमें अतिथि के नाम, मोबाइल नंबर, और आधार विवरण की पुष्टि शामिल है।</Text>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={styles.container}>
                <Text style={[styles.lableText, { fontSize: 16, fontWeight: "600", color: "#000", width: "auto", marginVertical: 5 }]}>प्राथमिक अतिथि की जानकारी</Text>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <Text style={styles.lableText}>प्रथम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                    <Text style={styles.lableText}>अंतिम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <TextInput
                        onChangeText={(text) => validateName(text, 'name')}
                        onSubmitEditing={() => lastNameInputRef.current.focus()} // Move focus to the last name input
                        placeholderTextColor={"darkgrey"}
                        placeholder='प्रथम नाम*'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
                    />
                    <TextInput
                        onChangeText={(text) => validateName(text, 'lastName')}
                        ref={lastNameInputRef} // Reference for the last name input
                        placeholderTextColor={"darkgrey"}
                        placeholder='अंतिम नाम*'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    {errors.name ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.name}</Text> : <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text>}
                    {errors.lastName ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.lastName}</Text> : <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text>}
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 0 }}>
                    <Text style={styles.lableText}>चेक इन तारीख<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                    <Text style={styles.lableText}>चेक आउट तारीख<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <TouchableOpacity
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "space-between", marginTop: 8, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }]}
                        onPress={openDatePicker}>
                        <Text style={{ color: "black", fontSize: 12 }}>{moment(checkinDate).format("DD-MM-YYYY")}</Text>
                        <Image source={CalendorIcon} style={{ height: 15, width: 15 }} />
                    </TouchableOpacity>

                    <Modal
                        visible={showDatePicker}
                        transparent={true}
                        animationType="slide" >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                                <Text style={{ color: "#024063" }}>चेक-इन दिनांक चुनें</Text>
                                <TouchableOpacity
                                    onPress={() => selectDate(yesterday)}
                                    disabled={statusCode === 1}
                                    style={{ padding: 10, backgroundColor: statusCode === 1 ? 'grey' : 'white', marginVertical: 5 }}
                                >
                                    <Text style={{ color: statusCode == 1 ? 'lightgrey' : 'black', fontSize: 12 }}>
                                        {`Yesterday (${moment(yesterday).format("DD/MM/YYYY")})  ${submitValidateDateStatusCode.StatusCode == 1 ? submitValidateDateStatusCode.Message : ''}`}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => selectDate(today)}
                                    style={{ padding: 10, backgroundColor: 'white', marginVertical: 5 }}
                                >
                                    <Text style={{ color: 'black', fontSize: 12 }}>{`Today (${moment(today).format("DD/MM/YYYY")})`}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setShowDatePicker(false)} >
                                    <Text style={{ color: '#024063', textAlign: 'center', marginTop: 10, fontSize: 14 }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "space-between", marginTop: 8, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }]}
                        onPress={() => setShowCheckoutPicker(true)}>
                        <Text style={{ color: "black", fontSize: 12 }}>{checkoutDate ? moment(checkoutDate).format("DD-MM-YYYY") : "चेक आउट तारीख*"}</Text>
                        <Image source={CalendorIcon} style={{ height: 15, width: 15 }} />
                    </TouchableOpacity>

                    {showCheckoutPicker && (
                        <DateTimePicker
                            value={checkoutDate}
                            mode="date"
                            display="default"
                            onChange={onChangeCheckout}
                            minimumDate={yesterday}
                        />
                    )}
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 8 }}>
                    <Text style={styles.lableText}>मोबाइल नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="मोबाइल नंबर"
                    keyboardType="numeric"
                    onChangeText={validatePhoneNumber}
                    value={phoneNumber}
                    maxLength={10}
                    placeholderTextColor={"darkgrey"}
                />
                {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}

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
                        itemTextStyle={styles.selectedTextStyle}
                        data={genderData}
                        labelField="label"
                        valueField="value"
                        placeholder="जेंडर"
                        value={gender}
                        onChange={item => {
                            setGender(item.value);
                            if (item.value > 1) {
                                setGuests(Array(item.value - 1).fill({ firstName: '', lastName: '', phoneNumber: '', gender: "", idFront: null, idBack: null }));
                                setErrors({
                                    ...errors,
                                    guests: Array(item.value - 1).fill({ firstName: '', lastName: '', phoneNumber: '' }),
                                });
                            } else {
                                setGuests([]);
                                setErrors({ ...errors, guests: [] });
                            }
                        }}
                    />

                    <Dropdown
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.selectedTextStyle} data={guestOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="गेस्ट की कुल संख्या"
                        value={additionalGuests}
                        onChange={item => {
                            setAdditionalGuests(item.value);
                            if (item.value > 1) {
                                setGuests(Array(item.value - 1).fill({ firstName: '', lastName: '', phoneNumber: '', idFront: null, idBack: null }));
                                setErrors({
                                    ...errors,
                                    guests: Array(item.value - 1).fill({ firstName: '', lastName: '', phoneNumber: '' }),
                                });
                            } else {
                                setGuests([]);
                                setErrors({ ...errors, guests: [] });
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    {errors.gender ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.gender}</Text> : null}
                    {/* {errors.lastName ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.lastName}</Text> : null} */}
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>यात्रा का उद्देश्य<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <Dropdown
                    style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 15 }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={styles.selectedTextStyle} data={travelReasonData}
                    labelField="label"
                    valueField="value"
                    placeholder="यात्रा का उद्देश्य*"
                    value={travelReason}
                    onChange={item => setTravelReason(item.value)}
                />
                {errors.travelReason ? <Text style={styles.errorText}>{errors.travelReason}</Text> : null}

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>पता<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="पता"
                    onChangeText={text => setAddress(text)}
                    value={address}
                    placeholderTextColor={"darkgrey"}
                    onSubmitEditing={() => cityInputRef.current.focus()} // Focus on the next input (city)

                />
                {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>शहर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    ref={cityInputRef} // Reference for the city input
                    style={styles.input}
                    placeholder="शहर"
                    onChangeText={handleCityChange}
                    value={city}
                    placeholderTextColor={"darkgrey"}
                    returnKeyType="next"
                    onSubmitEditing={() => pincodeInputRef.current.focus()} // Focus on the next input (pincode)
                />
                {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>पिन<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    ref={pincodeInputRef} // Reference for the pincode input
                    style={styles.input}
                    placeholder="पिन"
                    onChangeText={text => {
                        const numericText = text.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
                        setPincode(numericText);
                    }}
                    value={pincode}
                    maxLength={6}
                    keyboardType="numeric"
                    placeholderTextColor={"darkgrey"}
                    returnKeyType="done" // No further input, so "done"
                />

                {errors.pincode ? <Text style={styles.errorText}>{errors.pincode}</Text> : null}

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <Dropdown
                    style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 15 }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={styles.selectedTextStyle} data={idTypeData}
                    labelField="label"
                    valueField="value"
                    placeholder="आईडी प्रकार*"
                    value={idType}
                    onChange={item => setIdType(item.value)}
                    placeholderTextColor={"darkgrey"}
                />
                {errors.idType ? <Text style={styles.errorText}>{errors.idType}</Text> : null}

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>आईडी नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='आईडी नंबर*'
                    onChangeText={handleIdNumberChange}
                    value={idNumber}
                    placeholderTextColor={"darkgrey"}
                />
                {errors.idNumber ? <Text style={styles.errorText}>{errors.idNumber}</Text> : null}

                <View style={{ width: "85%" }}>
                    {hotelCategories.length > 0 && (
                        <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                            <Text style={{
                                fontSize: 12,
                                color: "#000",
                                marginTop: 20,
                                fontWeight: "500"
                            }}>अतिथि को दिए हुए कमरे की श्रेणी चुनें।<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            {hotelCategories.map((category, index) => (
                                <View key={category.idHotelRoomCategory} style={styles.categoryContainer}>
                                    <CheckBox
                                        value={category.isChecked}
                                        onValueChange={() => handleCategoryCheck(index)}
                                        tintColors='grey'
                                        onTintColor="grey"
                                        onFillColor='grey'
                                    />
                                    <Text style={{ fontSize: 13, color: "#000", fontWeight: "500", textTransform: "capitalize" }}>{category.CategoryName} - {category.iPrice}</Text>
                                </View>
                            ))}
                            <Text style={{
                                fontSize: 12,
                                color: "#000",
                                marginTop: 10,
                                fontWeight: "500"
                            }}>{categoryErrors ? <Text style={styles.errorText}>{categoryErrors}</Text> : null}</Text>

                        </View>
                    )}
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 5 }}>
                    <Text style={styles.lableText}>आईडी के फोटो अपलोड करें<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    {idFront ? (
                        <TouchableOpacity
                            style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => handleDocumentPicker(-1, 'idFront')}>
                            <Text style={{ fontSize: 12, color: "green" }}>Image Uploaded</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => handleDocumentPicker(-1, 'idFront')}>
                            <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    )}
                    {idBack ? (
                        <TouchableOpacity
                            style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => handleDocumentPicker(-1, 'idBack')}>
                            <Text style={{ fontSize: 12, color: "green" }}>Image Uploaded</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => handleDocumentPicker(-1, 'idBack')}>
                            <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    {idFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text> : (errors.idFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idFront}</Text> : null)}
                    {idBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}></Text> : (errors.idBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idBack}</Text> : null)}
                </View>

                {guests.map((guest, index) => (
                    <View key={index}>
                        <GuestForm
                            index={index}
                            guest={guest}
                            handleGuestChange={handleGuestChange}
                            handleDocumentPicker={handleDocumentPicker}
                            errors={errors.guests[index] || {}}
                        />
                    </View>
                ))}

                <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                    <Text style={styles.button}>Save</Text>
                </TouchableOpacity>

                <Modal transparent={true} animationType={'fade'} hardwareAccelerated={true} visible={openModal2}>
                    <Pressable style={styles.modalOverlay} onPress={() => setOpenModal2(false)}>
                        <View style={styles.modalView}>
                            <AlertIcon size={50} name="alert-circle-outline" color="#024063" style={{ marginLeft: 5 }} />
                            {
                                statusCode.StatusCode == -1 ?

                                    <Text style={[styles.modalText, { fontWeight: "400", fontSize: 14 }]}>{statusCode.Message}</Text>
                                    :
                                    statusCode.StatusCode == 0 ?
                                        <Text style={[styles.modalText, { fontWeight: "400", fontSize: 14 }]}>गेस्ट की एंट्री सेव हो गयी है | आप अन्य गेस्ट की जानकारी ऐड कर सकते है या पेंडिंग रिपोर्ट पे जेक इस रिपोर्ट को सबमिट कर सकते है</Text>
                                        :
                                        statusCode.StatusCode == 1 ?
                                            <Text style={[styles.modalText, { fontWeight: "400", fontSize: 14 }]}>{statusCode.Message}</Text>
                                            :
                                            null

                            }
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                {
                                    statusCode.StatusCode == -1 ?

                                        <Pressable style={styles.modalButton} onPress={() => setOpenModal2(false)}>
                                            <Text style={styles.textStyle}>ठीक</Text>
                                        </Pressable> :
                                        statusCode.StatusCode == 0 ?
                                            <Pressable style={styles.modalButton} onPress={() => navigation.navigate('BottomNavigator')}>
                                                <Text style={styles.textStyle}>ठीक</Text>
                                            </Pressable> :
                                            statusCode.StatusCode == 1 ?
                                                <Pressable style={styles.modalButton} onPress={() => navigation.navigate('BottomNavigator')}>
                                                    <Text style={styles.textStyle}>ठीक</Text>
                                                </Pressable> :
                                                null
                                }
                            </View>
                        </View>
                    </Pressable>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center", backgroundColor: "#fff"
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    dropdown: {
        marginVertical: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
    },
    guestContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: 'red',
    },
    successText: {
        color: 'green',
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    lableText: {
        fontSize: 12,
        color: "#000",
        marginLeft: 0,
        width: "45%",
        marginTop: 10
    },
    modalText: {
        textAlign: "center",
        color: "black",
        fontSize: 12,
        marginVertical: 7,
        fontWeight: "500"
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
        marginTop: 10,
    },
    buttonContainer: {
        borderRadius: 20,
        marginTop: 30,
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
        color: "grey"
    },
    selectedTextStyle: {
        fontSize: 12,
        color: "black"
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 12,
        color: "grey"
    },
    lableText: {
        fontSize: 12,
        color: "#000",
        marginLeft: 0,
        width: "45%",
        marginTop: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
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
        marginVertical: 7,
        fontWeight: "500"
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

export default AddGuestInPendingReport;










