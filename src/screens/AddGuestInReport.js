import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhotoIcon from "../assets/images/photologoicon.png"
import BackIcon from "react-native-vector-icons/Ionicons"

const validationSchema = Yup.object().shape({

    firstName: Yup.string().required('प्रथम नाम अनिवार्य'),
    lastName: Yup.string().required('अंतिम नाम अनिवार्य'),
    gender: Yup.string().required('जेंडर अनिवार्य'),
    idType: Yup.string().required('आईडी प्रकार अनिवार्य'),
    idNumber: Yup.string().required('आईडी नंबर अनिवार्य'),
    guestIdFront: Yup.array().min(1, 'आईडी का Front अनिवार्य'),
    guestIdBack: Yup.array().min(1, 'आईडी का Back अनिवार्य'),
});

const AddGuestInReport = ({ navigation }) => {

    const [selectgender, setSelectgender] = useState(null);

    const data = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
        { label: 'Other', value: '3' },
    ];

    const selectGuestIdFrontFile = async (setFieldValue) => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false,
            });
            setFieldValue('guestIdFront', doc);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the file selection');
            } else {
                console.log(err);
            }
        }
    };

    const selectGuestIdBackFile = async (setFieldValue) => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false,
            });
            setFieldValue('guestIdBack', doc);
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
                firstName: '',
                lastName: '',
                gender: '',
                idType: '',
                idNumber: '',
                guestIdFront: [],
                guestIdBack: [],
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
                        <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>गेस्ट जोडे</Text>

                    </View>
                    <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                        <Text style={{ width: "100%", paddingHorizontal: 20, fontSize: 20, color: "#000" }}>Guest 01</Text>
                    </View>

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
                            <Text style={styles.lableText}>जेंडर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
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
                            placeholder="जेंडर*"
                            value={selectgender}
                            onChange={item => {
                                setSelectgender(item.value);
                                setFieldValue('gender', item.value);
                            }}
                        />
                        {touched.gender && errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}

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
                            {values.guestIdFront.length > 0 ? (
                                <TouchableOpacity
                                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectGuestIdFrontFile(setFieldValue)}>
                                    <Text>Image Uploaded</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectGuestIdFrontFile(setFieldValue)}>
                                    <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                                </TouchableOpacity>
                            )}

                            {values.guestIdBack.length > 0 ? (
                                <TouchableOpacity
                                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: 'grey', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectGuestIdBackFile(setFieldValue)}>
                                    <Text>Image Uploaded</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.input, { height: 80, width: "45%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", marginTop: 8, alignItems: "center" }]} onPress={() => selectGuestIdBackFile(setFieldValue)}>
                                    <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
                                </TouchableOpacity>

                            )}

                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            {touched.guestIdFront && errors.guestIdFront ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.guestIdFront}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>आईडी का Front</Text>}
                            {touched.guestIdBack && errors.guestIdBack ? <Text style={[styles.errorText, { marginLeft: 0, width: "45%", }]}>{errors.guestIdBack}</Text> : <Text style={[styles.lableText, { marginTop: 8 }]}>आईडी का Back</Text>}
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

export default AddGuestInReport;

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
        borderBottomWidth: 1,
        borderColor: "#E9E9E9",
        marginBottom: 50
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


