import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, ScrollView, Image, Modal, Pressable } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons";

const PrivacyPolicy = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={20} color="#fff" style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                    <Text style={[styles.lableText, { marginLeft: 10, fontSize: 14, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>महत्वपूर्ण जानकारी</Text>
                </View>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={{ justifyContent: "center", marginTop: 20, alignItems: "center", marginHorizontal: 20 }}>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                    GuestReport.in होटलों को अतिथि जानकारी को सुरक्षित रूप से पुलिस थानों तक पहुंचाने का डिजिटल प्लेटफॉर्म प्रदान करता है। हम एक मध्यस्थ के रूप में कार्य करते हैं, जो होटलों और पुलिस थानों के बीच डेटा का संप्रेषण सुगम बनाते हैं।
                </Text>

                <Text style={styles.text}>
                    1. एक बार रिपोर्ट सबमिट करने के बाद उस तारीख के लिए आप कोई एंट्री नहीं कर पाएंगे।
                </Text>
                <Text style={styles.text}>
                    2. इस पोर्टल पर आप एक महीने तक की पुरानी रिपोर्ट देख सकते हैं। अपने रिकॉर्ड के लिए आप समय-समय पर रिपोर्ट डाउनलोड कर सकते हैं।
                </Text>
                <Text style={styles.text}>
                    3. आप सिर्फ आज और कल के लिए ही चेक-इन की एंट्री कर सकते हैं।
                </Text>
                <Text style={styles.text}>
                    4. होटलों की जिम्मेदारी है कि वे वेबसाइट के माध्यम से सबमिट की गई सभी अतिथि जानकारी की सटीकता और वैधता सुनिश्चित करें। इसमें अतिथि के नाम, मोबाइल नंबर, और आधार विवरण की पुष्टि शामिल है। GuestReport.in होटलों द्वारा सबमिट की गई अतिथि जानकारी की सामग्री या सटीकता के लिए जिम्मेदार नहीं है।
                </Text>

                <Text style={styles.text}>5. विस्तृत नियम एवं शर्तों के लिए
                    <Text style={[styles.text, { color: '#1AA7FF' }]} onPress={() => navigation.navigate("PrivacyPolicyDetail")}> नियम एवं शर्तें पृष्ठ पर जाएं।</Text>
                </Text>
            </View>
            <View style={{ marginHorizontal: 15, justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("BottomNavigator")}>
                    <Text style={styles.button}>ठीक है|</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PrivacyPolicy;

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
        fontSize: 12,
        color: "black",
        width: "100%",
        marginVertical: 5
    },
    buttonContainer: {
        borderRadius: 12,
        marginTop: 20,
        width: Dimensions.get('window').width - 60,
        height: 45,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF',
    },
    button: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "500",
    },
});
