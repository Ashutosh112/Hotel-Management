// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, } from 'react-native';

// const Profile = ({ navigation }) => {

//     return (
//         <ScrollView style={styles.container}>
//             <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
//             <View style={styles.inputContainer}>

//                 <Image source={require('../assets/images/profileLogo.png')} style={{ height: 100, width: 100, borderWidth: 1, borderRadius: 100, borderColor: "#fff" }} />

//                 <TextInput placeholderTextColor='darkgrey' placeholder='होटल का नाम*' style={styles.input}></TextInput>
//                 <TextInput placeholderTextColor='darkgrey' placeholder='पता*' style={styles.input}></TextInput>
//                 <TextInput maxLength={10} keyboardType='number-pad' placeholderTextColor='darkgrey' placeholder='मोबाइल नंबर*' style={styles.input}></TextInput>
//                 <TextInput placeholderTextColor='darkgrey' placeholder='संपर्क न.*' style={styles.input}></TextInput>
//                 <TextInput placeholderTextColor='darkgrey' placeholder='ईमेल आईडी*' style={styles.input}></TextInput>
//                 <TextInput placeholderTextColor='darkgrey' placeholder='पुलिस स्टेशन*' style={styles.input}></TextInput>
//                 <TouchableOpacity style={styles.buttonContainer} >
//                     <Text style={styles.button}>Save</Text>
//                 </TouchableOpacity>
//             </View>

//         </ScrollView>
//     );
// }

// export default Profile

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     body: {
//         flex: 4,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     text: {
//         color: "#000",
//         fontWeight: "bold",
//         fontSize: 28,
//         marginTop: 20
//     },
//     text2: {
//         color: "#000",
//         fontSize: 16,
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
//         marginTop: 20

//     },
//     inputContainer: {
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
//         backgroundColor: '#2AAA8A'
//     },
//     button: {
//         fontSize: 18,
//         textAlign: 'center',
//         color: '#fff',
//         fontWeight: "bold"
//     },
//     greyText: {
//         marginTop: 15,
//         fontSize: 14,
//         color: "#FFBF00",
//         fontWeight: "bold"
//     },
//     google_button: {
//         color: 'white',
//         width: Dimensions.get('window').width - 60,
//         backgroundColor: "#000",
//         borderRadius: 30,
//         justifyContent: "center",
//         flexDirection: "row",
//         marginTop: 20,
//         paddingHorizontal: 20,
//         height: 50
//     },

//     dropdown: {
//         margin: 16,
//         height: 50,
//         borderBottomColor: 'gray',
//         borderBottomWidth: 0.5,
//     },

//     placeholderStyle: {
//         fontSize: 14,
//     },
//     selectedTextStyle: {
//         fontSize: 16,
//     },
//     iconStyle: {
//         width: 20,
//         height: 20,
//     },
//     inputSearchStyle: {
//         height: 40,
//         fontSize: 16,
//     },
// });



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
    idFront: Yup.array().min(1, 'आईडी का Front अनिवार्य'),
    idBack: Yup.array().min(1, 'आईडी का Back अनिवार्य'),
});

const AddGuestInReport = ({ navigation }) => {

    const [selectgender, setSelectgender] = useState(null);

    const data = [
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


        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15 }}>

                <View style={{ flex: 6, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                    <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>Profile</Text>
                </View>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}>
                    <Image source={require('../assets/images/profileLogo.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff" }} />
                </View>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />


            <View style={styles.inputContainer}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>होटल का नाम*<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='होटल का नाम*'
                    style={[styles.input, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>पता<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='पता*'
                    style={[styles.input, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>मोबाइल नंबर<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='मोबाइल नंबर*'
                    style={[styles.input, { marginTop: 8 }]} />
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>संपर्क न.<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='संपर्क न.*'
                    style={[styles.input, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>ईमेल आईडी<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='ईमेल आईडी*'
                    style={[styles.input, { marginTop: 8 }]} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>पुलिस स्टेशन<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                </View>
                <TextInput
                    placeholderTextColor='darkgrey'
                    placeholder='पुलिस स्टेशन*'
                    style={[styles.input, { marginTop: 8 }]} />

                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

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


