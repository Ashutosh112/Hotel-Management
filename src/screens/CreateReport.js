import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Dimensions, ScrollView, Button } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';

const CreateReport = ({ navigation }) => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);

    const data = [
        { label: 'Darshan', value: '1' },
        { label: 'Business', value: '2' },
        { label: 'Normal Visit', value: '3' },
        { label: 'Appointment', value: '4' },
        { label: 'Meeting', value: '5' },
        { label: 'Guest', value: '6' },

    ];

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />
            {/* <Text style={styles.text}>Create Report</Text> */}
            <View style={styles.inputContainer}>
                <DatePicker
                    modal
                    mode='date'
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                <TouchableOpacity style={[styles.input, { justifyContent: "center", }]} onPress={() => setOpen(true)}>
                    <Text>{date ? date.toLocaleDateString() : "Select Date"}</Text>
                </TouchableOpacity>

                <Dropdown
                    style={[styles.input, { marginTop: 20 }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Visit Purpose"
                    value={value}
                    onChange={item => {
                        setValue(item.value);
                    }} />
                <TextInput placeholderTextColor='darkgrey' placeholder='Enter Name' style={[styles.input, { marginTop: 20 }]}></TextInput>
                <TextInput maxLength={10} keyboardType='number-pad' placeholderTextColor='darkgrey' placeholder='Mobile No.' style={[styles.input, { marginTop: 20 }]}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='Address' style={[styles.input, { marginTop: 20 }]}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='Id No.' style={[styles.input, { marginTop: 20 }]}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='Id Type' style={[styles.input, { marginTop: 20 }]}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='Total Guest' style={[styles.input, { marginTop: 20 }]}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='No. of male' style={[styles.input, { marginTop: 20 }]}></TextInput>
                <TextInput placeholderTextColor='darkgrey' placeholder='No. of female' style={[styles.input, { marginTop: 20 }]}></TextInput>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

export default CreateReport

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
        height: 55,

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
        height: 55,
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
        fontSize: 16,
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