import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, Linking } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons";

const ContactWithUs = ({ navigation }) => {
    const [isNumberClicked, setIsNumberClicked] = useState(false);

    const handlePressPhoneNumber = () => {
        setIsNumberClicked(true);
        Linking.openURL('tel:8989006759');
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                    <Text style={[styles.labelText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>
                        हमसे संपर्क करें
                    </Text>
                </View>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />
            <View style={{ margin: 10, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                <Text style={styles.text}>
                    किसी भी प्रकार की सहायता के लिए आप हमें निम्न नंबर पर संपर्क कर सकते हैं:
                </Text>
                <TouchableOpacity onPress={handlePressPhoneNumber}>
                    <Text style={[styles.phoneNumber, isNumberClicked && { color: 'green' }]}>
                        Call 8989006759
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                    (सुबह 10 से शाम 6 बजे, सोमवार से शनिवार)।
                </Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("BottomNavigator")}>
                    <Text style={styles.button}>ठीक है|</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ContactWithUs

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
        textAlign: "center"

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
    phoneNumber: {
        color: 'green',
        fontSize: 14
    }
});
