// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Dimensions, ScrollView, Button } from 'react-native';
// import DatePicker from 'react-native-date-picker'
// import { Dropdown } from 'react-native-element-dropdown';
// import DocumentPicker from 'react-native-document-picker';

// const SubmittedReport = ({ navigation }) => {

//     const [checkinDate, setCheckinDate] = useState(null)
//     const [checkoutDate, setCheckoutDate] = useState(null)
//     const [open, setOpen] = useState(false)
//     const [open2, setOpen2] = useState(false)

//     return (
//         <ScrollView style={styles.container}>
//             <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
//             <View style={styles.inputContainer}>
//                 <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
//                     <DatePicker
//                         modal
//                         mode='date'
//                         open={open}
//                         date={checkinDate || new Date()}
//                         onConfirm={(date) => {
//                             setOpen(false)
//                             setCheckinDate(date)
//                         }}
//                         onCancel={() => {
//                             setOpen(false)
//                         }}
//                     />
//                     <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 0, width: "45%" }]} onPress={() => setOpen(true)}>
//                         <Text>{checkinDate ? checkinDate.toLocaleDateString() : "दिनांक से*"}</Text>
//                     </TouchableOpacity>



//                     <DatePicker
//                         modal
//                         mode='date'
//                         open={open2}
//                         date={checkoutDate || new Date()}
//                         onConfirm={(date) => {
//                             setOpen2(false)
//                             setCheckoutDate(date)
//                         }}
//                         onCancel={() => {
//                             setOpen2(false)
//                         }}
//                     />
//                     <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 0, width: "45%" }]} onPress={() => setOpen2(true)}>
//                         <Text>{checkoutDate ? checkoutDate.toLocaleDateString() : "दिनांक तक*"}</Text>
//                     </TouchableOpacity>
//                 </View>


//                 {/* 
//                 <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Login")}>
//                     <Text style={styles.button}>Search</Text>
//                 </TouchableOpacity> */}
//             </View>

//         </ScrollView>
//     );
// }

// export default SubmittedReport

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
//         // marginTop: 10
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

const SubmittedReport = ({ navigation }) => {
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
                <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>प्रस्तुत रिपोर्ट</Text>

            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <Text style={styles.lableText}>दिनांक से*</Text>
                    <Text style={styles.lableText}>दिनांक तक*</Text>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <DatePicker
                        modal
                        mode='date'
                        open={open}
                        date={checkinDate || new Date()}
                        onConfirm={(date) => {
                            setOpen(false)
                            setCheckinDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 8, width: "45%" }]} onPress={() => setOpen(true)}>
                        <Text>{checkinDate ? checkinDate.toLocaleDateString() : "दिनांक से*"}</Text>
                    </TouchableOpacity>


                    <DatePicker
                        modal
                        mode='date'
                        open={open2}
                        date={checkoutDate || new Date()}
                        onConfirm={(date) => {
                            setOpen2(false)
                            setCheckoutDate(date)
                        }}
                        onCancel={() => {
                            setOpen2(false)
                        }}
                    />
                    <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 8, width: "45%" }]} onPress={() => setOpen2(true)}>
                        <Text>{checkoutDate ? checkoutDate.toLocaleDateString() : "दिनांक तक*"}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

export default SubmittedReport;

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


