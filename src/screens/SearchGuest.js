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
import BackIcon from "react-native-vector-icons/Ionicons"
import axios from 'axios';
import { baseUrl } from '../utils/env';


const SearchGuest = ({ navigation }) => {

    const [mobileNumber, setMobileNumber] = useState("")
    const [name, setName] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [Aadhar, setAadhar] = useState("")

    const searchGuest = async () => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };
        await axios.post(`${baseUrl}GuestList?HotelId=${idNumber}&GuestName=${name}`, config)
            .then((res) => {
                console.log("resss", res.data)
            })
            .catch(err => {
                console.log("Errorr----", err)
            });
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
                    <Text style={styles.lableText}>मोबाइल नंबर</Text>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <TextInput
                        value={name} onChangeText={(value) => { setName(value) }}
                        placeholderTextColor='darkgrey'
                        placeholder='नाम'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} />
                    <TextInput
                        value={mobileNumber} onChangeText={(value) => { setMobileNumber(value) }}

                        placeholderTextColor='darkgrey'
                        placeholder='मोबाइल नंबर'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} />
                </View>
                {/* <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 10 }}>
                    <Text style={styles.lableText}>आईडी नंबर</Text>
                </View>
                <TextInput
                    maxLength={10}
                    keyboardType='number-pad'
                    placeholderTextColor='darkgrey'
                    placeholder='आईडी नंबर'
                    style={[styles.input, { marginTop: 8 }]}
                    value={idNumber} onChangeText={(value) => { setIdNumber(value) }}

                /> */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <Text style={styles.lableText}>आधार नंबर</Text>
                    <Text style={styles.lableText}>आईडी नंबर</Text>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <TextInput
                        value={Aadhar} onChangeText={(value) => { setAadhar(value) }}
                        placeholderTextColor='darkgrey'
                        placeholder='आधार नंबर'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} />
                    <TextInput
                        value={idNumber} onChangeText={(value) => { setIdNumber(value) }}
                        placeholderTextColor='darkgrey'
                        placeholder='आईडी नंबर'
                        style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "center", alignItems: "center", marginTop: 8 }]} />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => searchGuest()}>
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


