import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, ScrollView, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';

const NoCheckIn = ({ navigation }) => {

    const validationSchema = Yup.object().shape({
        reporterName: Yup.string()
            .required('रिपोर्ट निर्माता का नाम आवश्यक है'),
        agreeToTerms: Yup.boolean()
            .oneOf([true], 'कृपया बॉक्स को टिक करें'),
    });

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />

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
        backgroundColor: '#2AAA8A'
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
});
