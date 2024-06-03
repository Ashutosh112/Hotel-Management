import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Dimensions, ScrollView } from 'react-native';
import Logo from "../assets/images/UjjainPoliceLogo.png";
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Define validation schema with Yup
const validationSchema = Yup.object().shape({
    hotelName: Yup.string().required('होटल का नाम अनिवार्य है'),
    hotelAddress: Yup.string().required('होटल का पता अनिवार्य है'),
    ownerName: Yup.string().required('होटल मलिक का नाम अनिवार्य है'),
    ownerMobile: Yup.string().required('होटल मलिक का मोबाइल अनिवार्य है').matches(/^[0-9]{10}$/, 'मोबाइल नंबर 10 अंकों का होना चाहिए'),
    hotelWebsite: Yup.string().url('मान्य वेबसाइट URL दर्ज करें'),
    hotelEmail: Yup.string().email('मान्य मेल आईडी दर्ज करें').required('होटल मेल आईडी अनिवार्य है'),
    registeredMobile: Yup.string().required('रजिस्टर मोबाइल न. अनिवार्य है'),
    propertyType: Yup.string().required('प्रॉपर्टी प्रकार अनिवार्य है'),
    city: Yup.string().required('शहर अनिवार्य है'),
    state: Yup.string().required('राज्य अनिवार्य है'),
    area: Yup.string().required('क्षेत्र अनिवार्य है'),
    policeStation: Yup.string().required('थाना अनिवार्य है'),
    agreeToTerms: Yup.boolean().oneOf([true], 'आपको सभी शर्तों और नियमों से सहमत होना होगा'),
    gumastaFile: Yup.array().min(1, 'होटल का गुमस्ता अनिवार्य है'),
    aadharFile: Yup.array().min(1, 'मालिक का आधार अनिवार्य है'),
});


const Signup = ({ navigation }) => {
    const selectGumastaFile = async (setFieldValue) => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false
            });
            setFieldValue('gumastaFile', doc);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: 'User cancelled the file selection'
                });
            } else {
                console.log(err);
            }
        }
    };

    const selectAadharFile = async (setFieldValue) => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false
            });
            setFieldValue('aadharFile', doc);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: 'User cancelled the file selection'
                });
            } else {
                console.log(err);
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />

            <View style={styles.body}>
                <Image source={Logo} style={{ height: 80, width: 80 }} />
                <Text style={styles.text}>Hotel Registration</Text>
                <Text style={styles.text2}>Register to create account</Text>

                <Formik
                    initialValues={{
                        hotelName: '',
                        hotelAddress: '',
                        ownerName: '',
                        ownerMobile: '',
                        hotelWebsite: '',
                        hotelEmail: '',
                        registeredMobile: '',
                        propertyType: '',
                        city: '',
                        state: '',
                        area: '',
                        policeStation: '',
                        agreeToTerms: false,
                        gumastaFile: [],
                        aadharFile: []
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);

                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='होटल का नाम'
                                style={styles.input}
                                onChangeText={handleChange('hotelName')}
                                onBlur={handleBlur('hotelName')}
                                value={values.hotelName}
                            />
                            {errors.hotelName && touched.hotelName && <Text style={styles.errorText}>{errors.hotelName}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='होटल का पता'
                                style={styles.input}
                                onChangeText={handleChange('hotelAddress')}
                                onBlur={handleBlur('hotelAddress')}
                                value={values.hotelAddress}
                            />
                            {errors.hotelAddress && touched.hotelAddress && <Text style={styles.errorText}>{errors.hotelAddress}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='होटल मलिक का नाम'
                                style={styles.input}
                                onChangeText={handleChange('ownerName')}
                                onBlur={handleBlur('ownerName')}
                                value={values.ownerName}
                            />
                            {errors.ownerName && touched.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}

                            <TextInput
                                maxLength={10}
                                keyboardType='number-pad'
                                placeholderTextColor='darkgrey'
                                placeholder='होटल मलिक का मोबाइल'
                                style={styles.input}
                                onChangeText={handleChange('ownerMobile')}
                                onBlur={handleBlur('ownerMobile')}
                                value={values.ownerMobile}
                            />
                            {errors.ownerMobile && touched.ownerMobile && <Text style={styles.errorText}>{errors.ownerMobile}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='होटल की वेबसाइट'
                                style={styles.input}
                                onChangeText={handleChange('hotelWebsite')}
                                onBlur={handleBlur('hotelWebsite')}
                                value={values.hotelWebsite}
                            />
                            {errors.hotelWebsite && touched.hotelWebsite && <Text style={styles.errorText}>{errors.hotelWebsite}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='होटल मेल आईडी'
                                style={styles.input}
                                onChangeText={handleChange('hotelEmail')}
                                onBlur={handleBlur('hotelEmail')}
                                value={values.hotelEmail}
                            />
                            {errors.hotelEmail && touched.hotelEmail && <Text style={styles.errorText}>{errors.hotelEmail}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='रजिस्टर मोबाइल न.'
                                style={styles.input}
                                onChangeText={handleChange('registeredMobile')}
                                onBlur={handleBlur('registeredMobile')}
                                value={values.registeredMobile}
                            />
                            {errors.registeredMobile && touched.registeredMobile && <Text style={styles.errorText}>{errors.registeredMobile}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='प्रॉपर्टी प्रकार'
                                style={styles.input}
                                onChangeText={handleChange('propertyType')}
                                onBlur={handleBlur('propertyType')}
                                value={values.propertyType}
                            />
                            {errors.propertyType && touched.propertyType && <Text style={styles.errorText}>{errors.propertyType}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='शहर'
                                style={styles.input}
                                onChangeText={handleChange('city')}
                                onBlur={handleBlur('city')}
                                value={values.city}
                            />
                            {errors.city && touched.city && <Text style={styles.errorText}>{errors.city}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='राज्य'
                                style={styles.input}
                                onChangeText={handleChange('state')}
                                onBlur={handleBlur('state')}
                                value={values.state}
                            />
                            {errors.state && touched.state && <Text style={styles.errorText}>{errors.state}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='क्षेत्र'
                                style={styles.input}
                                onChangeText={handleChange('area')}
                                onBlur={handleBlur('area')}
                                value={values.area}
                            />
                            {errors.area && touched.area && <Text style={styles.errorText}>{errors.area}</Text>}

                            <TextInput
                                placeholderTextColor='darkgrey'
                                placeholder='थाना'
                                style={styles.input}
                                onChangeText={handleChange('policeStation')}
                                onBlur={handleBlur('policeStation')}
                                value={values.policeStation}
                            />
                            {errors.policeStation && touched.policeStation && <Text style={styles.errorText}>{errors.policeStation}</Text>}

                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                {values.gumastaFile.length > 0 ? (
                                    <TextInput
                                        placeholderTextColor='darkgrey'
                                        placeholder='File Uploaded'
                                        style={[styles.input, { width: "45%" }]}
                                        value='File Uploaded'
                                    />
                                ) : (
                                    <TextInput
                                        placeholderTextColor='darkgrey'
                                        placeholder='होटल का गुमस्ता'
                                        style={[styles.input, { width: "45%" }]}
                                    />
                                )}
                                <TouchableOpacity
                                    onPress={() => selectGumastaFile(setFieldValue)}
                                    style={[styles.input, { width: "45%", backgroundColor: '#2AAA8A', borderColor: '#2AAA8A', justifyContent: "center", alignItems: "center" }, values.gumastaFile.length > 0 ? { backgroundColor: 'grey' } : null, values.gumastaFile.length > 0 ? { borderColor: 'grey' } : null]}
                                    disabled={values.gumastaFile.length > 0}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "white" }}>Choose File</Text>
                                </TouchableOpacity>
                            </View>
                            {errors.gumastaFile && touched.gumastaFile && <Text style={styles.errorText}>{errors.gumastaFile}</Text>}

                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                {values.aadharFile.length > 0 ? (
                                    <TextInput
                                        placeholderTextColor='darkgrey'
                                        placeholder='Aadhar Uploaded'
                                        style={[styles.input, { width: "45%" }]}
                                        value='Aadhar Uploaded'
                                    />
                                ) : (
                                    <TextInput
                                        placeholderTextColor='darkgrey'
                                        placeholder='मालिक का आधार'
                                        style={[styles.input, { width: "45%" }]}
                                    />
                                )}
                                <TouchableOpacity
                                    onPress={() => selectAadharFile(setFieldValue)}
                                    style={[styles.input, { width: "45%", backgroundColor: '#2AAA8A', borderColor: '#2AAA8A', justifyContent: "center", alignItems: "center" }, values.aadharFile.length > 0 ? { backgroundColor: 'grey' } : null, values.aadharFile.length > 0 ? { borderColor: 'grey' } : null]}
                                    disabled={values.aadharFile.length > 0}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "white" }}>Choose File</Text>
                                </TouchableOpacity>
                            </View>
                            {errors.aadharFile && touched.aadharFile && <Text style={styles.errorText}>{errors.aadharFile}</Text>}

                            <View style={{ width: "85%", marginTop: 20, flexDirection: "row", alignItems: "center" }}>
                                <CheckBox
                                    disabled={false}
                                    value={values.agreeToTerms}
                                    onValueChange={(newValue) => setFieldValue('agreeToTerms', newValue)}
                                />
                                <Text> I agree to all terms & conditions</Text>
                            </View>
                            {errors.agreeToTerms && touched.agreeToTerms && <Text style={styles.errorText}>{errors.agreeToTerms}</Text>}

                            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                                <Text style={styles.button}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>

            <TouchableOpacity style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} onPress={() => navigation.navigate("Login")}>
                <Text style={[styles.greyText, { marginVertical: 20, color: "black", fontWeight: "400" }]}>Already have an account?
                    <Text style={[styles.greyText, { marginVertical: 20, fontWeight: "500" }]}> Login</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default Signup;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    text: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 28,
    },
    text2: {
        color: "#000",
        fontSize: 16,
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
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        borderRadius: 10,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#2AAA8A',
    },
    button: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "500",
    },
    greyText: {
        marginTop: 15,
        fontSize: 14,
        color: "#FFBF00",
        fontWeight: "bold",
    },
    errorText: {
        color: "#FF4545",
        marginTop: 5,
        width: "100%",
        marginLeft: 70,
        fontSize: 12
    },
});
