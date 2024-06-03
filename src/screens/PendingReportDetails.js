import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import BackIcon from "react-native-vector-icons/Ionicons"

const PendingReportDetails = () => {
    return (
        <ScrollView >
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon name="arrow-back-outline" size={22} color="#fff" style={{ marginLeft: 15 }} />
                </TouchableOpacity>
                <Text style={[styles.lableText, { marginLeft: 10, fontSize: 18, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>Report Detail</Text>
            </View>
            <View style={{ padding: 15 }}>

                <View >
                    <View style={{ backgroundColor: '#1AA7FF', borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "white" }}>चेक इन तारीख : 24-05-2024</Text>
                        <Text style={{ color: "white" }}>कुल व्यक्ति संख्या : 2</Text>

                    </View>
                    <View style={{ backgroundColor: '#1AA7FF', padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "white" }}>चेक आउट तारीख : 24-05-2024</Text>
                        <Text style={{ color: "white" }}>रिपोर्ट सबमिट: नहीं</Text>
                    </View>
                    <View style={{ backgroundColor: "#fff", padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ color: "black", fontSize: 12 }}>नाम: Aman Gupta</Text>
                            <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>जेंडर: Male</Text>
                            <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>मोबाइल नंबर: 8871369705</Text>
                            <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>पता: ujjain</Text>
                            <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>शहर: ujjain</Text>
                            <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>पिन: 456001</Text>
                            <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>आईडी प्रकार: ???? ?????</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "black", fontSize: 12 }}>आईडी का Front:</Text>
                            <Image source={require('../assets/images/pendingReport.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff", marginTop: 5 }} />

                            <Text style={{ color: "black", fontSize: 12, marginTop: 20 }}>आईडी का Back:</Text>
                            <Image source={require('../assets/images/pendingReport.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff", marginTop: 5 }} />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <View style={{ backgroundColor: '#bfbfbf', borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "white" }}>अतिरिक्त अतिथि 1</Text>
                    </View>

                    <View style={{ backgroundColor: "#fff", padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ color: "black", fontSize: 12 }}>नाम: Dheeraj Kumar</Text>
                            <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>जेंडर: Male</Text>
                            <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>आईडी प्रकार: ???? ?????</Text>
                            <Text style={{ color: "black", fontSize: 12, marginTop: 10 }}>आईडी नंबर: 548574562</Text>

                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "black", fontSize: 12 }}>आईडी का Front:</Text>
                            <Image source={require('../assets/images/pendingReport.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff", marginTop: 5 }} />

                            <Text style={{ color: "black", fontSize: 12, marginTop: 20 }}>आईडी का Back:</Text>
                            <Image source={require('../assets/images/pendingReport.png')} style={{ height: 55, width: 55, borderWidth: 1, borderRadius: 55, borderColor: "#fff", marginTop: 5 }} />
                        </View>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}

export default PendingReportDetails

const styles = StyleSheet.create({})