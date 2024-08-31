import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, ScrollView, Dimensions, Modal, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import BackIcon from "react-native-vector-icons/Ionicons"
import InfoIcon from "react-native-vector-icons/Feather"

const NoCheckIn = ({ navigation }) => {

    const [openModal, setOpenModal] = useState(false)

    const validationSchema = Yup.object().shape({
        reporterName: Yup.string()
            .required('रिपोर्ट निर्माता का नाम अनिवार्य है'),
        agreeToTerms: Yup.boolean()
            .oneOf([true], 'कृपया बॉक्स को टिक करें'),
    });

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                    <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>जीरो चेक इन रिपोर्ट</Text>
                </View>

                {/* <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => setOpenModal(true)}>
                        <InfoIcon name="info" size={24} color="#fff" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={{ marginHorizontal: 25, justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.modalText, { fontWeight: "500", fontSize: 14 }]}>|| कृपया ध्यान दें ||</Text>
                <Text style={[styles.modalText, { textAlign: "justify" }]}>1. अगर कल आपकी प्रॉपर्टी में कोई चेक इन नहीं हुआ है, तो आप यहाँ से जीरो चेक इन रिपोर्ट को पुलिस स्टेशन में सबमिट कर सकते हैं।</Text>
                <Text style={[styles.modalText, { textAlign: "justify" }]}>2. अगर आप कल की चेक इन रिपोर्ट पहले ही सबमिट कर चुके हैं, तो यह विकल्प आपके लिए डिसेबल रहेगा ।</Text>
                <Text style={[styles.modalText, { textAlign: "justify" }]}>3. अगर पेंडिंग रिपोर्ट सेक्शन में कल की तारीख की कोई चेक इन रिपोर्ट है, तो यह विकल्प आपके लिए डिसेबल रहेगा ।</Text>
            </View>
            <Text style={{ fontSize: 16, color: "#000", marginTop: 20, marginHorizontal: 25 }}>चेक इन रिपोर्ट पुलिस स्टेशन को सबमिट करें</Text>

            <Formik
                initialValues={{ reporterName: '', agreeToTerms: false }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);

                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor='darkgrey'
                            placeholder='रिपोर्ट निर्माता का नाम*'
                            style={styles.input}
                            onChangeText={handleChange('reporterName')}
                            onBlur={handleBlur('reporterName')}
                            value={values.reporterName}
                        />
                        {errors.reporterName && touched.reporterName && (
                            <Text style={styles.errorText}>{errors.reporterName}</Text>
                        )}

                        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 25, marginTop: 10 }}>
                            <CheckBox
                                disabled={false}
                                value={values.agreeToTerms}
                                tintColors='grey'
                                onTintColor="grey"
                                onFillColor='grey'
                                onValueChange={(newValue) => setFieldValue('agreeToTerms', newValue)}
                            />
                            <Text style={{ fontSize: 14, color: "#000", fontWeight: "500", marginTop: 10, textAlign: "justify" }}>
                                कल मेरी होटल में कोई गेस्ट नहीं रुका था | मैं प्रमणित करता हु की इस रिपोर्ट में दी हुई जानकारी पूर्ण एवं सत्य है |
                            </Text>
                        </View>
                        {errors.agreeToTerms && touched.agreeToTerms && (
                            <Text style={styles.errorText}>{errors.agreeToTerms}</Text>
                        )}

                        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                            <Text style={styles.button}>पुष्टि एवं सबमिट करे</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <Modal transparent={true} animationType={'fade'} hardwareAccelerated={true} visible={openModal}>
                <Pressable style={styles.modalOverlay} onPress={() => setOpenModal(false)}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, { fontWeight: "500", fontSize: 14 }]}>जीरो चेक इन रिपोर्ट</Text>
                        <Text style={styles.modalText}>|| कृपया ध्यान दें ||</Text>
                        <Text style={[styles.modalText, { textAlign: "justify" }]}>1. अगर कल आपकी प्रॉपर्टी में कोई चेक इन नहीं हुआ है, तो आप यहाँ से जीरो चेक इन रिपोर्ट को पुलिस स्टेशन में सबमिट कर सकते हैं।</Text>
                        <Text style={[styles.modalText, { textAlign: "justify" }]}>2. अगर आप कल की चेक इन रिपोर्ट पहले ही सबमिट कर चुके हैं, तो यह विकल्प आपके लिए डिसेबल रहेगा ।</Text>
                        <Text style={[styles.modalText, { textAlign: "justify" }]}>3. अगर पेंडिंग रिपोर्ट सेक्शन में कल की तारीख की कोई चेक इन रिपोर्ट है, तो यह विकल्प आपके लिए डिसेबल रहेगा ।</Text>
                        <Pressable style={styles.modalButton} onPress={() => setOpenModal(false)}>
                            <Text style={styles.textStyle}>ठीक</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </ScrollView>
    );
};

export default NoCheckIn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    inputContainer: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
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
    },
    buttonContainer: {
        borderRadius: 10,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF'
    },
    button: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "500"
    },
    errorText: {
        color: "#FF4545",
        marginTop: 5,
        width: "100%",
        marginLeft: 70,
        fontSize: 12
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
        color: "white",
        textAlign: "center",
    },
    modalText: {
        textAlign: "center",
        color: "black",
        fontSize: 12,
        marginVertical: 10,
        fontWeight: "500"
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000060'
    },
    modalButton: {
        backgroundColor: "#024063",
        paddingHorizontal: 40,
        paddingVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10
    },
});
