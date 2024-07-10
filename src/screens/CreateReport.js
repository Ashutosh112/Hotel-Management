// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Modal, Pressable } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import DocumentPicker from 'react-native-document-picker';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import PhotoIcon from "../assets/images/photologoicon.png";
// import BackIcon from "react-native-vector-icons/Ionicons";
// import CalendorIcon from "../assets/images/CalenderIcon.png";
// import axios from 'axios';
// import { baseUrl } from '../utils/env';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from 'moment';
// import InfoIcon from "react-native-vector-icons/Feather"
// import Alert from "react-native-vector-icons/Ionicons";
// import CheckBox from '@react-native-community/checkbox';


// const validationSchema = Yup.object().shape({
//     checkinDate: Yup.date().required('चेक इन तारीख अनिवार्य'),
//     checkoutDate: Yup.date().required('चेक आउट तारीख अनिवार्य'),
//     guestCount: Yup.number().required('गेस्ट की कुल संख्या अनिवार्य').positive().integer(),
//     firstName: Yup.string().required('प्रथम नाम अनिवार्य'),
//     lastName: Yup.string().required('अंतिम नाम अनिवार्य'),
//     gender: Yup.string().required('जेंडर अनिवार्य'),
//     mobileNumber: Yup.string().required('मोबाइल नंबर अनिवार्य').matches(/^[0-9]{10}$/, 'मोबाइल नंबर 10 अंकों का होना चाहिए'),
//     travelReason: Yup.string().required('यात्रा का उद्देश्य अनिवार्य'),
//     address: Yup.string().required('पता अनिवार्य'),
//     city: Yup.string().required('शहर अनिवार्य'),
//     pin: Yup.string().required('पिन अनिवार्य').matches(/^[0-9]{6}$/, 'पिन 6 अंकों का होना चाहिए'),
//     idType: Yup.string().required('आईडी प्रकार अनिवार्य'),
//     idNumber: Yup.string().required('आईडी नंबर अनिवार्य'),
//     idFront: Yup.array().min(1, 'आईडी का Front अनिवार्य'),
//     idBack: Yup.array().min(1, 'आईडी का Back अनिवार्य'),
// });

// const CreateReport = ({ navigation }) => {

//     const [travelReason, setTravelReason] = useState('दर्शन');
//     const [selectgender, setSelectgender] = useState(null);
//     const [guestCount, setGuestCount] = useState('1'); // Default to 1
//     const [hotelData, setHotelData] = useState(null);
//     const [idSelect, setIdSelect] = useState('आधार कार्ड')
//     const [openModal, setOpenModal] = useState(false)
//     const [openModal2, setOpenModal2] = useState(false)
//     const [categories, setCategories] = useState([]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [successModal, setSuccessModal] = useState(false)

//     const [checkinDate, setCheckinDate] = useState(new Date());
//     const [checkoutDate, setCheckoutDate] = useState(new Date());
//     const [showCheckinPicker, setShowCheckinPicker] = useState(false);
//     const [showCheckoutPicker, setShowCheckoutPicker] = useState(false);


//     const onChangeCheckin = (event, selectedDate) => {
//         const currentDate = selectedDate || checkinDate;
//         setShowCheckinPicker(false);
//         setCheckinDate(currentDate);
//         setFieldValue('checkinDate', currentDate);

//         if (currentDate > checkoutDate) {
//             setCheckoutDate(currentDate);
//             setFieldValue('checkoutDate', currentDate); // Update checkout date if necessary
//         }
//     };

//     const onChangeCheckout = (event, selectedDate) => {
//         const currentDate = selectedDate || checkoutDate;
//         setShowCheckoutPicker(false);
//         if (currentDate >= checkinDate) {
//             setCheckoutDate(currentDate);
//             setFieldValue('checkoutDate', currentDate); // Assuming you have a setFieldValue function
//         } else {
//             Alert.alert('Error', 'Checkout date cannot be earlier than check-in date');
//         }
//     };

//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);


//     useEffect(() => {
//         hotelRoomCategory()
//     }, [])


//     const travelReasonData = [
//         { label: 'दर्शन', value: 'दर्शन' },
//         { label: 'अध्यन या सेमिनार', value: 'अध्यन या सेमिनार' },
//         { label: 'सत्संग', value: 'सत्संग' },
//         { label: 'पारिवारिक या मित्रो से मिलना', value: 'पारिवारिक या मित्रो से मिलना' },
//         { label: 'व्यापारिक या व्यावासयिक यात्रा', value: 'व्यापारिक या व्यावासयिक यात्रा' },
//         { label: 'अन्य', value: 'अन्य' },
//     ];

//     const genderData = [
//         { label: 'पुरुष', value: 'पुरुष' },
//         { label: 'महिला', value: 'महिला' },
//         { label: 'अन्य', value: 'अन्य' },
//     ];

//     const additionalGuestGenderData = [
//         { label: 'पुरुष', value: 'पुरुष' },
//         { label: 'महिला', value: 'महिला' },
//         { label: 'अन्य', value: 'अन्य' },
//     ];

//     const totalNoofGuest = [
//         { label: '1', value: '1' },
//         { label: '2', value: '2' },
//         { label: '3', value: '3' },
//         { label: '4', value: '4' },
//         { label: '5', value: '5' },
//         { label: '6', value: '6' },
//         { label: '7', value: '7' },
//         { label: '8', value: '8' },
//         { label: '9', value: '9' },
//         { label: '10', value: '10' },
//     ];

//     const idTypeData = [
//         { label: 'आधार कार्ड', value: 'आधार कार्ड' },
//         { label: 'पासपोर्ट', value: 'पासपोर्ट' },
//         { label: 'वोटर आई कार्ड', value: 'वोटर आई कार्ड' },
//         { label: 'ड्राइविंग लाइसेंस', value: 'ड्राइविंग लाइसेंस' },
//         { label: 'पैन कार्ड', value: 'पैन कार्ड' },
//         { label: 'राशन कार्ड', value: 'राशन कार्ड' },
//         { label: 'सरकारी कर्मचारी पहचान पत्र', value: 'सरकारी कर्मचारी पहचान पत्र' },
//         { label: 'विदेशियों का पंजीकरण कार्ड (FRC)', value: 'विदेशियों का पंजीकरण कार्ड (FRC)' },
//         { label: ' कोई अन्य सरकारी जारी किया गया पहचान पत्र', value: ' कोई अन्य सरकारी जारी किया गया पहचान पत्र' },
//     ];

//     const additionalGuestidTypeData = [
//         { label: 'आधार कार्ड', value: 'आधार कार्ड' },
//         { label: 'पासपोर्ट', value: 'पासपोर्ट' },
//         { label: 'वोटर आई कार्ड', value: 'वोटर आई कार्ड' },
//         { label: 'ड्राइविंग लाइसेंस', value: 'ड्राइविंग लाइसेंस' },
//         { label: 'पैन कार्ड', value: 'पैन कार्ड' },
//         { label: 'राशन कार्ड', value: 'राशन कार्ड' },
//         { label: 'सरकारी कर्मचारी पहचान पत्र', value: 'सरकारी कर्मचारी पहचान पत्र' },
//         { label: 'विदेशियों का पंजीकरण कार्ड (FRC)', value: 'विदेशियों का पंजीकरण कार्ड (FRC)' },
//         { label: ' कोई अन्य सरकारी जारी किया गया पहचान पत्र', value: ' कोई अन्य सरकारी जारी किया गया पहचान पत्र' },
//     ];

//     const selectIdFrontFile = async (setFieldValue) => {
//         try {
//             const doc = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
//                 allowMultiSelection: false,
//             });
//             setFieldValue('idFront', doc);
//         } catch (err) {
//             if (DocumentPicker.isCancel(err)) {
//                 console.log('User cancelled the file selection');
//             } else {
//                 console.log(err);
//             }
//         }
//     };

//     const selectIdBackFile = async (setFieldValue) => {
//         try {
//             const doc = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
//                 allowMultiSelection: false,
//             });
//             setFieldValue('idBack', doc);
//         } catch (err) {
//             if (DocumentPicker.isCancel(err)) {
//                 console.log('User cancelled the file selection');
//             } else {
//                 console.log(err);
//             }
//         }
//     };

//     useEffect(() => {
//         const fetchHotelData = async () => {
//             try {
//                 const value = await AsyncStorage.getItem('hotelmgmt');
//                 if (value !== null) {
//                     let updatedValue = JSON.parse(value);
//                     setHotelData(updatedValue);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchHotelData();
//     }, []); // Empty dependency array to run only once

//     const sendFormData = async (values) => {
//         const value = await AsyncStorage.getItem('hotelmgmt');
//         let updatedValue = JSON.parse(value);
//         const config = {
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Content-type": "application/json",
//                 "Authorization": `${updatedValue.Token}`
//             }
//         };

//         // Collect additional guest details dynamically
//         let details = [];
//         for (let i = 1; i < values.guestCount; i++) {
//             details.push({
//                 idGuest: 0,
//                 sName: values[`guestFirstName${i}`],
//                 identificationNo: values[`guestIdNumber${i}`],
//                 identificationType: values[`guestIdType${i}`],
//                 image: "82110f8a-a1df-49c3-be32-ca9f78bb02f3_WhatsApp Image 2024-03-10 at 15.52.08_bd3315ca.jpg", // Assign base64 encoded image 1
//                 gender: values[`guestGender${i}`],
//                 filePass: null,
//                 lastName: values[`guestLastName${i}`],
//                 image2: "565cb8c4-cbf4-47fc-81ee-7483a2c84b6d_WhatsApp Image 2024-03-10 at 15.52.06_48034e3c.jpg" // Assign base64 encoded image 2
//             });
//         }

//         // Prepare the request body
//         let body = {
//             idGuestMaster: updatedValue.idHotelMaster,
//             idHotel: hotelData?.idHotelMaster,
//             contactNo: values.mobileNumber,
//             checkInDate: moment(values.checkinDate).format("DD-MMM-YYYY"),
//             checkOutDate: moment(values.checkoutDate).format("DD-MMM-YYYY"),
//             description: "None",
//             bActive: true,
//             guestName: values.firstName,
//             identificationNo: values.idNumber,
//             identificationType: values.idType,
//             address: values.address,
//             isDeleted: false,
//             details: details,
//             categories: selectedCategories.map(category => ({
//                 categoryName: category.CategoryName,
//                 iPrice: category.iPrice,
//                 noOfRoom: 1
//             })),

//             addionalGuest: values.guestCount - 1,
//             hotelName: hotelData?.HotelName,
//             guestLastName: values.lastName,
//             gender: values.gender,
//             travelReson: values.travelReason,
//             city: values.city,
//             pIncode: values.pin,
//             filePass: "7d465d03", // Example filePass value
//             image1: "82110f8a-a1df-49c3-be32-ca9f78bb02f3_WhatsApp Image 2024-03-10 at 15.52.08_bd3315ca.jpg",
//             image2: "565cb8c4-cbf4-47fc-81ee-7483a2c84b6d_WhatsApp Image 2024-03-10 at 15.52.06_48034e3c.jpg"
//         };
//         console.log(">>>>>>>>>>>>>>>", body)
//         axios.post(`${baseUrl}InsertUpdateDeleteGuestMaster`, body, config)
//             .then(response => {
//                 // navigation.navigate("BottomNavigator")
//                 // Toast.show({
//                 //     type: 'success',
//                 //     text1: 'Success',
//                 //     text2: response.data.Message
//                 // });
//                 setOpenModal2(true)
//             })
//             .catch(error => {
//                 console.error('Error sending form data:', error);
//                 Toast.show({
//                     type: 'error',
//                     text1: 'Error',
//                     text2: 'Failed to send form data'
//                 });
//             });
//     };


//     const hotelRoomCategory = async () => {
//         // setIsLoading(true);
//         const value = await AsyncStorage.getItem('hotelmgmt');
//         let updatedValue = JSON.parse(value);
//         const config = {
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Content-type": "application/json",
//                 "Authorization": `${updatedValue.Token}`
//             }
//         };
//         await axios.post(`${baseUrl}HotelCategory?idHotel=${updatedValue.idHotelMaster}`, {}, config)
//             .then((res) => {
//                 // setIsLoading(false);
//                 setCategories(res.data.Result);
//             })
//             .catch(err => {
//                 // setIsLoading(false);
//             });
//     };

//     const handleCheckboxChange = (index) => {
//         const updatedCategories = [...categories];
//         updatedCategories[index].bChecked = !updatedCategories[index].bChecked;
//         setCategories(updatedCategories);

//         if (updatedCategories[index].bChecked) {
//             setSelectedCategories([...selectedCategories, updatedCategories[index]]);
//         } else {
//             setSelectedCategories(selectedCategories.filter((_, i) => i !== index));
//         }
//     };



//     return (
//         <>
//             <Formik
//                 initialValues={{
//                     checkinDate: new Date(), // Default to today's date
//                     checkoutDate: new Date(), // Default to today's date
//                     guestCount: 1,
//                     firstName: '',
//                     lastName: '',
//                     gender: '',
//                     mobileNumber: '',
//                     travelReason: 'दर्शन',
//                     address: '',
//                     city: '',
//                     pin: '',
//                     idType: 'आधार कार्ड',
//                     idNumber: '',
//                     idFront: [],
//                     idBack: [],
//                     // Initial values for additional guests
//                     guestFirstName1: '',
//                     guestLastName1: '',
//                     guestGender1: '',
//                     guestIdType1: '',
//                     guestIdNumber1: '',
//                     // Add more fields as needed
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={values => {
//                     sendFormData(values, hotelData);
//                 }} >
//                 {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
//                     <ScrollView style={styles.container}>

//                         <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
//                             <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
//                                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                                     <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
//                                 </TouchableOpacity>
//                                 <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>अतिथि की जानकारी दर्ज करें</Text>
//                             </View>

//                             {/* <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
//                                 <TouchableOpacity onPress={() => setOpenModal(true)}>
//                                     <InfoIcon name="info" size={24} color="#fff" style={{ marginRight: 15 }} />
//                                 </TouchableOpacity>
//                             </View> */}
//                         </View>

//                         <View style={{ marginHorizontal: 25, justifyContent: "center", alignItems: "flex-start" }}>
//                             <Text style={styles.modalText}>|| कृपया ध्यान दें ||</Text>
//                             <Text style={[styles.modalText, { textAlign: "justify" }]}>1. इस फॉर्म के माध्यम से आप गेस्ट की एंट्री सेव कर रहे हैं। इसे थाने में भेजने के लिए कृपया पेंडिंग रिपोर्ट में जाकर इस रिपोर्ट को सबमिट करें।</Text>
//                             <Text style={[styles.modalText, { textAlign: "justify" }]}>2. एक बार रिपोर्ट थाने में सबमिट करने के बाद उस तारीख के लिए आप कोई नए गेस्ट की एंट्री नहीं कर पाएंगे।</Text>
//                             <Text style={[styles.modalText, { textAlign: "justify" }]}>3. आप सिर्फ आज (Today)और कल(Yesterday) के चेक-इन के लिए ही एंट्री कर सकते हैं।</Text>
//                             <Text style={[styles.modalText, { textAlign: "justify" }]}>4. 5MB से अधिक की इमेज अपलोड नहीं हो पाएगी। कृपया इमेज का साइज कम करके अपलोड करें।</Text>
//                             <Text style={[styles.modalText, { textAlign: "justify" }]}>4. होटलों की जिम्मेदारी है कि वे वेबसाइट के माध्यम से सबमिट की गई सभी अतिथि जानकारी की सटीकता और वैधता सुनिश्चित करें। इसमें अतिथि के नाम, मोबाइल नंबर, और आधार विवरण की पुष्टि शामिल है।</Text>
//                         </View>

//                         <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
//                         <View style={styles.inputContainer}>
//                             <Text style={[styles.lableText, { fontSize: 16, fontWeight: "400", color: "#000", width: "auto", marginVertical: 5 }]}>प्राथमिक अतिथि की जानकारी</Text>

//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 <Text style={styles.lableText}>प्रथम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                 <Text style={styles.lableText}>अंतिम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 <TextInput
//                                     placeholderTextColor='darkgrey'
//                                     placeholder='प्रथम नाम*'
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
//                                     onChangeText={handleChange('firstName')}
//                                     onBlur={handleBlur('firstName')}
//                                     value={values.firstName}
//                                 />
//                                 <TextInput
//                                     placeholderTextColor='darkgrey'
//                                     placeholder='अंतिम नाम*'
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
//                                     onChangeText={handleChange('lastName')}
//                                     onBlur={handleBlur('lastName')}
//                                     value={values.lastName}
//                                 />
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 {touched.firstName && errors.firstName ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.firstName}</Text> : null}
//                                 {touched.lastName && errors.lastName ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.lastName}</Text> : null}
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>चेक इन तारीख<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                 <Text style={styles.lableText}>चेक आउट तारीख<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>


//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 <TouchableOpacity
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "space-between", marginTop: 8, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }]}
//                                     onPress={() => setShowCheckinPicker(true)}>
//                                     <Text>{checkinDate ? moment(checkinDate).format("DD-MM-YYYY") : "चेक इन तारीख*"}</Text>
//                                     <Image source={CalendorIcon} style={{ height: 15, width: 15 }} />
//                                 </TouchableOpacity>

//                                 {showCheckinPicker && (
//                                     <DateTimePicker
//                                         value={checkinDate}
//                                         mode="date"
//                                         display="default"
//                                         onChange={onChangeCheckin}
//                                         minimumDate={yesterday}
//                                         maximumDate={today}
//                                     />
//                                 )}

//                                 <TouchableOpacity
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "space-between", marginTop: 8, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }]}
//                                     onPress={() => setShowCheckoutPicker(true)}>
//                                     <Text>{checkoutDate ? moment(checkoutDate).format("DD-MM-YYYY") : "चेक आउट तारीख*"}</Text>
//                                     <Image source={CalendorIcon} style={{ height: 15, width: 15 }} />
//                                 </TouchableOpacity>

//                                 {showCheckoutPicker && (
//                                     <DateTimePicker
//                                         value={checkoutDate}
//                                         mode="date"
//                                         display="default"
//                                         onChange={onChangeCheckout}
//                                         minimumDate={yesterday}
//                                     />
//                                 )}
//                             </View>

//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 {touched.checkinDate && errors.checkinDate ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.checkinDate}</Text> : null}
//                                 {touched.checkoutDate && errors.checkoutDate ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.checkoutDate}</Text> : null}
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>मोबाइल नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 maxLength={10}
//                                 keyboardType='number-pad'
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='मोबाइल नंबर*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('mobileNumber')}
//                                 onBlur={handleBlur('mobileNumber')}
//                                 value={values.mobileNumber} />
//                             {touched.mobileNumber && errors.mobileNumber ? <Text style={styles.errorText}>{errors.mobileNumber}</Text> : null}
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>जेंडर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                 <Text style={styles.lableText}>गेस्ट की कुल संख्या<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 <Dropdown
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
//                                     placeholderStyle={styles.placeholderStyle}
//                                     selectedTextStyle={styles.selectedTextStyle}
//                                     inputSearchStyle={styles.inputSearchStyle}
//                                     itemTextStyle={styles.selectedTextStyle}
//                                     data={genderData}
//                                     maxHeight={300}
//                                     labelField="label"
//                                     valueField="value"
//                                     placeholder="जेंडर*"
//                                     value={selectgender}
//                                     onChange={item => {
//                                         setSelectgender(item.value);
//                                         setFieldValue('gender', item.value);
//                                     }} />
//                                 <Dropdown
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
//                                     placeholderStyle={styles.placeholderStyle}
//                                     selectedTextStyle={styles.selectedTextStyle}
//                                     inputSearchStyle={styles.inputSearchStyle}
//                                     itemTextStyle={styles.selectedTextStyle}
//                                     data={totalNoofGuest}
//                                     maxHeight={300}
//                                     labelField="label"
//                                     valueField="value"
//                                     placeholder='कुल गेस्ट संख्या*'
//                                     value={guestCount}
//                                     onChange={item => {
//                                         setGuestCount(item.value);
//                                         setFieldValue('guestCount', item.value);
//                                     }} />
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 {touched.gender && errors.gender ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.gender}</Text> : null}
//                                 {touched.guestCount && errors.guestCount ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.guestCount}</Text> : null}
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>यात्रा का उद्देश्य<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <Dropdown
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 placeholderStyle={styles.placeholderStyle}
//                                 selectedTextStyle={styles.selectedTextStyle}
//                                 inputSearchStyle={styles.inputSearchStyle}
//                                 itemTextStyle={styles.selectedTextStyle}
//                                 data={travelReasonData}
//                                 maxHeight={300}
//                                 labelField="label"
//                                 valueField="value"
//                                 placeholder="यात्रा का उद्देश्य*"
//                                 value={travelReason}
//                                 onChange={item => {
//                                     setTravelReason(item.value);
//                                     setFieldValue('travelReason', item.value);
//                                 }} />
//                             {touched.travelReason && errors.travelReason ? <Text style={styles.errorText}>{errors.travelReason}</Text> : null}
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>पता<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='पता*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('address')}
//                                 onBlur={handleBlur('address')}
//                                 value={values.address} />
//                             {touched.address && errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>शहर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='शहर*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('city')}
//                                 onBlur={handleBlur('city')}
//                                 value={values.city}
//                             />
//                             {touched.city && errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>पिन<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='पिन*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('pin')}
//                                 onBlur={handleBlur('pin')}
//                                 value={values.pin}
//                                 keyboardType='number-pad'
//                                 maxLength={6}
//                             />
//                             {touched.pin && errors.pin ? <Text style={styles.errorText}>{errors.pin}</Text> : null}
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <Dropdown
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 placeholderStyle={styles.placeholderStyle}
//                                 selectedTextStyle={styles.selectedTextStyle}
//                                 inputSearchStyle={styles.inputSearchStyle}
//                                 itemTextStyle={styles.selectedTextStyle}
//                                 data={idTypeData}
//                                 maxHeight={300}
//                                 labelField="label"
//                                 valueField="value"
//                                 placeholder="आईडी प्रकार*"
//                                 value={idSelect}
//                                 onChange={item => {
//                                     setIdSelect(item.value);
//                                     setFieldValue('idType', item.value);
//                                 }} />
//                             {touched.idType && errors.idType ? <Text style={styles.errorText}>{errors.idType}</Text> : null}
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>आईडी नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='आईडी नंबर*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('idNumber')}
//                                 onBlur={handleBlur('idNumber')}
//                                 value={values.idNumber}
//                             />
//                             {touched.idNumber && errors.idNumber ? <Text style={styles.errorText}>{errors.idNumber}</Text> : null}

//                             <View style={{ width: "90%", marginTop: 10 }}>
//                                 <Text style={{
//                                     fontSize: 12,
//                                     color: "#000",
//                                     marginTop: 10,
//                                     fontWeight: "500"
//                                 }}>अतिथि को दिए हुए कमरे की श्रेणी चुनें।<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             {categories.map((category, index) => (
//                                 <View style={{ flexDirection: "row" }}>
//                                     <View key={index} style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginHorizontal: 25, marginVertical: 7 }}>
//                                         <CheckBox
//                                             disabled={false}
//                                             value={category.bChecked}
//                                             onValueChange={() => handleCheckboxChange(index)}
//                                         />
//                                         <Text style={{ fontSize: 13, color: "#000", fontWeight: "400" }}>
//                                             {`${category.CategoryName} - ${category.iPrice}`}
//                                         </Text>
//                                     </View>
//                                     <View style={{ flex: .1, flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 25, marginVertical: 5 }}>

//                                     </View>
//                                 </View>

//                             ))}

//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>आईडी के फोटो अपलोड करें<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 {values.idFront.length > 0 ? (
//                                     <TouchableOpacity
//                                         style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectIdFrontFile(setFieldValue)}>
//                                         <Text>Image Uploaded</Text>
//                                     </TouchableOpacity>
//                                 ) : (
//                                     <TouchableOpacity
//                                         style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectIdFrontFile(setFieldValue)}>
//                                         <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
//                                     </TouchableOpacity>
//                                 )}
//                                 {values.idBack.length > 0 ? (
//                                     <TouchableOpacity
//                                         style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectIdBackFile(setFieldValue)}>
//                                         <Text>Image Uploaded</Text>
//                                     </TouchableOpacity>
//                                 ) : (
//                                     <TouchableOpacity
//                                         style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectIdBackFile(setFieldValue)}>
//                                         <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
//                                     </TouchableOpacity>
//                                 )}
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 {touched.idFront && errors.idFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idFront}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>आईडी का Front</Text>}
//                                 {touched.idBack && errors.idBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idBack}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>आईडी का Back</Text>}
//                             </View>

//                             {/* Render additional guest forms */}
//                             {[...Array(Math.max(values.guestCount - 1, 0))].map((_, index) => (
//                                 <View key={index} style={styles.inputContainer}>
//                                     <Text style={{ fontSize: 16, color: "#000", marginBottom: 10, textAlign: "left", marginTop: 10 }}>अतिरिक्त अतिथि {index + 1}</Text>
//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                         <Text style={styles.lableText}>प्रथम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                         <Text style={styles.lableText}>अंतिम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                     </View>
//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                         <TextInput
//                                             placeholderTextColor='darkgrey'
//                                             placeholder='प्रथम नाम*'
//                                             style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
//                                             onChangeText={handleChange(`guestFirstName${index + 1}`)}
//                                             onBlur={handleBlur(`guestFirstName${index + 1}`)}
//                                             value={values[`guestFirstName${index + 1}`]} />
//                                         <TextInput
//                                             placeholderTextColor='darkgrey'
//                                             placeholder='अंतिम नाम*'
//                                             style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
//                                             onChangeText={handleChange(`guestLastName${index + 1}`)}
//                                             onBlur={handleBlur(`guestLastName${index + 1}`)}
//                                             value={values[`guestLastName${index + 1}`]} />
//                                     </View>
//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                         {touched[`guestFirstName${index + 1}`] && errors[`guestFirstName${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors[`guestFirstName${index + 1}`]}</Text> : null}
//                                         {touched[`guestLastName${index + 1}`] && errors[`guestLastName${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors[`guestLastName${index + 1}`]}</Text> : null}
//                                     </View>

//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                         <Text style={styles.lableText}>लिंग<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                         <Text style={styles.lableText}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                     </View>
//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                         <Dropdown
//                                             style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}

//                                             placeholderStyle={styles.placeholderStyle}
//                                             selectedTextStyle={styles.selectedTextStyle}
//                                             inputSearchStyle={styles.inputSearchStyle}
//                                             itemTextStyle={styles.selectedTextStyle}
//                                             data={additionalGuestGenderData}
//                                             labelField="label"
//                                             valueField="value"
//                                             placeholder='लिंग*'
//                                             value={values[`guestGender${index + 1}`]}
//                                             onChange={item => {
//                                                 setFieldValue(`guestGender${index + 1}`, item.value);
//                                             }}
//                                         />
//                                         <Dropdown
//                                             style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}

//                                             placeholderStyle={styles.placeholderStyle}
//                                             selectedTextStyle={styles.selectedTextStyle}
//                                             inputSearchStyle={styles.inputSearchStyle}
//                                             itemTextStyle={styles.selectedTextStyle}
//                                             data={additionalGuestidTypeData}
//                                             labelField="label"
//                                             valueField="value"
//                                             placeholder='आईडी प्रकार*'
//                                             value={values[`guestIdType${index + 1}`]}
//                                             onChange={item => {
//                                                 setFieldValue(`guestIdType${index + 1}`, item.value);
//                                             }}
//                                         />
//                                     </View>
//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                         {touched[`guestGender${index + 1}`] && errors[`guestGender${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors[`guestGender${index + 1}`]}</Text> : null}
//                                         {touched[`guestIdType${index + 1}`] && errors[`guestIdType${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors[`guestIdType${index + 1}`]}</Text> : null}
//                                     </View>

//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 }}>
//                                         <Text style={styles.lableText}>आईडी नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                     </View>
//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                         <TextInput
//                                             placeholderTextColor='darkgrey'
//                                             placeholder='आईडी नंबर*'
//                                             style={[styles.input, { width: "100%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]}
//                                             onChangeText={handleChange(`guestIdNumber${index + 1}`)}
//                                             onBlur={handleBlur(`guestIdNumber${index + 1}`)}
//                                             value={values[`guestIdNumber${index + 1}`]} />
//                                     </View>
//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                         {touched[`guestIdNumber${index + 1}`] && errors[`guestIdNumber${index + 1}`] ? <Text style={[styles.errorText, { marginLeft: 0, width: "100%", }]}>{errors[`guestIdNumber${index + 1}`]}</Text> : null}
//                                     </View>

//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                         <Text style={styles.lableText}>आईडी के फोटो अपलोड करें<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                     </View>
//                                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                         {values[`guestImage1${index + 1}`]?.length > 0 ? (
//                                             <TouchableOpacity
//                                                 style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
//                                                 onPress={() => selectIdFrontFile(setFieldValue, `guestIdFront${index + 1}`)}>
//                                                 <Text>Image Uploaded</Text>
//                                             </TouchableOpacity>
//                                         ) : (
//                                             <TouchableOpacity
//                                                 style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
//                                                 onPress={() => selectIdFrontFile(setFieldValue, `guestIdFront${index + 1}`)}>
//                                                 <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
//                                             </TouchableOpacity>
//                                         )}

//                                         {values[`guestImage2${index + 1}`]?.length > 0 ? (
//                                             <TouchableOpacity
//                                                 style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
//                                                 onPress={() => selectIdBackFile(setFieldValue, `guestIdBack${index + 1}`)}>
//                                                 <Text>Image Uploaded</Text>
//                                             </TouchableOpacity>
//                                         ) : (
//                                             <TouchableOpacity
//                                                 style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]}
//                                                 onPress={() => selectIdBackFile(setFieldValue, `guestIdBack${index + 1}`)}>
//                                                 <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
//                                             </TouchableOpacity>
//                                         )}
//                                     </View>
//                                 </View>
//                             ))}
//                             <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
//                                 <Text style={styles.button}>Save</Text>
//                             </TouchableOpacity>
//                         </View>

//                         <Modal transparent={true} animationType={'fade'} hardwareAccelerated={true} visible={openModal2}>
//                             <Pressable style={styles.modalOverlay} onPress={() => setOpenModal2(false)}>
//                                 <View style={styles.modalView}>
//                                     <Alert size={50} name="alert-circle-outline" color="#024063" style={{ marginLeft: 5 }} />
//                                     <Text style={[styles.modalText, { fontWeight: "400", fontSize: 14 }]}>गेस्ट की एंट्री सेव हो गयी है | आप अन्य गेस्ट की जानकारी ऐड कर सकते है या पेंडिंग रिपोर्ट पे जेक इस रिपोर्ट को सबमिट कर सकते है</Text>
//                                     <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
//                                         <Pressable style={styles.modalButton} onPress={() => navigation.navigate("BottomNavigator")}>
//                                             <Text style={styles.textStyle}>ठीक</Text>
//                                         </Pressable>
//                                         <Pressable style={styles.modalButton}>
//                                             <Text style={styles.textStyle}>अन्य गेस्ट जोडे</Text>
//                                         </Pressable>
//                                     </View>
//                                     <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
//                                         <Pressable style={styles.modalButton}>
//                                             <Text style={styles.textStyle}>रिपोर्ट सबमिट करे</Text>
//                                         </Pressable>
//                                         <Pressable style={styles.modalButton}>
//                                             <Text style={styles.textStyle}>रिपोर्ट देखे</Text>
//                                         </Pressable>
//                                     </View>
//                                 </View>
//                             </Pressable>
//                         </Modal>
//                     </ScrollView>
//                 )
//                 }
//             </Formik >
//             {/* <Modal transparent={true} animationType={'fade'} hardwareAccelerated={true} visible={openModal}>
//                 <Pressable style={styles.modalOverlay} onPress={() => setOpenModal(false)}>
//                     <View style={styles.modalView}>
//                         <Text style={[styles.modalText, { fontWeight: "500", fontSize: 14 }]}>अतिथि की जानकारी दर्ज करें</Text>
//                         <Text style={styles.modalText}>|| कृपया ध्यान दें ||</Text>
//                         <Text style={[styles.modalText, { textAlign: "justify" }]}>1. इस फॉर्म के माध्यम से आप गेस्ट की एंट्री सेव कर रहे हैं। इसे थाने में भेजने के लिए कृपया पेंडिंग रिपोर्ट में जाकर इस रिपोर्ट को सबमिट करें।</Text>
//                         <Text style={[styles.modalText, { textAlign: "justify" }]}>2. एक बार रिपोर्ट थाने में सबमिट करने के बाद उस तारीख के लिए आप कोई नए गेस्ट की एंट्री नहीं कर पाएंगे।</Text>
//                         <Text style={[styles.modalText, { textAlign: "justify" }]}>3. आप सिर्फ आज (Today)और कल(Yesterday) के चेक-इन के लिए ही एंट्री कर सकते हैं।</Text>
//                         <Text style={[styles.modalText, { textAlign: "justify" }]}>4. 5MB से अधिक की इमेज अपलोड नहीं हो पाएगी। कृपया इमेज का साइज कम करके अपलोड करें।</Text>
//                         <Text style={[styles.modalText, { textAlign: "justify" }]}>4. होटलों की जिम्मेदारी है कि वे वेबसाइट के माध्यम से सबमिट की गई सभी अतिथि जानकारी की सटीकता और वैधता सुनिश्चित करें। इसमें अतिथि के नाम, मोबाइल नंबर, और आधार विवरण की पुष्टि शामिल है।</Text>

//                         <Pressable style={styles.modalButton} onPress={() => setOpenModal(false)}>
//                             <Text style={styles.textStyle}>ठीक</Text>
//                         </Pressable>
//                     </View>
//                 </Pressable>
//             </Modal> */}
//         </>

//     );
// };

// export default CreateReport;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     input: {
//         width: Dimensions.get('window').width - 60,
//         backgroundColor: '#fff',
//         borderWidth: 1,
//         borderColor: '#E3E2E2',
//         borderRadius: 10,
//         paddingHorizontal: 20,
//         color: "#000",
//         height: 50,
//         marginTop: 20,
//     },
//     inputContainer: {
//         marginTop: 20,
//         justifyContent: "center",
//         alignItems: "center",

//     },
//     buttonContainer: {
//         borderRadius: 20,
//         marginTop: 16,
//         width: Dimensions.get('window').width - 60,
//         height: 50,
//         marginBottom: 20,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: '#1AA7FF',
//     },
//     button: {
//         fontSize: 18,
//         textAlign: 'center',
//         color: '#fff',
//         fontWeight: "500",
//     },
//     errorText: {
//         color: "#FF4545",
//         marginTop: 5,
//         width: "100%",
//         marginLeft: 70,
//         fontSize: 12
//     },
//     placeholderStyle: {
//         fontSize: 14,
//         color: "grey"
//     },
//     selectedTextStyle: {
//         fontSize: 12,
//         color: "black"
//     },
//     inputSearchStyle: {
//         height: 40,
//         fontSize: 12,
//     },
//     lableText: {
//         fontSize: 12,
//         color: "#000",
//         marginLeft: 0,
//         width: "45%",
//         marginTop: 10
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 15,
//         padding: 20,
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     textStyle: {
//         color: "white",
//         textAlign: "center",
//         fontSize: 12
//     },
//     modalText: {
//         textAlign: "center",
//         color: "black",
//         fontSize: 12,
//         marginVertical: 5
//     },
//     modalOverlay: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#00000060'
//     },
//     modalButton: {
//         backgroundColor: "#024063",
//         paddingHorizontal: 40,
//         paddingVertical: 12,
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 10,
//         marginVertical: 10
//     },

// });




import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Modal, Pressable, Alert } from 'react-native';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import InfoIcon from "react-native-vector-icons/Feather"
import AlertIcon from "react-native-vector-icons/Ionicons";
import CheckBox from '@react-native-community/checkbox';


const idTypeErrorMessages = {
    "आधार कार्ड": 'कृपया अपना आधार कार्ड संख्या जांचें',
    "ड्राइविंग लाइसेंस": 'कृपया अपना ड्राइविंग लाइसेंस संख्या जांचें',
    "पासपोर्ट": 'कृपया अपना पासपोर्ट संख्या जांचें',
    "वोटर आईडी कार्ड": 'कृपया अपना वोटर आईडी संख्या जांचें',
    "पैन कार्ड": 'कृपया अपना पैन कार्ड संख्या जांचें',
    "राशन कार्ड": 'कृपया अपना राशन कार्ड संख्या जांचें',
    "default": 'Invalid ID number'
};

const idTypePatterns = {
    "आधार कार्ड": /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
    "ड्राइविंग लाइसेंस": /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
    "पासपोर्ट": /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
    "वोटर आईडी कार्ड": /^[A-Z]{3}[0-9]{7}$/,
    "पैन कार्ड": /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    "राशन कार्ड": /^([a-zA-Z0-9]){8,12}\s*$/,
    "default": /^(?=.*\d).{5,}$/
};

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
    idNumber: Yup.string().when('idType', (idType, schema) => {
        const pattern = idTypePatterns[idType] || idTypePatterns["default"];
        const errorMessage = idTypeErrorMessages[idType] || idTypeErrorMessages["default"];
        return schema.matches(pattern, errorMessage).required(' कृपया पहचान संख्या दर्ज करें।');
    }),
    idFront: Yup.array().min(1, 'आईडी का Front अपलोड करें। केवल .jpg, .JPG, .jpeg, .png और .PNG छवि प्रारूपों की अनुमति है। फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए... '),
    idBack: Yup.array().min(1, 'आईडी का Back अपलोड करें। केवल .jpg, .JPG, .jpeg, .png और .PNG छवि प्रारूपों की अनुमति है। फ़ाइल का आकार 5MB से अधिक नहीं होना चाहिए... '),
    categories: Yup.array()
        .of(Yup.object().shape({
            CategoryName: Yup.string(),
            iPrice: Yup.number(),
            bChecked: Yup.boolean()
        }))
        .test('at-least-one-checked', 'एक श्रेणी अवश्य चयनित होनी चाहिए', (categories) => {
            return categories.some(category => category.bChecked);
        })
});

const CreateReport = ({ navigation }) => {



    const [travelReason, setTravelReason] = useState('दर्शन');
    const [selectgender, setSelectgender] = useState(null);
    const [guestCount, setGuestCount] = useState('1'); // Default to 1
    const [hotelData, setHotelData] = useState(null);
    const [idSelect, setIdSelect] = useState('आधार कार्ड')
    const [openModal2, setOpenModal2] = useState(false)
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [checkoutDate, setCheckoutDate] = useState(new Date());
    const [showCheckoutPicker, setShowCheckoutPicker] = useState(false);
    const [statusCode, setStatusCode] = useState({})

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Format dates
    const todayFormatted = `Today (${moment(today).format("DD/MM/YYYY")})`;
    const yesterdayFormatted = `Yesterday (${moment(yesterday).format("DD/MM/YYYY")})`;

    // Create the date options
    const dateOptions = [
        { label: yesterdayFormatted, value: yesterday },
        { label: todayFormatted, value: today },
    ];

    // Set the default selected date label
    const [checkinDate, setCheckinDate] = useState(dateOptions[0].value); // today's date as default
    const [selectedLabel, setSelectedLabel] = useState(dateOptions[0].label);

    const onChangeCheckout = (event, selectedDate) => {
        const currentDate = selectedDate || checkoutDate;
        setShowCheckoutPicker(false);
        if (currentDate >= checkinDate) {
            setCheckoutDate(currentDate);
            setFieldValue('checkoutDate', currentDate); // Assuming you have a setFieldValue function
        } else {
            Alert.alert('Error', 'Checkout date cannot be earlier than check-in date');
        }
    };


    useEffect(() => {
        hotelRoomCategory()
        submitValidateDate()
    }, [])


    const travelReasonData = [
        { label: 'दर्शन', value: 'दर्शन' },
        { label: 'अध्यन या सेमिनार', value: 'अध्यन या सेमिनार' },
        { label: 'सत्संग', value: 'सत्संग' },
        { label: 'पारिवारिक या मित्रो से मिलना', value: 'पारिवारिक या मित्रो से मिलना' },
        { label: 'व्यापारिक या व्यावासयिक यात्रा', value: 'व्यापारिक या व्यावासयिक यात्रा' },
        { label: 'अन्य', value: 'अन्य' },
    ];

    const genderData = [
        { label: 'पुरुष', value: 'पुरुष' },
        { label: 'महिला', value: 'महिला' },
        { label: 'अन्य', value: 'अन्य' },
    ];

    const additionalGuestGenderData = [
        { label: 'पुरुष', value: 'पुरुष' },
        { label: 'महिला', value: 'महिला' },
        { label: 'अन्य', value: 'अन्य' },
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

    const additionalGuestidTypeData = [
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

    const submitValidateDate = async () => {
        // setIsLoading(true);
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `${updatedValue.Token}`
            }
        };
        console.log("dateeeee+++++", yesterday)
        await axios.post(`${baseUrl}ValidateSubmitDate?HotelId=${updatedValue.idHotelMaster}&SubmitDate=${moment(yesterday).format("10/MMM/YYYY")}`, {}, config)
            .then((res) => {
                // setIsLoading(false);
                console.log("submitValidateDate----", res.data)
            })
            .catch(err => {
                // setIsLoading(false);
            });
    };

    const sendFormData = async (values) => {
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `${updatedValue.Token}`
            }
        };

        // Collect additional guest details dynamically
        let details = [];
        for (let i = 1; i < values.guestCount; i++) {
            details.push({
                idGuest: 0,
                sName: values[`guestFirstName${i}`],
                identificationNo: values[`guestIdNumber${i}`],
                identificationType: values[`guestIdType${i}`],
                image: "82110f8a-a1df-49c3-be32-ca9f78bb02f3_WhatsApp Image 2024-03-10 at 15.52.08_bd3315ca.jpg", // Assign base64 encoded image 1
                gender: values[`guestGender${i}`],
                filePass: null,
                lastName: values[`guestLastName${i}`],
                image2: "565cb8c4-cbf4-47fc-81ee-7483a2c84b6d_WhatsApp Image 2024-03-10 at 15.52.06_48034e3c.jpg" // Assign base64 encoded image 2
            });
        }

        // Prepare the request body
        let body = {
            // idGuestMaster: updatedValue.idHotelMaster,
            idHotel: hotelData?.idHotelMaster,
            contactNo: values.mobileNumber,
            checkInDate: moment(values.checkinDate).format("DD/MMM/YYYY"),
            checkOutDate: moment(values.checkoutDate).format("DD/MMM/YYYY"),
            description: "None",
            bActive: true,
            guestName: values.firstName,
            identificationNo: values.idNumber,
            identificationType: values.idType,
            address: values.address,
            isDeleted: false,
            details: details,
            categories: selectedCategories.map(category => ({
                categoryName: category.CategoryName,
                iPrice: category.iPrice,
                noOfRoom: 1
            })),

            addionalGuest: values.guestCount - 1,
            hotelName: hotelData?.HotelName,
            guestLastName: values.lastName,
            gender: values.gender,
            travelReson: values.travelReason,
            city: values.city,
            pIncode: values.pin,
            filePass: "7d465d03", // Example filePass value
            image1: "82110f8a-a1df-49c3-be32-ca9f78bb02f3_WhatsApp Image 2024-03-10 at 15.52.08_bd3315ca.jpg",
            image2: "565cb8c4-cbf4-47fc-81ee-7483a2c84b6d_WhatsApp Image 2024-03-10 at 15.52.06_48034e3c.jpg"
        };
        console.log(">>>>>>>>>>>>>>>", body)
        await axios.post(`${baseUrl}InsertUpdateDeleteGuestMaster`, body, config)
            .then(response => {
                console.log("RESPONSE----", response.data)
                setStatusCode(response.data)
                setOpenModal2(true)
            })
            .catch(error => {
                console.error('Error sending form data:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to send form data'
                });
            });
    };


    const hotelRoomCategory = async () => {
        // setIsLoading(true);
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}HotelCategory?idHotel=${updatedValue.idHotelMaster}`, {}, config)
            .then((res) => {
                // setIsLoading(false);
                console.log("resss", res.data)
                setCategories(res.data.Result);
            })
            .catch(err => {
                // setIsLoading(false);
            });
    };

    const handleCheckboxChange = (index, setFieldValue) => {
        const updatedCategories = [...categories];
        updatedCategories[index].bChecked = !updatedCategories[index].bChecked;
        setCategories(updatedCategories);

        const selectedCategories = updatedCategories.filter(category => category.bChecked);
        setSelectedCategories(selectedCategories);
        setFieldValue('categories', updatedCategories);
    };


    return (
        <>
            <Formik
                initialValues={{
                    checkinDate: new Date(), // Default to today's date
                    checkoutDate: new Date(), // Default to today's date
                    guestCount: 1,
                    firstName: '',
                    lastName: '',
                    gender: '',
                    mobileNumber: '',
                    travelReason: 'दर्शन',
                    address: '',
                    city: '',
                    pin: '',
                    idType: 'आधार कार्ड',
                    idNumber: '',
                    idFront: [],
                    idBack: [],
                    categories: categories,
                    selectedCategories: selectedCategories,
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
                    sendFormData(values, hotelData);
                }} >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <ScrollView style={styles.container}>

                        <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                                </TouchableOpacity>
                                <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>अतिथि की जानकारी दर्ज करें</Text>
                            </View>

                            {/* <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={() => setOpenModal(true)}>
                                    <InfoIcon name="info" size={24} color="#fff" style={{ marginRight: 15 }} />
                                </TouchableOpacity>
                            </View> */}
                        </View>

                        <View style={{ marginHorizontal: 25, justifyContent: "center", alignItems: "center" }}>
                            <Text style={[styles.modalText, { fontSize: 14 }]}>|| कृपया ध्यान दें ||</Text>
                            <Text style={[styles.modalText, { textAlign: "justify" }]}>1. इस फॉर्म के माध्यम से आप गेस्ट की एंट्री सेव कर रहे हैं। इसे थाने में भेजने के लिए कृपया पेंडिंग रिपोर्ट में जाकर इस रिपोर्ट को सबमिट करें।</Text>
                            <Text style={[styles.modalText, { textAlign: "justify" }]}>2. एक बार रिपोर्ट थाने में सबमिट करने के बाद उस तारीख के लिए आप कोई नए गेस्ट की एंट्री नहीं कर पाएंगे।</Text>
                            <Text style={[styles.modalText, { textAlign: "justify" }]}>3. आप सिर्फ आज (Today)और कल(Yesterday) के चेक-इन के लिए ही एंट्री कर सकते हैं।</Text>
                            <Text style={[styles.modalText, { textAlign: "justify" }]}>4. 5MB से अधिक की इमेज अपलोड नहीं हो पाएगी। कृपया इमेज का साइज कम करके अपलोड करें।</Text>
                            <Text style={[styles.modalText, { textAlign: "justify" }]}>4. होटलों की जिम्मेदारी है कि वे वेबसाइट के माध्यम से सबमिट की गई सभी अतिथि जानकारी की सटीकता और वैधता सुनिश्चित करें। इसमें अतिथि के नाम, मोबाइल नंबर, और आधार विवरण की पुष्टि शामिल है।</Text>
                        </View>

                        <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
                        <View style={styles.inputContainer}>
                            <Text style={[styles.lableText, { fontSize: 16, fontWeight: "400", color: "#000", width: "auto", marginVertical: 5 }]}>प्राथमिक अतिथि की जानकारी</Text>

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
                                <Dropdown
                                    style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
                                    placeholderStyle={[styles.placeholderStyle, { fontSize: 12 }]}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    data={dateOptions}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={selectedLabel}
                                    value={checkinDate}
                                    onChange={item => {
                                        setCheckinDate(item.value);
                                        setSelectedLabel(item.label);
                                        setFieldValue('checkinDate', item.value);
                                    }}
                                />


                                <TouchableOpacity
                                    style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "space-between", marginTop: 8, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }]}
                                    onPress={() => setShowCheckoutPicker(true)}>
                                    <Text>{checkoutDate ? moment(checkoutDate).format("DD-MM-YYYY") : "चेक आउट तारीख*"}</Text>
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
                                    itemTextStyle={styles.selectedTextStyle}
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
                                    itemTextStyle={styles.selectedTextStyle}
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
                                itemTextStyle={styles.selectedTextStyle}
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
                                maxLength={6}
                            />
                            {touched.pin && errors.pin ? <Text style={styles.errorText}>{errors.pin}</Text> : null}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <Dropdown
                                style={[styles.input, { marginTop: 8 }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                itemTextStyle={styles.selectedTextStyle}
                                data={idTypeData}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="आईडी प्रकार*"
                                value={idSelect}
                                onChange={item => {
                                    setIdSelect(item.value);
                                    setFieldValue('idType', item.value);
                                }} />
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

                            {
                                categories.length > 1 ?
                                    <View style={{ width: "90%", marginTop: 10 }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: "#000",
                                            marginVertical: 10,
                                            fontWeight: "500"
                                        }}>अतिथि को दिए हुए कमरे की श्रेणी चुनें।<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                    </View>
                                    :
                                    null
                            }

                            {categories.map((category, index) => (
                                <View key={index} style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginHorizontal: 25, marginVertical: 2 }}>
                                        <CheckBox
                                            disabled={false}
                                            value={category.bChecked}
                                            onValueChange={() => handleCheckboxChange(index, setFieldValue)}
                                        />
                                        <Text style={{ fontSize: 13, color: "#000", fontWeight: "500" }}>
                                            {`${category.CategoryName} - ${category.iPrice}`}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                            {touched.categories && errors.categories ? <Text style={styles.errorText}>{errors.categories}</Text> : null}

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
                                    <Text style={{ fontSize: 16, color: "#000", marginBottom: 10, textAlign: "left", marginTop: 10 }}>अतिरिक्त अतिथि {index + 1}</Text>
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

                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            itemTextStyle={styles.selectedTextStyle}
                                            data={additionalGuestGenderData}
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

                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            itemTextStyle={styles.selectedTextStyle}
                                            data={additionalGuestidTypeData}
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

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 }}>
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
                                    </View>
                                </View>
                            ))}
                            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                                <Text style={styles.button}>Save</Text>
                            </TouchableOpacity>
                        </View>

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
                                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
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
                                                        <Pressable style={styles.modalButton} onPress={() => setOpenModal2(false)}>
                                                            <Text style={styles.textStyle}>ठीक</Text>
                                                        </Pressable> :
                                                        null

                                        }

                                        {/* <Pressable style={styles.modalButton}>
                                            <Text style={styles.textStyle}>अन्य गेस्ट जोडे</Text>
                                        </Pressable> */}
                                    </View>
                                    {/* <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
                                        <Pressable style={styles.modalButton}>
                                            <Text style={styles.textStyle}>रिपोर्ट सबमिट करे</Text>
                                        </Pressable>
                                        <Pressable style={styles.modalButton}>
                                            <Text style={styles.textStyle}>रिपोर्ट देखे</Text>
                                        </Pressable>
                                    </View> */}
                                </View>
                            </Pressable>
                        </Modal>
                    </ScrollView>
                )
                }
            </Formik >
            {/* <Modal transparent={true} animationType={'fade'} hardwareAccelerated={true} visible={openModal}>
                <Pressable style={styles.modalOverlay} onPress={() => setOpenModal(false)}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, { fontWeight: "500", fontSize: 14 }]}>अतिथि की जानकारी दर्ज करें</Text>
                        <Text style={styles.modalText}>|| कृपया ध्यान दें ||</Text>
                        <Text style={[styles.modalText, { textAlign: "justify" }]}>1. इस फॉर्म के माध्यम से आप गेस्ट की एंट्री सेव कर रहे हैं। इसे थाने में भेजने के लिए कृपया पेंडिंग रिपोर्ट में जाकर इस रिपोर्ट को सबमिट करें।</Text>
                        <Text style={[styles.modalText, { textAlign: "justify" }]}>2. एक बार रिपोर्ट थाने में सबमिट करने के बाद उस तारीख के लिए आप कोई नए गेस्ट की एंट्री नहीं कर पाएंगे।</Text>
                        <Text style={[styles.modalText, { textAlign: "justify" }]}>3. आप सिर्फ आज (Today)और कल(Yesterday) के चेक-इन के लिए ही एंट्री कर सकते हैं।</Text>
                        <Text style={[styles.modalText, { textAlign: "justify" }]}>4. 5MB से अधिक की इमेज अपलोड नहीं हो पाएगी। कृपया इमेज का साइज कम करके अपलोड करें।</Text>
                        <Text style={[styles.modalText, { textAlign: "justify" }]}>4. होटलों की जिम्मेदारी है कि वे वेबसाइट के माध्यम से सबमिट की गई सभी अतिथि जानकारी की सटीकता और वैधता सुनिश्चित करें। इसमें अतिथि के नाम, मोबाइल नंबर, और आधार विवरण की पुष्टि शामिल है।</Text>

                        <Pressable style={styles.modalButton} onPress={() => setOpenModal(false)}>
                            <Text style={styles.textStyle}>ठीक</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal> */}
        </>

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
        marginTop: 10,
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




