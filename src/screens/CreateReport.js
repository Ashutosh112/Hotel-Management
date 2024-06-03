import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhotoIcon from "../assets/images/photologoicon.png"
import BackIcon from "react-native-vector-icons/Ionicons"
import CalendorIcon from "../assets/images/CalenderIcon.png"


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
});

const CreateReport = ({ navigation }) => {
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [travelReason, setTravelReason] = useState(null);
    const [selectgender, setSelectgender] = useState(null);
    const [guestCount, setGuestCount] = useState(null)

    const data = [
        { label: 'Darshan', value: '1' },
        { label: 'Business', value: '2' },
        { label: 'Normal Visit', value: '3' },
        { label: 'Appointment', value: '4' },
        { label: 'Meeting', value: '5' },
        { label: 'Guest', value: '6' },
    ];

    const genderData = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
        { label: 'Other', value: '3' },
    ];

    const totalNoofGuest = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
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
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                console.log(values);
                navigation.navigate("Login");
            }}
        >
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

                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
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
                                }}
                            />
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
                                }}
                            />
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
                            value={values.mobileNumber}
                        />
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
                                }}
                            />


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
                                }}
                            />
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
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="यात्रा का उद्देश्य*"
                            value={travelReason}
                            onChange={item => {
                                setTravelReason(item.value);
                                setFieldValue('travelReason', item.value);
                            }}
                        />
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
                            value={values.address}
                        />
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
                            value={values.idType}
                        />
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

                        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                            <Text style={styles.button}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </Formik>
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


