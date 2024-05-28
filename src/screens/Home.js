import { Dimensions, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from "../assets/images/UjjainPoliceLogo.png"
import CreateIcon from "react-native-vector-icons/Ionicons"
import PendingIcon from "react-native-vector-icons/MaterialCommunityIcons"
import CrossIcon from "react-native-vector-icons/Entypo"


const Home = ({ navigation }) => {

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];


    return (
        <LinearGradient
            colors={['#0047AB', '#04686d']}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>

            <LinearGradient
                colors={['#0047AB', '#04686d']}
                style={styles.linearGradient2}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                    {/* <Text style={styles.text}>Menu</Text> */}
                    <Text style={styles.text}>Welcome!</Text>
                    <Text style={[styles.text, { fontSize: 24, fontWeight: "bold" }]}>Ajay Sharma</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", }}>
                    <Image source={Logo} style={{ height: 70, width: 70 }} />
                </View>

            </LinearGradient>
            <View style={styles.underContainer}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={[styles.listItem, { borderColor: '#00C0EF', backgroundColor: "#00C0EF" }]} onPress={() => navigation.navigate("CreateReport")}>
                        <CreateIcon name="create" size={30} style={{ color: '#fff' }} />
                        <Text style={styles.text2}>चेक इन रिपोर्ट बनाये</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.listItem, { borderColor: '#00A65A', backgroundColor: '#00A65A' }]}>
                        <CreateIcon name="person" size={30} style={{ color: '#fff' }} />
                        <Text style={styles.text2}>रिपोर्ट में गेस्ट जोड़े</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={[styles.listItem, { borderColor: '#F06292', backgroundColor: '#F06292' }]}>
                        <CreateIcon name="search-outline" size={30} style={{ color: '#fff' }} />
                        <Text style={styles.text2}>सर्च गेस्ट</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.listItem, { borderColor: "#FF7043", backgroundColor: "#FF7043" }]}>
                        <CreateIcon name="download" size={30} style={{ color: "#fff" }} />
                        <Text style={styles.text2}>सब्मिटेड रिपोर्ट को डाउनलोड करे या देखे</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={[styles.listItem, { borderColor: "#F29C13", backgroundColor: "#F29C13" }]}>
                        <PendingIcon name="clipboard-text-clock-outline" size={30} style={{ color: "#fff" }} />
                        <Text style={styles.text2}>पेंडिंग रिपोर्ट</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.listItem, { borderColor: "#d99ca5", backgroundColor: "#d99ca5" }]}>
                        <CrossIcon name="circle-with-cross" size={30} style={{ color: "#fff" }} />
                        <Text style={styles.text2}>कल कोई चेक इन नहीं हुआ</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: "white" }}>

            </View>


        </LinearGradient>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    linearGradient: {
        flex: 1,
    },

    linearGradient2: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 20
    },
    text: {
        fontSize: 16,
        color: "white",
        marginVertical: 2
    },
    text2: {
        fontSize: 14,
        color: '#fff',
        fontWeight: "500",
        textAlign: "center",
    },

    underContainer: {
        flex: 5,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    listItem: {
        flex: 1,
        height: 110,
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 12,
        alignItems: "center",
        elevation: 2,
        borderWidth: 2,
        justifyContent: "space-evenly"

    },

});

