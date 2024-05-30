import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

const AddGuestInReport = ({ navigation }) => {
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [travelReason, setTravelReason] = useState(null);
    const [selectgender, setSelectgender] = useState(null);

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
                    <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
                    <View style={styles.inputContainer}>
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
                        <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 0 }]} onPress={() => setOpen(true)}>
                            <Text>{checkinDate ? checkinDate.toLocaleDateString() : "चेक इन तारीख*"}</Text>
                        </TouchableOpacity>
                        {touched.checkinDate && errors.checkinDate ? <Text style={styles.errorText}>{errors.checkinDate}</Text> : null}

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
                        <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 20 }]} onPress={() => setOpen2(true)}>
                            <Text>{checkoutDate ? checkoutDate.toLocaleDateString() : "चेक आउट तारीख*"}</Text>
                        </TouchableOpacity>
                        {touched.checkoutDate && errors.checkoutDate ? <Text style={styles.errorText}>{errors.checkoutDate}</Text> : null}

                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='गेस्ट की कुल संख्या*'
                            style={styles.input}
                            onChangeText={handleChange('guestCount')}
                            onBlur={handleBlur('guestCount')}
                            value={values.guestCount}
                            keyboardType='number-pad'
                        />
                        {touched.guestCount && errors.guestCount ? <Text style={styles.errorText}>{errors.guestCount}</Text> : null}

                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='प्रथम नाम*'
                            style={styles.input}
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                        />
                        {touched.firstName && errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='अंतिम नाम*'
                            style={styles.input}
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                        />
                        {touched.lastName && errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

                        <Dropdown
                            style={styles.input}
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
                        {touched.gender && errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}

                        <TextInput
                            maxLength={10}
                            keyboardType='number-pad'
                            placeholderTextColor='darkgrey'
                            placeholder='मोबाइल नंबर*'
                            style={styles.input}
                            onChangeText={handleChange('mobileNumber')}
                            onBlur={handleBlur('mobileNumber')}
                            value={values.mobileNumber}
                        />
                        {touched.mobileNumber && errors.mobileNumber ? <Text style={styles.errorText}>{errors.mobileNumber}</Text> : null}

                        <Dropdown
                            style={styles.input}
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

                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='पता*'
                            style={styles.input}
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address}
                        />
                        {touched.address && errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='शहर*'
                            style={styles.input}
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={values.city}
                        />
                        {touched.city && errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}

                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='पिन*'
                            style={styles.input}
                            onChangeText={handleChange('pin')}
                            onBlur={handleBlur('pin')}
                            value={values.pin}
                            keyboardType='number-pad'
                        />
                        {touched.pin && errors.pin ? <Text style={styles.errorText}>{errors.pin}</Text> : null}

                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='आईडी प्रकार*'
                            style={styles.input}
                            onChangeText={handleChange('idType')}
                            onBlur={handleBlur('idType')}
                            value={values.idType}
                        />
                        {touched.idType && errors.idType ? <Text style={styles.errorText}>{errors.idType}</Text> : null}

                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='आईडी नंबर*'
                            style={styles.input}
                            onChangeText={handleChange('idNumber')}
                            onBlur={handleBlur('idNumber')}
                            value={values.idNumber}
                        />
                        {touched.idNumber && errors.idNumber ? <Text style={styles.errorText}>{errors.idNumber}</Text> : null}

                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            {values.idFront.length > 0 ? (
                                <TextInput
                                    placeholderTextColor='darkgrey'
                                    placeholder='File Uploaded'
                                    style={[styles.input, { width: "45%" }]}
                                    editable={false}
                                    value="File Uploaded"
                                />
                            ) : (
                                <TextInput
                                    placeholderTextColor='darkgrey'
                                    placeholder='आईडी का Front*'
                                    style={[styles.input, { width: "45%" }]}
                                    editable={false}
                                />
                            )}
                            <TouchableOpacity
                                onPress={() => selectIdFrontFile(setFieldValue)}
                                style={[styles.input, { width: "45%", backgroundColor: '#2AAA8A', borderColor: '#2AAA8A', justifyContent: "center", alignItems: "center" }, values.idFront.length > 0 ? { backgroundColor: 'grey' } : null, values.idFront.length > 0 ? { borderColor: 'grey' } : null]}
                            >
                                <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "white" }}>Choose File</Text>
                            </TouchableOpacity>
                        </View>
                        {touched.idFront && errors.idFront ? <Text style={styles.errorText}>{errors.idFront}</Text> : null}

                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                            {values.idBack.length > 0 ? (
                                <TextInput
                                    placeholderTextColor='grey'
                                    placeholder='Aadhar Uploaded'
                                    style={[styles.input, { width: "45%" }]}
                                    editable={false}
                                    value="File Uploaded"
                                />
                            ) : (
                                <TextInput
                                    placeholderTextColor='grey'
                                    placeholder='आईडी का Back*'
                                    style={[styles.input, { width: "45%" }]}
                                    editable={false}
                                />
                            )}
                            <TouchableOpacity
                                onPress={() => selectIdBackFile(setFieldValue)}
                                style={[styles.input, { width: "45%", backgroundColor: '#2AAA8A', borderColor: '#2AAA8A', justifyContent: "center", alignItems: "center" }, values.idBack.length > 0 ? { backgroundColor: 'grey' } : null, values.idBack.length > 0 ? { borderColor: 'grey' } : null]}
                            >
                                <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "white" }}>Choose File</Text>
                            </TouchableOpacity>
                        </View>
                        {touched.idBack && errors.idBack ? <Text style={styles.errorText}>{errors.idBack}</Text> : null}

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
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        borderRadius: 10,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginBottom: 20,
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
});
