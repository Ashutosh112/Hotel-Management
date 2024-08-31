import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../utils/env';

const SubscriptionPlan = () => {

    useEffect(() => {
        getSubscriptionPlan()
    }, []);


    const getSubscriptionPlan = async () => {
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                // "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        await axios.get(`${baseUrl}GetHotelDetails?HotelId=${updatedValue.idHotelMaster}`, config)
            .then((res) => {
                console.log("ressssss", res.data)
            })
            .catch(err => {
                console.log("errrr", err)
            });
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.text1}>Hotel Guesting Reporting System</Text>
                <Text style={styles.text1}>कृपया अपना सब्सक्रिप्शन चुनें</Text>
            </View>

            <View style={{ borderWidth: 1, borderColor: "grey", borderRadius: 10, marginHorizontal: 10 }}>

                <View style={styles.container2}>
                    <Text style={styles.text2}>होटल का नाम - aman Test</Text>
                    <Text style={styles.text2}>रजिस्टर्ड मोबाइल नंबर - 8871369705</Text>
                    <Text style={styles.text2}>कमरों की कुल संख्या - 0</Text>
                </View>

                <View style={styles.subscriptionContainer}>
                    <Text style={styles.subscriptionDuration}>12 MONTH</Text>
                    <Text style={styles.subscriptionPrice}>₹ 2500</Text>
                </View>

                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default SubscriptionPlan

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    container1: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 20

    },
    text1: {
        color: "#22BFF1",
        fontSize: 16,
        marginVertical: 5
    },
    container2: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 20
    },
    text2: {
        color: "#000",
        fontSize: 14,
        marginVertical: 5
    },
    subscriptionContainer: {
        flex: 1,
        alignItems: 'center',
    },
    subscriptionDuration: {
        width: "70%",
        backgroundColor: '#ff66cc',
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: "center"
    },
    subscriptionPrice: {
        fontSize: 28,
        color: '#ff66cc',
        fontWeight: 'bold',
        marginVertical: 10
    },
    payButton: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 20
    },
    payButtonText: {
        width: "40%",
        backgroundColor: '#ff66cc',
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: "center",
        borderRadius: 10
    },
})