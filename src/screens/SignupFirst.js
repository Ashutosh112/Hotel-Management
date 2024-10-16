import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Dimensions, Pressable, Modal, Alert, Linking } from 'react-native';
import Logo1 from "../assets/images/UjjainPoliceLogo.png";
import Logo2 from "../assets/images/LoginLogo.svg";
import GoogleLogo from "../assets/images/googleLogo.svg";
import Cross from "react-native-vector-icons/Entypo";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Spinner from './Spinner';
import AlertIcon from "react-native-vector-icons/Ionicons";

const SignupFirst = ({ navigation }) => {
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [subscriptionAlertModal, setSubscriptionAlertModal] = useState(false)
    const [subscriptionErrorMsg, setSubscriptionErrorMsg] = useState("")

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const fifthInput = useRef();
    const sixthInput = useRef();

    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' });
    const [counter, setCounter] = useState(60);
    const [otpResend, setOtpResend] = useState(false);

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        if (showOtpModal) {
            firstInput.current.focus();
        }
    }, [showOtpModal]);


    const sendOtp = async (mobileNumber) => {
        setIsLoading(true);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        };

        try {
            const res = await axios.post(`${baseUrl}SendOTPValidateMobileNo?sMobile=${mobileNumber}`, config);
            setIsLoading(false);
            setMobileNumber(mobileNumber); // Store the mobile number
            if (res.data.StatusCode == 0) {
                Alert.alert(
                    'OTP Sent',
                    `Your OTP is ${res.data.Result.OTP}`,
                    [
                        { text: 'OK', onPress: () => setShowOtpModal(true) }
                    ],
                    { cancelable: false }
                );
            } else if (res.data.StatusCode == 1) {
                setSubscriptionErrorMsg(res.data.Message)
                setSubscriptionAlertModal(true);  // Ensure this is being called
            } else if (res.data.StatusCode == -1) {
                Alert.alert(
                    `${res.data.Message}`
                );
            }
        } catch (err) {
            setIsLoading(false);
        }
    };



    const verifyOtp = async () => {
        setIsLoading(true);
        const fullOtp = Object.values(otp).join("");

        if (fullOtp.length < 6) {
            setIsLoading(false);
            alert("Please enter a valid OTP")
            return;
        }

        if (mobileNumber) {
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json"
                }
            };

            axios.post(`${baseUrl}ValidateSignUpMobileOTP?sMobile=${mobileNumber}&Otp=${fullOtp}`, config)
                .then((res) => {
                    setIsLoading(false);
                    navigation.navigate("Signup", { mobileNumber: mobileNumber });
                    setShowOtpModal(false);

                })
                .catch((err) => {
                    setIsLoading(false);
                    alert("OTP is wrong. Please try again.")
                });
        }
    }



    return (
        <View style={styles.container}>
            <Spinner isLoading={isLoading} />
            <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
            <View style={styles.body}>
                <View style={{ flex: 0.8, justifyContent: "flex-start" }} onPress={() => navigation.navigate("Signup")}>
                    <Image source={Logo1} style={{ height: 80, width: 80, marginLeft: 20, marginTop: 20 }} resizeMode='contain' />
                </View>

                <View style={styles.logoContainer2}>
                    <Logo2 />
                    <Text style={[styles.text2, { marginTop: 5, fontWeight: "500" }]}>Hotel Guest<Text style={[styles.text2, { marginTop: 5, fontWeight: "400" }]}> Reporting System</Text></Text>
                    <Text style={styles.text2}>Hotel Login</Text>


                    <View style={{ marginHorizontal: 25, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <Text style={[styles.modalText, { fontSize: 14, fontWeight: "600" }]}>|| कृपया ध्यान दें ||</Text>
                        <Text style={[styles.modalText, { textAlign: "justify", marginTop: 8, fontSize: 12 }]}>आप इस नंबर को बाद में बदल नहीं पाएंगे। हमारे पोर्टल से सभी संदेश इसी नंबर पर भेजे जाएंगे।</Text>
                    </View>

                    <Formik
                        initialValues={{ mobileNumber: '' }}
                        validationSchema={Yup.object().shape({
                            mobileNumber: Yup.string().required('मोबाइल नंबर अनिवार्य है').matches(/^[0-9]{10}$/, 'मोबाइल नंबर 10 अंकों का होना चाहिए'),
                        })}
                        onSubmit={(values) => {
                            sendOtp(values.mobileNumber);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.inputContainer}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%", marginTop: 20 }}>
                                    <Text style={styles.lableText}>Enter Primary Mobile Number</Text>
                                </View>
                                <TextInput
                                    maxLength={10}
                                    keyboardType='number-pad'
                                    placeholderTextColor='darkgrey'
                                    placeholder='कृपया मोबाइल नंबर दर्ज करें'
                                    style={[styles.input, { borderColor: touched.mobileNumber && errors.mobileNumber ? "#FF4545" : '#E3E2E2', marginTop: 5 }]}
                                    onChangeText={handleChange('mobileNumber')}
                                    onBlur={handleBlur('mobileNumber')}
                                    value={values.mobileNumber}
                                />
                                {errors.mobileNumber && touched.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}

                                <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                                    <Text style={styles.button}>Send OTP</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>

                </View>
            </View>

            <Modal transparent={true} visible={showOtpModal} animationType='fade'>
                <Pressable style={styles.modalbgforsuggestbtn}>
                    <Pressable style={styles.modalforsuggestbtn}>
                        <View style={styles.modalheader}>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={{ fontSize: 14, color: "#fff" }}>One Time Password Verification</Text>
                            </View>
                            <Pressable onPress={() => setShowOtpModal(false)}>
                                <Cross name="cross" size={22} color="#fff" />
                            </Pressable>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.content}>We have sent a verification code to</Text>
                                <Text style={[styles.content, { color: "green", marginTop: 5 }]}>+91 {mobileNumber}</Text>
                            </View>

                            <View style={styles.otpContainer}>
                                <View style={styles.otpBox}>
                                    <TextInput
                                        style={styles.otpText}
                                        placeholder="1"
                                        placeholderTextColor="#B5B5B5"
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        ref={firstInput}
                                        onChangeText={value => {
                                            setOtp({ ...otp, 1: value });
                                            value && secondInput.current.focus();
                                        }}
                                    />
                                </View>
                                <View style={styles.otpBox}>
                                    <TextInput
                                        style={styles.otpText}
                                        placeholder="2"
                                        placeholderTextColor="#B5B5B5"
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        ref={secondInput}
                                        onChangeText={value => {
                                            setOtp({ ...otp, 2: value });
                                            value ? thirdInput.current.focus() : firstInput.current.focus();
                                        }}
                                    />
                                </View>
                                <View style={styles.otpBox}>
                                    <TextInput
                                        style={styles.otpText}
                                        placeholder="3"
                                        placeholderTextColor="#B5B5B5"
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        ref={thirdInput}
                                        onChangeText={value => {
                                            setOtp({ ...otp, 3: value });
                                            value ? fourthInput.current.focus() : secondInput.current.focus();
                                        }}
                                    />
                                </View>
                                <View style={styles.otpBox}>
                                    <TextInput
                                        style={styles.otpText}
                                        placeholder="4"
                                        placeholderTextColor="#B5B5B5"
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        ref={fourthInput}
                                        onChangeText={value => {
                                            setOtp({ ...otp, 4: value });
                                            value ? fifthInput.current.focus() : thirdInput.current.focus();
                                        }}
                                    />
                                </View>
                                <View style={styles.otpBox}>
                                    <TextInput
                                        style={styles.otpText}
                                        placeholder="5"
                                        placeholderTextColor="#B5B5B5"
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        ref={fifthInput}
                                        onChangeText={value => {
                                            setOtp({ ...otp, 5: value });
                                            value ? sixthInput.current.focus() : fourthInput.current.focus();
                                        }}
                                    />
                                </View>
                                <View style={styles.otpBox}>
                                    <TextInput
                                        style={styles.otpText}
                                        placeholder="6"
                                        placeholderTextColor="#B5B5B5"
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        ref={sixthInput}
                                        onChangeText={value => {
                                            setOtp({ ...otp, 6: value });
                                            !value && fifthInput.current.focus();
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={{ flex: 0.6 }}>
                                {
                                    counter > 0 ?
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ fontSize: 12, color: "#000", marginLeft: 5 }}>Resend SMS in 00:{counter}</Text>
                                            </View>
                                        </View>
                                        : otpResend === false ?
                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, color: "#000" }}>Resend OTP</Text>
                                            </TouchableOpacity> : null
                                }
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <TouchableOpacity style={[styles.nextButton, { paddingHorizontal: 25 }]} onPress={() => verifyOtp()}>
                                    <Text style={{ fontSize: 12, color: "#fff", letterSpacing: 1, }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </Pressable>
                </Pressable>
            </Modal>

            {/* Open modal for Subsription Alert start */}
            <Modal transparent={true}
                animationType={'fade'}
                hardwareAccelerated={true}
                visible={subscriptionAlertModal}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060' }}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1 }}>
                            <AlertIcon size={40} name="alert-circle-outline" color="#024063" style={{ marginLeft: 5 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.modalText}>{subscriptionErrorMsg}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                            <Pressable
                                style={{ backgroundColor: '#1AA7FF', paddingHorizontal: 25, paddingVertical: 10, justifyContent: "center", alignItems: "center", borderRadius: 12 }}
                                onPress={() => Linking.openURL('https://pages.razorpay.com/pl_OVJS2jyJPemwHD/view')}
                            >
                                <Text style={styles.textStyle}>Go to Link</Text>
                            </Pressable>
                            <Pressable
                                style={{ backgroundColor: "#000", paddingHorizontal: 25, paddingVertical: 10, justifyContent: "center", alignItems: "center", borderRadius: 12, marginLeft: 40 }}
                                onPress={() => { setSubscriptionAlertModal(false) }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Open modal for Subsription Alert end */}
        </View>
    );
}

export default SignupFirst;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    body: {
        flex: 1,
    },
    text: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 28,
        marginTop: 10
    },
    text2: {
        color: "#666666",
        fontSize: 18,
    },
    logoContainer1: {
        flex: 1,
        justifyContent: "center",
    },
    logoContainer2: {
        flex: 3,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    logoContainer4: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    lableText: {
        fontSize: 12,
        color: "#000",
        marginTop: 10,
    },
    input: {
        width: Dimensions.get('window').width - 60,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 12,
        paddingHorizontal: 20,
        color: "#000",
        height: 45,
        fontSize: 12

    },
    inputContainer: {
        width: Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        borderRadius: 12,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 45,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF'
    },
    button: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "500"
    },
    greyText: {
        marginTop: 15,
        fontSize: 14,
        color: '#1AA7FF',
        fontWeight: "bold"
    },
    otpContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    otpBox: {
        borderColor: "#B5B5B5",
        borderWidth: 0.8,
        width: 40,
        height: 40,
        marginHorizontal: 2,
        borderRadius: 10,
    },
    otpText: {
        fontSize: 14,
        color: "black",
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    content: {
        fontSize: 14,
        marginHorizontal: 20,
        color: "#000",
    },
    modalbgforsuggestbtn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000888"
    },
    modalforsuggestbtn: {
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width - 50,
        backgroundColor: "#fff",
        borderRadius: 15,
        minHeight: 300,
    },
    modalheader: {
        flexDirection: "row",
        backgroundColor: '#1AA7FF',
        padding: 12,
        justifyContent: "center",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignItems: "center",
    },
    nextButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF',
        marginHorizontal: 30,
        borderRadius: 12,
        paddingVertical: 10,
    },
    closeButton: {
        height: 40,
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 30,
        margin: 20,
    },
    errorText: {
        color: "#FF4545",
        marginTop: 5,
        width: "100%",
        marginLeft: 70,
        fontSize: 12
    },
    modalView: {
        // flex: 1,
        height: 200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#000",

    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontSize: 12,

    },
    modalText: {
        textAlign: "center",
        color: "black",
        fontSize: 14,
    },
});
