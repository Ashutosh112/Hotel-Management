




import { Dimensions, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from "../assets/images/UjjainPoliceLogo.png"
import CreateIcon from "react-native-vector-icons/Ionicons"
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
                    <TouchableOpacity style={[styles.listItem, { borderColor: '#088F8F' }]} onPress={() => navigation.navigate("CreateReport")}>
                        <CreateIcon name="create" size={40} style={{ color: '#088F8F' }} />
                        <Text style={{ fontSize: 16, color: '#000', fontWeight: "400" }}>Create Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.listItem, { borderColor: '#AAFF00' }]}>
                        <CreateIcon name="download" size={40} style={{ color: '#AAFF00' }} />
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: "400" }}>Download</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={[styles.listItem, { borderColor: '#87CEEB' }]}>
                        <CreateIcon name="search-outline" size={40} style={{ color: '#87CEEB' }} />
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: "400" }}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.listItem, { borderColor: "#FFBF00" }]}>
                        <CreateIcon name="person" size={40} style={{ color: "#FFBF00" }} />
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: "400" }}>Profile</Text>
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

    underContainer: {
        flex: 5,
        backgroundColor: "white",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    listItem: {
        flex: 1,
        height: 120,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        margin: 10,
        marginVertical: 20,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        // elevation: 3,
        borderWidth: 2,
        justifyContent: "space-evenly"

    },

});

