import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from '@react-native-community/checkbox';
import CalendorIcon from "../assets/images/CalenderIcon.png";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddGuestInPendingReport = ({ route }) => {
    // const [allGuestData, setAllGuestData] = useState([]);
    const [primaryGuest, setPrimaryGuest] = useState({});
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedIDType, setSelectedIDType] = useState('');
    const [selectTravelReason, setSelectTravelReason] = useState('')
    const [guestCount, setGuestCount] = useState(1); // Total guest count (primary + additional)
    const [guests, setGuests] = useState([]);
    const [hotelCategories, setHotelCategories] = useState([]);
    const [guestRoomDetails, setGuestRoomDetails] = useState([]);

    const genderData = [
        { label: 'पुरुष', value: 'पुरुष' },
        { label: 'महिला', value: 'महिला' },
        { label: 'अन्य', value: 'अन्य' }
    ];
    const idTypeData = [
        { label: 'आधार कार्ड', value: 'आधार कार्ड' },
        { label: 'पासपोर्ट', value: 'पासपोर्ट' },
        { label: 'वोटर आई कार्ड', value: 'वोटर आई कार्ड' },
        { label: 'ड्राइविंग लाइसेंस', value: 'ड्राइविंग लाइसेंस' },
        { label: 'पैन कार्ड', value: 'पैन कार्ड' },
        { label: 'राशन कार्ड', value: 'राशन कार्ड' },
        { label: 'सरकारी कर्मचारी पहचान पत्र', value: 'सरकारी कर्मचारी पहचान पत्र' },
        { label: 'विदेशियों का पंजीकरण कार्ड (FRC)', value: 'विदेशियों का पंजीकरण कार्ड (FRC)' },
        { label: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र', value: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र' },
    ];

    const travelReasonData = [
        { label: 'दर्शन', value: 'दर्शन' },
        { label: 'अध्यन या सेमिनार', value: 'अध्यन या सेमिनार' },
        { label: 'सत्संग', value: 'सत्संग' },
        { label: 'पारिवारिक या मित्रो से मिलना', value: 'पारिवारिक या मित्रो से मिलना' },
        { label: 'व्यापारिक या व्यावासयिक यात्रा', value: 'व्यापारिक या व्यावासयिक यात्रा' },
        { label: 'अन्य', value: 'अन्य' },
    ];

    useEffect(() => {
        GuestDetails();
        hotelRoomCategory()
    }, []);

    const hotelRoomCategory = async () => {
        // setIsLoading(true);
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}HotelCategory?idHotel=${updatedValue.idHotelMaster}`, {}, config)
            .then((res) => {
                // setIsLoading(false);
                const categories = res.data.Result.map(cat => ({ ...cat, isChecked: false }));
                setHotelCategories(categories);
                checkRoomCategoryWithGuest(categories);

            })
            .catch(err => {
                // setIsLoading(false);
            });
    };

    const checkRoomCategoryWithGuest = (categories) => {
        if (guestRoomDetails.length > 0) {
            const updatedCategories = categories.map(category => {
                const isChecked = guestRoomDetails.some(room => room.idHotelRoomCategory === category.idHotelRoomCategory);
                return { ...category, isChecked };
            });
            setHotelCategories(updatedCategories);
        } else {
            // If no GuestRoomDetails, keep all unchecked
            const updatedCategories = categories.map(category => ({ ...category, isChecked: false }));
            setHotelCategories(updatedCategories);
        }
    };

    const handleCategoryCheck = (index, roomCategoryId) => {
        // Toggle the isChecked value for the selected category
        const updatedCategories = hotelCategories.map((category, i) =>
            i === index ? { ...category, isChecked: !category.isChecked } : category
        );

        // Get the selected category details
        const selectedCategory = hotelCategories[index];
        const idGuestRoom = selectedCategory.idGuestRoom || 0;  // Make sure idGuestRoom is available here
        const iPrice = selectedCategory.iPrice || 0;

        // Check if the category is now checked or unchecked
        const isChecked = !selectedCategory.isChecked;

        let updatedGuestRoomDetails;

        if (isChecked) {
            // Add the selected room details to guestRoomDetails if it's checked
            updatedGuestRoomDetails = [
                ...guestRoomDetails,
                {
                    idGuestRoom,
                    idGuest: primaryGuest.idGuestMaster,  // Assuming you have primaryGuest data
                    idHotelRoomCategory: roomCategoryId,
                    iPrice: iPrice
                }
            ];
        } else {
            // Remove the room details if it's unchecked
            updatedGuestRoomDetails = guestRoomDetails.filter(
                (room) => room.idHotelRoomCategory !== roomCategoryId
            );
        }

        // Filter out rooms that no longer have a valid idHotelRoomCategory
        updatedGuestRoomDetails = updatedGuestRoomDetails.filter(room => room.idHotelRoomCategory !== 0);

        // Update the state with the new data
        setHotelCategories(updatedCategories);
        setGuestRoomDetails(updatedGuestRoomDetails);

        // console.log("Updated GuestRoomDetails:", updatedGuestRoomDetails);
    };



    const GuestDetails = async () => {
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        try {
            const res = await axios.post(`${baseUrl}GuestDetails?idGuestMaster=${route.params.guestsId}`, {}, config);
            // setAllGuestData(res.data.Result);
            setPrimaryGuest(res.data.Result[0]);
            setGuestCount(res.data.Result[0]?.Details.length + 1); // Including the primary guest
            setGuests(res.data.Result[0]?.Details || []);
            setGuestRoomDetails(res.data.Result[0]?.GuestRoomDetails || []);

        } catch (err) {
            console.log("Error fetching guest data", err);
        }
    };

    const validateForm = () => {
        if (!primaryGuest.GuestName.trim()) {
            Alert.alert("First Name is required");
            return false;
        }
        if (!primaryGuest.ContactNo || primaryGuest.ContactNo.length !== 10) {
            Alert.alert("Please enter a valid 10-digit Mobile Number");
            return false;
        }
        return true;
    };

    const handleInputChange = (field, value) => {
        setPrimaryGuest({ ...primaryGuest, [field]: value });
    };

    const handleAdditionalGuestInputChange = (index, field, value) => {
        const updatedGuests = [...guests];
        updatedGuests[index] = { ...updatedGuests[index], [field]: value };
        setGuests(updatedGuests);
    };

    const handleDocumentPicker = async (index, field) => {
        try {
            const result = await ImagePicker.openPicker({
                includeBase64: true,
                mediaType: 'photo',
            });

            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedMimeTypes.includes(result.mime)) {
                Alert.alert('Invalid File', 'Please select a JPG or PNG image.');
                return;
            }

            const maxSizeInBytes = 5 * 1024 * 1024;
            if (result.size > maxSizeInBytes) {
                Alert.alert('File Too Large', 'The selected file size should not exceed 5MB.');
                return;
            }

            const base64Image = `${result.data}`;

            if (index === -1) {
                handleInputChange(field, base64Image);
            } else {
                handleAdditionalGuestInputChange(index, field, base64Image);
            }
        } catch (err) {
            if (ImagePicker.isCancel(err)) {
                Alert.alert('Canceled', 'Image picker was canceled');
            } else {
                Alert.alert('Error', 'Failed to pick image');
            }
        }
    };

    const [statusCode, setStatusCode] = useState({})
    const [submitValidateDateStatusCode, setSubmitValidateDateStatusCode] = useState('')


    useEffect(() => {
        submitValidateDate()
    }, [])

    const [checkoutDate, setCheckoutDate] = useState(new Date());
    const [showCheckoutPicker, setShowCheckoutPicker] = useState(false);

    const submitValidateDate = async () => {
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}ValidateDateForAddGuest?HotelId=${updatedValue.idHotelMaster}&SubmitDate=${moment(yesterday).format("DD/MMM/YYYY")}`, {}, config)
            .then((res) => {
                setSubmitValidateDateStatusCode(res.data)
            })
            .catch(err => {
            });
    };

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Set the default selected date label
    const [checkinDate, setCheckinDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeCheckout = (event, selectedDate) => {
        const currentDate = selectedDate || checkoutDate;
        setShowCheckoutPicker(false);

        if (moment(currentDate).isSame(today, 'day') && moment(checkinDate).isSame(today, 'day')) {
            setCheckoutDate(currentDate);
            setFieldValue('checkoutDate', currentDate); // Assuming you have a setFieldValue function
        } else if (currentDate >= checkinDate) {
            setCheckoutDate(currentDate);
            setFieldValue('checkoutDate', currentDate); // Assuming you have a setFieldValue function
        } else {
            Alert.alert('Warning', 'चेकआउट कि दिनांक चेक-इन दिनांक से पहले नहीं हो सकती।');
        }
    };

    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const selectDate = (date) => {
        if (submitValidateDateStatusCode.StatusCode == 1 && moment(date).isSame(yesterday, 'day')) {
            Alert.alert('Warning', `${submitValidateDateStatusCode.Message}`);
        } else {
            setCheckinDate(date);
            setShowDatePicker(false);
        }
    };


    const handleGuestCountChange = (value) => {
        setGuestCount(value);  // Total guest count, including primary guest

        const additionalGuestsNeeded = value - 1; // Guests other than the primary guest
        const currentGuestCount = guests.length;

        if (additionalGuestsNeeded > currentGuestCount) {
            // Add new guest objects if the count is increased
            setGuests([...guests, ...Array(additionalGuestsNeeded - currentGuestCount).fill({})]);
        } else {
            // Remove guest objects if the count is decreased
            setGuests(guests.slice(0, additionalGuestsNeeded));
        }
    };


    const handleSubmit = () => {
        setStatusCode("Hello");
        if (validateForm()) {
            // Parse dates with moment using ISO format
            const checkinDateISO = moment(checkinDate, "YYYY/MM/DD").isValid() ? moment(checkinDate).format("YYYY/MM/DD") : "";
            const checkoutDateISO = moment(checkoutDate, "YYYY/MM/DD").isValid() ? moment(checkoutDate).format("YYYY/MM/DD") : "";
            const enterDateISO = moment(primaryGuest.EnterDate, "YYYY/MM/DD").isValid() ? moment(primaryGuest.EnterDate).format("YYYY/MM/DD") : "";

            const formattedResponse = {
                idHotel: primaryGuest.idHotel || 0,
                idGuestMaster: primaryGuest.idGuestMaster || "",
                contactNo: primaryGuest.ContactNo || "",
                checkInDate: checkinDateISO,
                checkOutDate: checkoutDateISO,
                enterDate: enterDateISO || "",
                description: primaryGuest.Description || "None",
                bActive: primaryGuest.bActive || true,
                guestName: primaryGuest.GuestName || "",
                identificationNo: primaryGuest.IdentificationNo || "",
                identificationType: primaryGuest.IdentificationType || "",
                address: primaryGuest.Address || "",
                isDeleted: primaryGuest.isDeleted || false,
                AddionalGuest: guestCount,
                hotelName: primaryGuest.HotelName || "",
                details: guests.map(guest => ({
                    idGuest: primaryGuest.idGuestMaster || 0,
                    sName: guest.sName || "",
                    identificationNo: guest.IdentificationNo || "",
                    identificationType: guest.IdentificationType || "",
                    image: guest.Image || "",
                    gender: guest.gender || "",
                    filePass: guest.filePass || "",
                    lastName: guest.LastName || "",
                    image2: guest.Image2 || "",
                    contactNo: guest.ContactNo || ""
                })),
                categories: guestRoomDetails.map(room => ({
                    idHotelRoomCategory: room.idHotelRoomCategory || 0,
                    idGuestRoom: room.idGuestRoom || 0,
                    idGuest: primaryGuest.idGuestMaster || 0,
                    iPrice: room.iPrice || 0
                })),
                guestLastName: primaryGuest.GuestLastName || "",
                gender: primaryGuest.gender || null,
                travelReson: primaryGuest.TravelReson || null,
                city: primaryGuest.city || "",
                pIncode: primaryGuest.PIncode || "",
                filePass: primaryGuest.filePass || "",
                image1: primaryGuest.Image1 || "",
                image2: primaryGuest.Image2 || ""
            };

            // console.log(JSON.stringify(formattedResponse, null, 2));
            UpdateApi(formattedResponse); // Send formattedResponse to the API
        }
    };


    const UpdateApi = async (formattedResponse) => {
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };

        let body = formattedResponse
        await axios.post(`${baseUrl}InsertUpdateDeleteGuestMaster`, body, config)
            .then(response => {
                console.log("response>>..", response.data)
            })
            .catch(error => {
                console.error('Error sending form data:', error);

            });
    };


    return (
        <ScrollView style={{ marginHorizontal: 25 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>Primary Guest</Text>
            <Text style={styles.label}>First Name</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor={"grey"}
                value={primaryGuest.GuestName || ''}
                onChangeText={(text) => handleInputChange('GuestName', text)}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor={"grey"}
                value={primaryGuest.GuestLastName || ''}
                onChangeText={(text) => handleInputChange('GuestLastName', text)}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%", marginTop: 0 }}>
                <Text style={styles.lableText}>चेक इन तारीख<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
                <Text style={styles.lableText}>चेक आउट तारीख<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                <TouchableOpacity
                    style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "space-between", marginTop: 8, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }]}
                    onPress={openDatePicker}>
                    <Text style={{ color: "black", fontSize: 12 }}>{moment(checkinDate).format("DD-MM-YYYY")}</Text>
                    <Image source={CalendorIcon} style={{ height: 15, width: 15 }} />
                </TouchableOpacity>

                <Modal
                    visible={showDatePicker}
                    transparent={true}
                    animationType="slide" >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                            <Text style={{ color: "#024063" }}>चेक-इन दिनांक चुनें</Text>
                            <TouchableOpacity
                                onPress={() => selectDate(yesterday)}
                                disabled={statusCode === 1}
                                style={{ padding: 10, backgroundColor: statusCode === 1 ? 'grey' : 'white', marginVertical: 5 }}
                            >
                                <Text style={{ color: statusCode == 1 ? 'lightgrey' : 'black', fontSize: 12 }}>
                                    {`Yesterday (${moment(yesterday).format("DD/MM/YYYY")})  ${submitValidateDateStatusCode.StatusCode == 1 ? submitValidateDateStatusCode.Message : ''}`}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => selectDate(today)}
                                style={{ padding: 10, backgroundColor: 'white', marginVertical: 5 }}
                            >
                                <Text style={{ color: 'black', fontSize: 12 }}>{`Today (${moment(today).format("DD/MM/YYYY")})`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowDatePicker(false)} >
                                <Text style={{ color: '#024063', textAlign: 'center', marginTop: 10, fontSize: 14 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={[styles.input, { width: "45%", backgroundColor: '#fff', borderColor: '#E3E2E2', justifyContent: "space-between", marginTop: 8, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }]}
                    onPress={() => setShowCheckoutPicker(true)}>
                    <Text style={{ color: "black", fontSize: 12 }}>{checkoutDate ? moment(checkoutDate).format("DD-MM-YYYY") : "चेक आउट तारीख*"}</Text>
                    <Image source={CalendorIcon} style={{ height: 15, width: 15 }} />
                </TouchableOpacity>

                {showCheckoutPicker && (
                    <DateTimePicker
                        value={checkoutDate}
                        mode="date"
                        display="default"
                        onChange={onChangeCheckout}
                        minimumDate={yesterday}
                    />
                )}
            </View>

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                placeholderTextColor={"grey"}
                value={primaryGuest.ContactNo || ''}
                onChangeText={(text) => handleInputChange('ContactNo', text)}
            />

            <Text style={styles.label}>City</Text>
            <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor={"grey"}
                value={primaryGuest.city || ''}
                onChangeText={(text) => handleInputChange('city', text)}
            />

            <Text style={styles.label}>Gender</Text>
            <Dropdown
                style={[styles.input, { width: "95%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.selectedTextStyle} data={genderData}
                labelField="label"
                valueField="value"
                placeholder="Select Gender"
                value={selectedGender || primaryGuest.gender}
                onChange={item => {
                    setSelectedGender(item.value);
                    handleInputChange('gender', item.value);
                }}
            />

            <Text style={styles.label}>Travel Reason</Text>
            <Dropdown
                style={[styles.input, { width: "95%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.selectedTextStyle}
                data={travelReasonData}
                labelField="label"
                valueField="value"
                placeholder="Select Reason"
                value={selectTravelReason || primaryGuest.TravelReson}
                onChange={item => {
                    setSelectTravelReason(item.value);
                    handleInputChange('TravelReson', item.value);
                }}
            />

            <Text style={styles.label}>ID Type</Text>
            <Dropdown
                style={[styles.input, { width: "95%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.selectedTextStyle} data={idTypeData}
                labelField="label"
                valueField="value"
                placeholder="Select ID Type"
                value={selectedIDType || primaryGuest.IdentificationType}
                onChange={item => {
                    setSelectedIDType(item.value);
                    handleInputChange('IdentificationType', item.value);
                }}
            />

            <Text style={styles.label}>ID Number</Text>
            <TextInput
                style={[styles.input, { width: "95%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.selectedTextStyle} placeholder="ID Number"
                value={primaryGuest.IdentificationNo || ''}
                onChangeText={(text) => handleInputChange('IdentificationNo', text)}
            />

            <Text style={styles.label}>Images</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {primaryGuest.Image1 ? (
                    <TouchableOpacity onPress={() => handleDocumentPicker(-1, 'Image1')}>
                        <Image source={{ uri: `data:image/png;base64,${primaryGuest.Image1}` }} style={styles.image} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => handleDocumentPicker(-1, 'Image1')}>
                        <Text>Upload Image 1</Text>
                    </TouchableOpacity>
                )}
                {primaryGuest.Image2 ? (
                    <TouchableOpacity onPress={() => handleDocumentPicker(-1, 'Image2')}>
                        <Image source={{ uri: `data:image/png;base64,${primaryGuest.Image2}` }} style={styles.image} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => handleDocumentPicker(-1, 'Image2')}>
                        <Text>Upload Image 2</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={{ width: "95%" }}>
                {hotelCategories.length > 0 && (
                    <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <Text style={{ fontSize: 12, color: "#000", marginTop: 20, fontWeight: "500" }}>
                            Select the room category given to the guest. <Text style={{ color: "red" }}>*</Text>
                        </Text>

                        {hotelCategories.map((category, index) => (
                            <View key={category.idHotelRoomCategory} style={styles.categoryContainer}>
                                <CheckBox
                                    value={category.isChecked}
                                    onValueChange={() => handleCategoryCheck(index, category.idHotelRoomCategory)}
                                    tintColors={{ true: 'grey', false: 'grey' }}
                                />
                                <Text style={{ fontSize: 13, color: "#000", fontWeight: "500", textTransform: "capitalize" }}>
                                    {category.CategoryName} - ₹{category.iPrice}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>


            {/* Dropdown for guest count */}
            <Text style={styles.label}>Total Guests</Text>
            <Dropdown
                style={[styles.input, { width: "95%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.selectedTextStyle} data={[{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }]}
                labelField="label"
                valueField="value"
                placeholder="Select Total Guest Count"
                value={guestCount}
                onChange={(item) => handleGuestCountChange(item.value)}
            />

            {guests.map((guest, index) => (
                <View key={index}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>Additional Guest {index + 1}</Text>

                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor={"grey"}
                        value={guest.sName || ''}
                        onChangeText={(text) => handleAdditionalGuestInputChange(index, 'sName', text)}
                    />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor={"grey"}
                        value={guest.LastName || ''}
                        onChangeText={(text) => handleAdditionalGuestInputChange(index, 'LastName', text)}
                    />

                    <Text style={styles.label}>Mobile Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Mobile Number"
                        placeholderTextColor={"grey"}
                        value={guest.ContactNo || ''}
                        onChangeText={(text) => handleAdditionalGuestInputChange(index, 'ContactNo', text)}
                    />

                    <Text style={styles.label}>Gender</Text>
                    <Dropdown
                        style={[styles.input, { width: "95%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.selectedTextStyle}
                        data={genderData}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Gender"
                        value={guest.gender}
                        onChange={(item) => handleAdditionalGuestInputChange(index, 'gender', item.value)}
                    />

                    <Text style={styles.label}>ID Type</Text>
                    <Dropdown
                        style={[styles.input, { width: "95%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.selectedTextStyle}
                        data={idTypeData}
                        labelField="label"
                        valueField="value"
                        placeholder="Select ID Type"
                        value={guest.IdentificationType}
                        onChange={(item) => handleAdditionalGuestInputChange(index, 'IdentificationType', item.value)}
                    />

                    <Text style={styles.label}>ID Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ID Number"
                        placeholderTextColor={"grey"}
                        value={guest.IdentificationNo || ''}
                        onChangeText={(text) => handleAdditionalGuestInputChange(index, 'IdentificationNo', text)}
                    />

                    <Text style={styles.label}>Images</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {guest.Image ? (
                            <TouchableOpacity onPress={() => handleDocumentPicker(index, 'Image')}>
                                <Image source={{ uri: `data:image/png;base64,${guest.Image}` }} style={styles.image} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => handleDocumentPicker(index, 'Image')}>
                                <Text>Upload Image 1</Text>
                            </TouchableOpacity>
                        )}
                        {guest.Image2 ? (
                            <TouchableOpacity onPress={() => handleDocumentPicker(index, 'Image2')}>
                                <Image source={{ uri: `data:image/png;base64,${guest.Image2}` }} style={styles.image} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => handleDocumentPicker(index, 'Image2')}>
                                <Text>Upload Image 2</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            ))}

            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: '80%',
        borderRadius: 5,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: '80%',
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: "#000"
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    imageUpload: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: "black"

    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        color: "black",
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
        marginTop: 10,
    },
    placeholderStyle: {
        fontSize: 14,
        color: "grey"
    },
    selectedTextStyle: {
        fontSize: 12,
        color: "black"
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 12,
        color: "grey"
    },
    lableText: {
        fontSize: 12,
        color: "#000",
        marginLeft: 0,
        width: "45%",
        marginTop: 10
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    buttonContainer: {
        borderRadius: 15,
        marginTop: 16,
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1AA7FF'
    },
    button: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        fontWeight: "500"
    },
});

export default AddGuestInPendingReport;
