// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView } from 'react-native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required('नाम अनिवार्य'),
//     mobileNumber: Yup.string().required('मोबाइल नंबर अनिवार्य').matches(/^[0-9]{10}$/, 'मोबाइल नंबर 10 अंकों का होना चाहिए'),
//     idNumber: Yup.string().required('आईडी नंबर अनिवार्य'),
// });

// const SearchGuest = ({ navigation }) => {
//     return (
//         <Formik
//             initialValues={{
//                 name: '',
//                 mobileNumber: '',
//                 idNumber: '',
//             }}
//             validationSchema={validationSchema}
//             onSubmit={values => {
//                 console.log(values);

//             }}
//         >
//             {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//                 <ScrollView style={styles.container}>
//                     <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
//                     <View style={styles.inputContainer}>
//                         <TextInput
//                             placeholderTextColor='darkgrey'
//                             placeholder='नाम*'
//                             style={[styles.input, { marginTop: 0 }]}
//                             onChangeText={handleChange('name')}
//                             onBlur={handleBlur('name')}
//                             value={values.name}
//                         />
//                         {touched.name && errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

//                         <TextInput
//                             placeholderTextColor='darkgrey'
//                             placeholder='मोबाइल नंबर*'
//                             style={styles.input}
//                             keyboardType='number-pad'
//                             onChangeText={handleChange('mobileNumber')}
//                             onBlur={handleBlur('mobileNumber')}
//                             value={values.mobileNumber}
//                         />
//                         {touched.mobileNumber && errors.mobileNumber ? <Text style={styles.errorText}>{errors.mobileNumber}</Text> : null}

//                         <TextInput
//                             placeholderTextColor='darkgrey'
//                             placeholder='आईडी नंबर*'
//                             style={styles.input}
//                             onChangeText={handleChange('idNumber')}
//                             onBlur={handleBlur('idNumber')}
//                             value={values.idNumber}
//                         />
//                         {touched.idNumber && errors.idNumber ? <Text style={styles.errorText}>{errors.idNumber}</Text> : null}

//                         <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
//                             <Text style={styles.button}>Search</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             )}
//         </Formik>
//     );
// };

// export default SearchGuest;

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
//         borderRadius: 10,
//         marginTop: 16,
//         width: Dimensions.get('window').width - 60,
//         height: 50,
//         marginBottom: 20,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: '#2AAA8A',
//     },
//     button: {
//         fontSize: 18,
//         textAlign: 'center',
//         color: '#fff',
//         fontWeight: "bold",
//     },
//     errorText: {
//         color: "#FF4545",
//         marginTop: 5,
//         width: "100%",
//         marginLeft: 70,
//         fontSize: 12
//     },
// });



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

const SearchGuest = ({ navigation }) => {
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


        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                </TouchableOpacity>
                <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>सर्च गेस्ट</Text>

            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <Text style={styles.lableText}>नाम</Text>
                    <Text style={styles.lableText}>अंतिम नाम</Text>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <TextInput
                        placeholderTextColor='darkgrey'
                        placeholder='नाम*'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} />
                    <TextInput
                        placeholderTextColor='darkgrey'
                        placeholder='मोबाइल नंबर*'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} />
                </View>

                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.button}>Search</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SearchGuest;

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


