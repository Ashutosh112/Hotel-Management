import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Dimensions, ScrollView, Button } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';

const SubmittedReport = ({ navigation }) => {

    const [checkinDate, setCheckinDate] = useState(null)
    const [checkoutDate, setCheckoutDate] = useState(null)
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [travelReason, setTravelReason] = useState(null);
    const [selectgender, setSelectgender] = useState(null)
    const [idFront, setIdFront] = useState([])
    const [idBack, setIdBack] = useState([])

    const data = [
        { label: 'Darshan', value: '1' },
        { label: 'Business', value: '2' },
        { label: 'Normal Visit', value: '3' },
        { label: 'Appointment', value: '4' },
        { label: 'Meeting', value: '5' },
        { label: 'Guest', value: '6' },

    ];

    const genderData = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
        { label: 'Other', value: '2' },
    ];
    const selectIdFrontFile = async () => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false
            });
            setIdFront(doc)
        } catch (err) {
            if (DocumentPicker.isCancel(err))
                Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: 'User cancelled the file selection'
                });

            else
                console.log(err)
        }
    }

    const selectIdBackFile = async () => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
                allowMultiSelection: false
            });
            console.log(doc)
            setIdBack(doc)
        } catch (err) {
            if (DocumentPicker.isCancel(err))
                Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: 'User cancelled the file selection'
                });
            else
                console.log(err)
        }
    }
    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                    <DatePicker
                        modal
                        mode='date'
                        open={open}
                        date={checkinDate || new Date()}
                        onConfirm={(date) => {
                            setOpen(false)
                            setCheckinDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 0, width: "45%" }]} onPress={() => setOpen(true)}>
                        <Text>{checkinDate ? checkinDate.toLocaleDateString() : "दिनांक से*"}</Text>
                    </TouchableOpacity>



                    <DatePicker
                        modal
                        mode='date'
                        open={open2}
                        date={checkoutDate || new Date()}
                        onConfirm={(date) => {
                            setOpen2(false)
                            setCheckoutDate(date)
                        }}
                        onCancel={() => {
                            setOpen2(false)
                        }}
                    />
                    <TouchableOpacity style={[styles.input, { justifyContent: "center", marginTop: 0, width: "45%" }]} onPress={() => setOpen2(true)}>
                        <Text>{checkoutDate ? checkoutDate.toLocaleDateString() : "दिनांक तक*"}</Text>
                    </TouchableOpacity>
                </View>


                {/* 
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.button}>Search</Text>
                </TouchableOpacity> */}
            </View>

        </ScrollView>
    );
}

export default SubmittedReport

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    body: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 28,
        marginTop: 20
    },
    text2: {
        color: "#000",
        fontSize: 16,
        // marginTop: 10
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
        marginTop: 20

    },
    inputContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
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
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "bold"
    },
    greyText: {
        marginTop: 15,
        fontSize: 14,
        color: "#FFBF00",
        fontWeight: "bold"
    },
    google_button: {
        color: 'white',
        width: Dimensions.get('window').width - 60,
        backgroundColor: "#000",
        borderRadius: 30,
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 20,
        paddingHorizontal: 20,
        height: 50
    },

    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },

    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});