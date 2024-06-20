// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
// import DatePicker from 'react-native-date-picker';
// import { Dropdown } from 'react-native-element-dropdown';
// import DocumentPicker from 'react-native-document-picker';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import PhotoIcon from "../assets/images/photologoicon.png"
// import CalendorIcon from "../assets/images/CalenderIcon.png"
// import Logo from "../assets/images/UjjainPoliceLogo.png"
// import axios from 'axios';
// import { baseUrl } from '../utils/env';

// const validationSchema = Yup.object().shape({

//     firstName: Yup.string().required('प्रथम नाम अनिवार्य'),
//     lastName: Yup.string().required('अंतिम नाम अनिवार्य'),
//     hotelName: Yup.string().required('होटल का नाम अनिवार्य'),
//     propertyType: Yup.string().required('सम्पत्ती का प्रकार अनिवार्य'),
//     gender: Yup.string().required('जेंडर अनिवार्य'),
//     mobileNumber: Yup.string().required('मोबाइल नंबर अनिवार्य').matches(/^[0-9]{10}$/, 'मोबाइल नंबर 10 अंकों का होना चाहिए'),
//     address: Yup.string().required('होटल का पता अनिवार्य'),
//     city: Yup.string().required('शहर अनिवार्य'),
//     pin: Yup.string().required('पिन अनिवार्य').matches(/^[0-9]{6}$/, 'पिन 6 अंकों का होना चाहिए'),
//     state: Yup.string().required('राज्य अनिवार्य'),
//     policeStation: Yup.string().required('थाना का नाम अनिवार्य'),
//     area: Yup.string().required('क्षेत्र अनिवार्य'),
//     emailID: Yup.string().required('होटल की ईमेल आईडी अनिवार्य'),
//     website: Yup.string().required('होटल की वेबसाइट अनिवार्य'),
//     idType: Yup.string().required('आईडी प्रकार अनिवार्य'),
//     idNumber: Yup.string().required('आईडी नंबर अनिवार्य'),
//     idFront: Yup.array().min(1, 'होटल का गुमस्ता अनिवार्य'),
//     idBack: Yup.array().min(1, 'मालिक का आधार अनिवार्य'),
// });

// const Signup = ({ navigation }) => {
//     const [propertyTypes, setPropertyTypes] = useState(null)

//     const data = [
//         { label: 'Movable Property', value: '1' },
//         { label: 'Immovable Property', value: '2' },
//         { label: 'Private Property', value: '3' },
//         { label: 'Personal Property  ', value: '4' },
//         { label: 'Public Property', value: '5' },
//         { label: 'Tangible Property', value: '6' },
//         { label: ' Intangible Property', value: '7' },
//         { label: 'Real Property', value: '8' },
//         { label: 'Corporeal Property', value: '9' },
//         { label: 'Incorporeal Property', value: '10' },
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



//     const signupAPI = async (values) => {
//         const config = {
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Content-type": "application/json"
//             }
//         };

//         let body = {
//             idHotelMaster: 0,
//             hotelName: values.hotelName,
//             address: values.address,
//             contact: values.mobileNumber,
//             contactPerson: `${values.firstName} ${values.lastName}`,
//             emailAddress: values.emailID,
//             bActive: true,
//             idPoliceStation: values.policeStation,
//             idState: values.state,
//             idCity: values.city,
//             idZone: values.area,
//             propertyType: values.propertyType,
//             fileGumasta: "82110f8a-a1df-49c3-be32-ca9f78bb02f3_WhatsApp Image 2024-03-10 at 15.52.08_bd3315ca.jpg",
//             fileAdhar: "82110f8a-a1df-49c3-be32-ca9f78bb02f3_WhatsApp Image 2024-03-10 at 15.52.08_bd3315ca.jpg",
//             contactPersonMobile: "1234567891",
//             website: "dfg",
//             filePass: ""

//         }
//         console.log("signupBody>>", body)
//         await axios.post(`${baseUrl}HotelSignUp`, body, config)
//             .then((res) => {
//                 console.log("response", res)
//             })
//             .catch(err => {
//                 console.log("errr", err)
//             });
//     };


//     return (
//         <ScrollView style={styles.container}>
//             <Formik
//                 initialValues={{
//                     firstName: '',
//                     lastName: '',
//                     hotelName: '',
//                     propertyType: '',
//                     gender: '',
//                     mobileNumber: '',
//                     address: '',
//                     city: '',
//                     pin: '',
//                     state: '',
//                     area: '',
//                     policeStation: '',
//                     emailID: '',
//                     website: '',
//                     idType: '',
//                     idNumber: '',
//                     idFront: [],
//                     idBack: [],
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={values => {
//                     signupAPI(values)
//                 }}
//             >
//                 {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
//                     <ScrollView style={styles.container}>

//                         <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
//                         <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
//                             <Image source={Logo} style={{ height: 80, width: 80 }} resizeMode='contain' />
//                             <Text style={styles.text}>Hotel Guest Registration</Text>
//                             <Text style={styles.text2}>Register to create account</Text>
//                         </View>

//                         <View style={styles.inputContainer}>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 <Text style={styles.lableText}>होटल मालिक नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                 <Text style={styles.lableText}>अंतिम नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 <TextInput
//                                     placeholderTextColor='darkgrey'
//                                     placeholder='होटल मालिक नाम*'
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
//                                 <Text style={styles.lableText}>होटल का नाम<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 keyboardType='number-pad'
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='होटल का नाम*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('hotelName')}
//                                 onBlur={handleBlur('hotelName')}
//                                 value={values.hotelName}
//                             />
//                             {touched.hotelName && errors.hotelName ? <Text style={styles.errorText}>{errors.hotelName}</Text> : null}

//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>होटल की ईमेल आईडी<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 keyboardType='number-pad'
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='होटल ईमेल आईडी*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('emailID')}
//                                 onBlur={handleBlur('emailID')}
//                                 value={values.emailID}
//                             />
//                             {touched.emailID && errors.emailID ? <Text style={styles.errorText}>{errors.emailID}</Text> : null}


//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>होटल का पता<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='होटल का पता*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('address')}
//                                 onBlur={handleBlur('address')}
//                                 value={values.address}
//                             />
//                             {touched.address && errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>सम्पत्ती का प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <Dropdown
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 placeholderStyle={styles.placeholderStyle}
//                                 selectedTextStyle={styles.selectedTextStyle}
//                                 inputSearchStyle={styles.inputSearchStyle}
//                                 data={data}
//                                 maxHeight={300}
//                                 labelField="label"
//                                 valueField="value"
//                                 placeholder="सम्पत्ती का प्रकार*"
//                                 value={propertyTypes}
//                                 onChange={item => {
//                                     setPropertyTypes(item.value);
//                                     setFieldValue('propertyType', item.value);
//                                 }}
//                             />
//                             {touched.propertyType && errors.propertyType ? <Text style={styles.errorText}>{errors.propertyType}</Text> : null}


//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>होटल मालिक का मो. नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 maxLength={10}
//                                 keyboardType='number-pad'
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='मोबाइल नंबर*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('mobileNumber')}
//                                 onBlur={handleBlur('mobileNumber')}
//                                 value={values.mobileNumber}
//                             />
//                             {touched.mobileNumber && errors.mobileNumber ? <Text style={styles.errorText}>{errors.mobileNumber}</Text> : null}

//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>शहर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                 <Text style={styles.lableText}>पिन<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>

//                                 <TextInput
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
//                                     placeholderTextColor='darkgrey'
//                                     placeholder='शहर*'
//                                     onChangeText={handleChange('city')}
//                                     onBlur={handleBlur('city')}
//                                     value={values.city}
//                                 />


//                                 <TextInput
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
//                                     placeholderTextColor='darkgrey'
//                                     placeholder='पिन*'
//                                     onChangeText={handleChange('pin')}
//                                     onBlur={handleBlur('pin')}
//                                     value={values.pin}
//                                     keyboardType='number-pad'
//                                     maxLength={6}
//                                 />
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 {touched.city && errors.city ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.city}</Text> : null}
//                                 {touched.pin && errors.pin ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.pin}</Text> : null}
//                             </View>

//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>राज्य<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                                 <Text style={styles.lableText}>क्षेत्र<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>

//                                 <TextInput
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
//                                     placeholderTextColor='darkgrey'
//                                     placeholder='राज्य*'
//                                     onChangeText={handleChange('state')}
//                                     onBlur={handleBlur('state')}
//                                     value={values.state}
//                                 />


//                                 <TextInput
//                                     style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
//                                     placeholderTextColor='darkgrey'
//                                     placeholder='क्षेत्र*'
//                                     onChangeText={handleChange('area')}
//                                     onBlur={handleBlur('area')}
//                                     value={values.area}
//                                 />
//                             </View>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                                 {touched.state && errors.state ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.state}</Text> : null}
//                                 {touched.area && errors.area ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.area}</Text> : null}
//                             </View>

//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>थाना<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='थाना*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('policeStation')}
//                                 onBlur={handleBlur('policeStation')}
//                                 value={values.policeStation}
//                             />
//                             {touched.policeStation && errors.policeStation ? <Text style={styles.errorText}>{errors.policeStation}</Text> : null}


//                             <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
//                                 <Text style={styles.lableText}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                             </View>
//                             <TextInput
//                                 placeholderTextColor='darkgrey'
//                                 placeholder='आईडी प्रकार*'
//                                 style={[styles.input, { marginTop: 8 }]}
//                                 onChangeText={handleChange('idType')}
//                                 onBlur={handleBlur('idType')}
//                                 value={values.idType}
//                             />
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
//                                 {touched.idFront && errors.idFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idFront}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>होटल का गुमस्ता</Text>}
//                                 {touched.idBack && errors.idBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idBack}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>मालिक का आधार</Text>}
//                             </View>

//                             <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
//                                 <Text style={styles.button}>SignUp</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </ScrollView>
//                 )}
//             </Formik>

//             <TouchableOpacity style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} onPress={() => navigation.navigate("Login")}>
//                 <Text style={[styles.greyText, { marginVertical: 20, color: "black", fontWeight: "400" }]}>Already have an account?
//                     <Text style={[styles.greyText, { marginVertical: 20, fontWeight: "500", color: '#1AA7FF' }]}> Login</Text>
//                 </Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// }

// export default Signup;


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
//     text: {
//         color: "black",
//         fontSize: 22,
//         fontWeight: "bold"
//     },
//     text2: {
//         color: "grey",
//         fontSize: 16,
//         fontWeight: "400"
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
//     },
//     selectedTextStyle: {
//         fontSize: 16,
//     },
//     inputSearchStyle: {
//         height: 40,
//         fontSize: 16,
//     },
//     lableText: {
//         fontSize: 12,
//         color: "#000",
//         marginLeft: 0,
//         width: "45%",
//         marginTop: 10
//     }
// });


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhotoIcon from "../assets/images/photologoicon.png";
import CalendorIcon from "../assets/images/CalenderIcon.png";
import Logo from "../assets/images/UjjainPoliceLogo.png";
import axios from 'axios';
import { baseUrl } from '../utils/env';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import ImageBase64 from 'react-native-image-base64';


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('प्रथम नाम अनिवार्य'),
    lastName: Yup.string().required('अंतिम नाम अनिवार्य'),
    hotelName: Yup.string().required('होटल का नाम अनिवार्य'),
    propertyType: Yup.string().required('सम्पत्ती का प्रकार अनिवार्य'),
    gender: Yup.string().required('जेंडर अनिवार्य'),
    mobileNumber: Yup.string().required('मोबाइल नंबर अनिवार्य').matches(/^[0-9]{10}$/, 'मोबाइल नंबर 10 अंकों का होना चाहिए'),
    address: Yup.string().required('होटल का पता अनिवार्य'),
    city: Yup.string().required('शहर अनिवार्य'),
    pin: Yup.string().required('पिन अनिवार्य').matches(/^[0-9]{6}$/, 'पिन 6 अंकों का होना चाहिए'),
    state: Yup.string().required('राज्य अनिवार्य'),
    policeStation: Yup.string().required('थाना का नाम अनिवार्य'),
    area: Yup.string().required('क्षेत्र अनिवार्य'),
    emailID: Yup.string().required('होटल की ईमेल आईडी अनिवार्य'),
    website: Yup.string().required('होटल की वेबसाइट अनिवार्य'),
    idType: Yup.string().required('आईडी प्रकार अनिवार्य'),
    idNumber: Yup.string().required('आईडी नंबर अनिवार्य'),
    idFront: Yup.array().min(1, 'होटल का गुमस्ता अनिवार्य'),
    idBack: Yup.array().min(1, 'मालिक का आधार अनिवार्य'),
});

const Signup = ({ navigation }) => {
    const [propertyTypes, setPropertyTypes] = useState(null);
    const [stateData, setStateData] = useState([])
    const [stateValue, setStateValue] = useState(null)
    const [cityData, setCityData] = useState([]);
    const [cityValue, setCityValue] = useState(null)
    const [zoneData, setZoneData] = useState([])
    const [zoneValue, setZoneValue] = useState(null)
    const [policeStationData, setPoliceStationData] = useState([])
    const [policeStationValue, setPoliceStationValue] = useState(null)
    const [propertyTypeData, setPropertyTypeData] = useState([])
    const [propertyTypeValue, setPropertyTypeValue] = useState(null)


    useEffect(() => {
        getState()
        getProType()
    }, [])

    const data = [
        { label: 'Movable Property', value: '1' },
        { label: 'Immovable Property', value: '2' },
        { label: 'Private Property', value: '3' },
        { label: 'Personal Property  ', value: '4' },
        { label: 'Public Property', value: '5' },
        { label: 'Tangible Property', value: '6' },
        { label: ' Intangible Property', value: '7' },
        { label: 'Real Property', value: '8' },
        { label: 'Corporeal Property', value: '9' },
        { label: 'Incorporeal Property', value: '10' },
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
            } else {
                console.log(err);
            }
        }
    };

    const userSignup = async (values) => {
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
            contact: values.mobileNumber,
            contactPerson: `${values.firstName} ${values.lastName}`,
            emailAddress: values.emailID,
            bActive: true,
            idPoliceStation: values.policeStation,
            idState: values.state,
            idCity: values.city,
            idZone: values.area,
            propertyType: values.propertyType,
            fileGumasta: "82110f8a-a1df-49c3-be32-ca9f78bb02f3_WhatsApp Image 2024-03-10 at 15.52.08_bd3315ca.jpg",
            fileAdhar: "82110f8a-a1df-49c3-be32-ca9f78bb02f3_WhatsApp Image 2024-03-10 at 15.52.08_bd3315ca.jpg",
            contactPersonMobile: "1234567891",
            website: "dfg",
            filePass: ""
        };

        try {
            const res = await axios.post(`${baseUrl}HotelSignUp`, body, config);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: response.data.Message
            });
            navigation.navigate("Login")
        } catch (err) {
            Toast.show({
                type: 'info',
                text1: 'Info',
                text2: err
            });
        }
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
                console.log("errr", err)
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
                console.log("errr", err)
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
                console.log("errr", err)
            });
    };


    const getZone = async (cityId) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };
        await axios.post(`${baseUrl}GetAllZone?CityId=${cityId}`, config)
            .then((res) => {
                const ZoneData = res.data.Result.map(item => ({
                    label: item.ZoneName,
                    value: item.idZone
                }));
                setZoneData(ZoneData)
            })
            .catch(err => {
                console.log("errr", err)
            });
    };

    const getPoliceStation = async (ZoneId) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };
        await axios.post(`${baseUrl}GetAllPoliceStation?idZone=${ZoneId}`, config)
            .then((res) => {
                const policeStationData = res.data.Result.map(item => ({
                    label: item.PoliceStationName,
                    value: item.idPoliceStationMaster
                }));
                setPoliceStationData(policeStationData)
            })
            .catch(err => {
                console.log("errr", err)
            });
    };
    return (
        <ScrollView style={styles.container}>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    hotelName: '',
                    propertyType: '',
                    // gender: '',
                    mobileNumber: '',
                    address: '',
                    city: '',
                    pin: '',
                    state: '',
                    area: '',
                    policeStation: '',
                    emailID: '',
                    // website: '',
                    idType: '',
                    idNumber: '',
                    idFront: [],
                    idBack: [],
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    userSignup(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <ScrollView style={styles.container}>
                        <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                            <Image source={Logo} style={{ height: 80, width: 80 }} resizeMode='contain' />
                            <Text style={styles.text}>Hotel Guest Registration</Text>
                            <Text style={styles.text2}>Register to create account</Text>
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
                                <Text style={styles.lableText}>शहर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                <Text style={styles.lableText}>पिन<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                <Dropdown
                                    style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
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
                                    }}

                                />
                                <TextInput
                                    style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
                                    placeholderTextColor='darkgrey'
                                    placeholder='पिन*'
                                    onChangeText={handleChange('pin')}
                                    onBlur={handleBlur('pin')}
                                    value={values.pin}
                                    keyboardType='number-pad'
                                    maxLength={6}
                                />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                {touched.city && errors.city ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.city}</Text> : null}
                                {touched.pin && errors.pin ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.pin}</Text> : null}
                            </View>

                            {/* State and Area */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>राज्य<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                                <Text style={styles.lableText}>क्षेत्र<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>



                                <Dropdown
                                    style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    labelField="label"
                                    valueField="value"
                                    placeholder='City*'
                                    search
                                    searchPlaceholder="Search"
                                    data={cityData}
                                    value={cityValue}
                                    onChange={item => {
                                        setCityValue(item.value);
                                        setFieldValue('city', item.value);
                                        getZone(item.value)
                                    }}
                                />
                                <Dropdown
                                    style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", marginTop: 8 }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    itemTextStyle={styles.selectedTextStyle}
                                    labelField="label"
                                    valueField="value"
                                    placeholder='क्षेत्र*'
                                    search
                                    searchPlaceholder="Search"
                                    data={zoneData}
                                    value={zoneValue}
                                    onChange={item => {
                                        setZoneValue(item.value);
                                        getPoliceStation(item.value)
                                        setFieldValue('area', item.value);
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                {touched.state && errors.state ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.state}</Text> : null}
                                {touched.area && errors.area ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.area}</Text> : null}
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
                                    setFieldValue('policeStation', item.value);
                                }}
                            />
                            {touched.policeStation && errors.policeStation ? <Text style={styles.errorText}>{errors.policeStation}</Text> : null}

                            {/* ID Type */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                                <Text style={styles.lableText}>आईडी प्रकार<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                            </View>
                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='आईडी प्रकार*'
                                style={[styles.input, { marginTop: 8 }]}
                                onChangeText={handleChange('idType')}
                                onBlur={handleBlur('idType')}
                                value={values.idType}
                            />
                            {touched.idType && errors.idType ? <Text style={styles.errorText}>{errors.idType}</Text> : null}

                            {/* ID Number */}
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

                            {/* ID Photos */}
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
                                {touched.idFront && errors.idFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idFront}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>होटल का गुमस्ता</Text>}
                                {touched.idBack && errors.idBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.idBack}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>मालिक का आधार</Text>}
                            </View>

                            {/* Submit Button */}
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => userSignup(values)}>
                                <Text style={styles.button}>SignUp</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
            </Formik>

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
        height: 50,
        marginTop: 20,
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
        color: "grey",
        fontSize: 16,
        fontWeight: "400"
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

});
