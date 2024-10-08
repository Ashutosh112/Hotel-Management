import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Dimensions, Pressable, Modal, Alert } from 'react-native';
import Logo1 from "../assets/images/UjjainPoliceLogo.png";
import Logo2 from "../assets/images/LoginLogo.svg";
import GoogleLogo from "../assets/images/googleLogo.svg";
import Cross from "react-native-vector-icons/Entypo";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

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

  const sendOtp = async (mobileNumber) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json"
      }
    };

    await axios.post(`${baseUrl}SendOTP?sMobile=${mobileNumber}`, config)
      .then((res) => {
        setMobileNumber(mobileNumber); // Store the mobile number
        Alert.alert(
          'OTP Sent',
          `Your OTP is ${res.data.Result.OTP}`,
          [
            { text: 'OK', onPress: () => setShowOtpModal(true) }
          ],
          { cancelable: false }
        );
      })
      .catch(err => {
      });
  };

  const verifyOtp = async () => {
    const fullOtp = Object.values(otp).join("")
    if (fullOtp.length == 6) {
      if (mobileNumber) {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
          }
        };
        console.log("mobile", mobileNumber)
        await axios.get(`${baseUrl}HotelLogin?sMobile=${mobileNumber}&Otp=${fullOtp}`, config)
          .then((res) => {
            const data = res.data.Result
            AsyncStorage.setItem("hotelmgmt", JSON.stringify(data))
            navigation.navigate("BottomNavigator")
            setShowOtpModal(false)
          })
          .catch((err) => {
          })
      }
    }

  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
      <View style={styles.body}>
        <View style={{ flex: 0.8, justifyContent: "flex-start" }} onPress={() => navigation.navigate("Signup")}>
          <Image source={Logo1} style={{ height: 80, width: 80, marginLeft: 20, marginTop: 20 }} resizeMode='contain' />
        </View>

        <View style={styles.logoContainer2}>
          <Logo2 />
          <Text style={[styles.text2, { marginTop: 5, fontWeight: "700" }]}>Welcome back!</Text>
          <Text style={styles.text2}>Please login to continue</Text>

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
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 20 }}>
                  <Text style={styles.lableText}>Mobile Number</Text>
                </View>
                <TextInput
                  maxLength={10}
                  keyboardType='number-pad'
                  placeholderTextColor='darkgrey'
                  placeholder='Enter Mobile Number'
                  style={[styles.input, { borderColor: touched.mobileNumber && errors.mobileNumber ? "#FF4545" : '#E3E2E2', marginTop: 5 }]}
                  onChangeText={handleChange('mobileNumber')}
                  onBlur={handleBlur('mobileNumber')}
                  value={values.mobileNumber}
                />
                {errors.mobileNumber && touched.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}

                <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                  <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Text style={[styles.greyText, { marginTop: 5, color: "grey", fontWeight: "300" }]}>Continue with</Text>

          <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: "#fff", borderWidth: 1, borderColor: '#E3E2E2', flexDirection: "row" }]} >
            <GoogleLogo />
            <Text style={[styles.button, { color: "#000", fontWeight: "400", marginLeft: 10 }]}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => navigation.navigate("Signup")}>
            <Text style={[styles.greyText, { marginVertical: 20, color: "black", fontWeight: "400" }]}>Don't have an account?
              <Text style={[styles.greyText, { marginVertical: 20, fontWeight: "500" }]}> New Hotel Registration</Text>
            </Text>
          </TouchableOpacity>
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
                <Text style={[styles.content, { color: "#595970", marginTop: 5 }]}>7854744564</Text>
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
                <TouchableOpacity style={[styles.nextButton, { paddingHorizontal: 50 }]}

                  onPress={() => verifyOtp()}

                >
                  <Text style={{ fontSize: 12, color: "#fff", letterSpacing: 1, }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export default Login;

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
    color: "#000",
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
    marginLeft: 0,
    width: "45%",
    marginTop: 10
  },
  input: {
    width: Dimensions.get('window').width - 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E2E2',
    borderRadius: 15,
    paddingHorizontal: 20,
    color: "#000",
    height: 50,
  },
  inputContainer: {
    width: Dimensions.get('window').width,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    borderRadius: 15,
    marginTop: 16,
    width: Dimensions.get('window').width - 60,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#1AA7FF'
  },
  button: {
    fontSize: 18,
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
    width: 45,
    height: 40,
    marginHorizontal: 2,
    borderRadius: 10,
  },
  otpText: {
    fontSize: 20,
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
    minHeight: 330,
  },
  modalheader: {
    flexDirection: "row",
    backgroundColor: '#1AA7FF',
    padding: 15,
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#1AA7FF',
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 15,
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
});
