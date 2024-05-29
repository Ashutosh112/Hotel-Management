import React, { useState } from "react";
import { StyleSheet, FlatList, Text, Pressable, Dimensions, View, Image, TouchableOpacity, TextInput } from "react-native";




const PendingReport = ({ navigation }) => {

    const data = [
        { id: 1, label: 'Darshan', value: '1' },
        { id: 2, label: 'Business', value: '2' },
        { id: 3, label: 'Normal Visit', value: '3' },
        { id: 4, label: 'Appointment', value: '4' },
        { id: 5, label: 'Meeting', value: '5' },
        { id: 6, label: 'Guest', value: '6' },

    ];

    return (
        <View style={{ paddingHorizontal: 8, marginTop: 5, backgroundColor: "#F5F5F8" }}>

            <TextInput placeholderTextColor="darkgrey" placeholder='Search' style={styles.input}></TextInput>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <View onPress={() => navigation.navigate("OrderHistory")} style={styles.container}>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require('../assets/images/pendingReport.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff" }} />
                        </View>

                        <View style={{ flex: 2, justifyContent: "center" }}>
                            <Text style={[styles.text1, { textTransform: 'capitalize' }]}>आईडी प्रकार</Text>
                            <Text style={styles.text2}>प्रथम नाम</Text>
                            <Text style={styles.text2}>मोबाइल नंबर
                            </Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", borderRadius: 8, borderColor: '#2AAA8A', borderWidth: 1.5 }} onPress={() => navigation.navigate("PendingReportDetails")}>
                                <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "5000", color: '#2AAA8A', padding: 10, paddingVertical: 8 }}>Show Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                } />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
        paddingHorizontal: 15,
        margin: 5,
        height: 80,
        borderRadius: 10,
        // borderLeftWidth: 3,
        // borderColor: '#2AAA8A'

    },
    text1: {
        fontSize: 12,
        fontWeight: "500",
        color: "#000",
        marginLeft: 20
    },
    text2: {
        fontSize: 12,
        fontWeight: "400",
        color: "grey",
        marginLeft: 20,
        marginTop: 5
    },
    input: {
        height: 45,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E2E2',
        borderRadius: 30,
        paddingHorizontal: 20,
        color: "#000",
        marginVertical: 10,
        marginHorizontal: 10
    },
});

export default PendingReport;