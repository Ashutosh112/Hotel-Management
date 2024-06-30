import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, ScrollView, Image, Modal, Pressable } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons";

const PrivacyPolicyDetail = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                    <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>Welcome to GuestReport.in!
                    </Text>
                </View>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={{ marginHorizontal: 15, justifyContent: "center", marginTop: 20 }}>
                <Text style={styles.text}>
                    These Terms and Conditions ("Terms") govern your use of the GuestReport.in website ("Website") and its services ("Services"). By accessing or using the Website, you agree to be bound by these Terms. Please read them carefully.
                </Text>

                <Text style={styles.text2}>
                    1. Services
                </Text>
                <Text style={styles.text3}>
                    GuestReport.in provides a platform for hotels to submit guest information securely to police stations. We act as an intermediary, facilitating the transmission of data between hotels and law enforcement.

                </Text>
                <Text style={styles.text2}>
                    2. User Responsibilities
                </Text>
                <Text style={styles.text3}>
                    1. Hotels
                    Data Accuracy: Hotels are solely responsible for ensuring the accuracy and validity of all guest information submitted through the Website. This includes verifying guest names, mobile numbers, and Aadhar details.
                    Data Ownership: Hotels retain ownership of the guest information they submit. GuestReport.in does not claim any ownership of this data.
                    Prohibited Activities: You agree not to:
                    Hack, disrupt, or attempt to gain unauthorized access to the Website or its systems.
                    Submit false, misleading, or incomplete information.
                    Use the Website for any illegal or unlawful purpose.
                    Overload the Website with excessive data or requests.
                </Text>
                <Text style={styles.text3}>
                    2. GuestReport.in
                    Data Security: GuestReport.in takes data security seriously. We employ encryption to protect guest information stored on our servers.
                    Data Retention: We will retain guest information for a period of 30 days after submission. After that, the data will be securely deleted.
                    Disclaimer of Liability: GuestReport.in is not responsible for the content or accuracy of guest information submitted by hotels. We are not liable for any misuse of such information by third parties.
                </Text>

                <Text style={styles.text2}>
                    3. Suspension and Termination
                </Text>
                <Text style={styles.text3}>
                    GuestReport.in reserves the right to suspend or terminate your access to the Website for any violation of these Terms.
                </Text>

                <Text style={styles.text2}>
                    4. Modifications to Terms
                </Text>
                <Text style={styles.text3}>
                    We may revise these Terms at any time by updating this page. Your continued use of the Website after any such change constitutes your acceptance of the new Terms.
                </Text>
                <Text style={styles.text2}>
                    5. Governing Law
                </Text>
                <Text style={styles.text3}>
                    These Terms shall be governed by and construed in accordance with the laws of India.
                </Text>
                <Text style={styles.text2}>
                    6. Contact Us
                </Text>
                <Text style={styles.text3}>
                    If you have any questions regarding these Terms, please contact us at [insert email address].
                    Additional Terms
                    You agree to indemnify and hold harmless GuestReport.in, its officers, directors, employees, and agents from any and all claims, losses, expenses, damages, and costs (including attorney's fees) arising from or relating to your use of the Website.
                    You agree that these Terms constitute the entire agreement between you and GuestReport.in regarding your use of the Website.
                    If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall remain in full force and effect.
                </Text>
                <Text style={styles.text2}>
                    7. Compliance with IT Act 2001
                </Text>
                <Text style={styles.text3}>
                    You agree to comply with all applicable provisions of the Information Technology Act, 2001 (IT Act) while using the Website. This includes:
                    Reasonable Security Practices: You (hotels) are responsible for implementing reasonable security practices to protect guest information from unauthorized access, disclosure, modification, or destruction.
                    Consent for Data Collection: Hotels must obtain explicit consent from guests before collecting and submitting their information through GuestReport.in. You are responsible for informing guests about how their data will be used and stored.
                </Text>
                <Text style={styles.text2}>
                    8. Data Breach Notification
                </Text>
                <Text style={styles.text3}>
                    In the event of a data breach involving guest information, GuestReport.in will notify the affected hotels and relevant authorities as per applicable data protection laws. Hotels are responsible for notifying their guests about the breach in a timely manner.
                </Text>
                <Text style={styles.text2}>
                    9. Dispute Resolution
                </Text>
                <Text style={styles.text2}>
                    Any dispute arising out of or relating to these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts located in [insert city, state].
                    By using GuestReport.in, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </Text>
            </View>
            <View style={{ marginHorizontal: 15, justifyContent: "center", alignItems: "center", marginTop: 20 }}>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("BottomNavigator")}>
                    <Text style={styles.button}>ठीक है|</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default PrivacyPolicyDetail;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F8",
        flex: 1,
    },
    lableText: {
        fontSize: 12,
        color: "#000",
        marginLeft: 0,
        width: "45%",
        marginTop: 10
    },
    text: {
        fontSize: 14,
        color: "black",
        fontWeight: "500",
        textAlign: "justify"
    },
    text2: {
        fontSize: 12,
        color: "black",
        fontWeight: "500",
        textAlign: "justify",
        marginTop: 10
    },
    text3: {
        fontSize: 12,
        color: "black",
        fontWeight: "400",
        textAlign: "justify",
        marginTop: 5,
        marginHorizontal: 10
    },
    buttonContainer: {
        borderRadius: 20,
        marginTop: 20,
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
});
