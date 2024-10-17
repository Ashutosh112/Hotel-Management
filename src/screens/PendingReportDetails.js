// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Dimensions, ScrollView, Image, Pressable } from 'react-native';
// import BackIcon from "react-native-vector-icons/Ionicons";
// import axios from 'axios';
// import { baseUrl } from '../utils/env';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import moment from 'moment'
// import Spinner from './Spinner';

// const PendingReportDetails = ({ navigation, route }) => {

//     const SubmitDate = route.params.SubmitDate;

//     useEffect(() => {
//         PendingDetails();
//     }, []);

//     const [guestData, setGuestData] = useState([]);
//     const [commonData, setCommonData] = useState({})
//     const [isLoading, setIsLoading] = useState(false);


//     const PendingDetails = async () => {
//         setIsLoading(true)
//         const value = await AsyncStorage.getItem('hotelmgmt');
//         let updatedValue = JSON.parse(value);
//         setCommonData(updatedValue)
//         const config = {
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Content-type": "application/json",
//                 "Authorization": `Bearer ${updatedValue.Token}`
//             }
//         };
//         await axios.post(`${baseUrl}GuestPandingDetailForReport?HotelId=${updatedValue.idHotelMaster}&fromDate=${SubmitDate}&toDate=${SubmitDate}`, {}, config)
//             .then((res) => {
//                 setIsLoading(false)
//                 setGuestData(res.data.Result);
//             })
//             .catch(err => {
//                 setIsLoading(false)
//             });
//     };

// const isDateOlderThanTodayAndYesterday = (date) => {
//     const today = moment().startOf('day');
//     const yesterday = moment().subtract(1, 'days').startOf('day');

//     let submitDate = moment(date, "DD MMM YYYY", true); // Adjust format according to actual data format

//     if (!submitDate.isValid()) {
//         return false; // Handle invalid date format case
//     }
//     return submitDate.isBefore(yesterday);
// };

//     // Function to count gender
//     const getGenderCount = () => {
//         const maleCount = guestData.filter(guest => guest.gender.toLowerCase() === 'पुरुष').length;
//         const femaleCount = guestData.filter(guest => guest.gender.toLowerCase() === 'महिला').length;
//         return { maleCount, femaleCount };
//     };

//     const { maleCount, femaleCount } = getGenderCount();

//     return (
//         <ScrollView style={styles.container}>
//             <Spinner isLoading={isLoading} />
//             <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "flex-start" }}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <BackIcon name="arrow-back-outline" size={20} color="#fff" style={{ marginLeft: 15 }} />
//                 </TouchableOpacity>
//                 <Text style={[styles.lableText, { marginLeft: 10, fontSize: 14, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>पेंडिंग रिपोर्ट डिटेल</Text>
//             </View>
//             <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />

//             <View style={{ paddingVertical: 10, elevation: 1, backgroundColor: "white", borderRadius: 10, marginHorizontal: 15, marginTop: 20, borderWidth: 1, borderColor: "#1b5372", paddingHorizontal: 15 }}>
//                 <View style={{ justifyContent: "space-between" }}>
//                     <Text style={{ fontSize: 10, color: "#000" }}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>होटल का नाम :</Text> {commonData.HotelName}</Text>
//                 </View>
//                 <View style={{ justifyContent: "space-between", marginTop: 8 }}>
//                     <Text style={{ fontSize: 10, color: "#000" }}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>चेक इन तारीख :</Text> {SubmitDate}</Text>
//                 </View>
//                 <View style={{ justifyContent: "space-between", marginTop: 8 }}>
//                     <Text style={{ fontSize: 10, color: "#000" }}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>रिपोर्ट सबमिट :</Text> {commonData.isSubmitted == true ? "हाँ" : "रिपोर्ट सबमिट नहीं की गई है।"}</Text>
//                 </View>
//                 <View style={{ justifyContent: "space-between", marginTop: 8 }}>
//                     <Text style={{ fontSize: 10, color: "#000" }}>
//                         <Text style={{ fontSize: 10, color: "#8E8E8E" }}>कुल अतिथि :</Text> {guestData.length} ( {maleCount} पुरुष, {femaleCount} महिला )
//                     </Text>
//                 </View>
//             </View>

// {guestData.map((item, index) => (
//     <View key={index} style={styles.guestContainer}>
//         <View style={styles.guestHeader}>
//             <Text style={styles.guestHeaderText}>अतिथि क्र. {index + 1}</Text>
//         </View>
//         <View style={styles.guestContentImage}>
//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <Image source={{ uri: "data:image/jpeg;base64," + item.Image1 }} style={styles.image} resizeMode="contain" />
//             </View>
//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <Image source={{ uri: "data:image/jpeg;base64," + item.Image2 }} style={styles.image} resizeMode="contain" />
//             </View>
//         </View>
//         <View style={styles.guestContent}>
//             <View style={{ flex: 1, justifyContent: "center" }}>
//                 <Text style={[styles.text2, { textTransform: "capitalize" }]}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>नाम :</Text> {item.GuestName} {item.GuestLastName}</Text>
//                 <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>जेंडर :</Text> {item.gender}</Text>
//                 <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>मोबाइल नंबर :</Text> {item.ContactNo}</Text>
//                 <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>पता :</Text> {item.Address}</Text>
//             </View>
//             <View style={{ flex: 1, justifyContent: "center" }}>
//                 <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>यात्रा का उद्देश्य :</Text> {item.TravelReson}</Text>
//                 <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>आईडी प्रकार :</Text> {item.IdentificationType}</Text>
//                 <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>आईडी नंबर :</Text> {item.IdentificationNo}</Text>
//             </View>
//         </View>
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", marginBottom: 10, marginHorizontal: 30 }}>


//             {isDateOlderThanTodayAndYesterday(SubmitDate) ? (
//                 <Pressable style={{ justifyContent: "center", alignItems: "flex-end", borderRadius: 4, borderColor: "lightgrey", backgroundColor: "lightgrey", borderWidth: 1.5, marginTop: 10 }} >
//                     <Text style={{ textAlign: "center", fontSize: 10, fontWeight: "400", color: "#fff", paddingHorizontal: 20, paddingVertical: 6 }}>Edit</Text>
//                 </Pressable>
//             ) : (
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate("AddGuestInPendingReport", { guestsId: guestData[0].idGuestMaster })}
//                     // onPress={() => alert("In Progress")}
//                     style={{ justifyContent: "center", alignItems: "flex-end", borderRadius: 4, borderColor: '#1AA7FF', backgroundColor: '#1AA7FF', borderWidth: 1.5, marginTop: 10 }} >
//                     <Text style={{ textAlign: "center", fontSize: 10, fontWeight: "400", color: "#fff", paddingHorizontal: 20, paddingVertical: 6 }}>Edit</Text>
//                 </TouchableOpacity>

//             )}
//         </View>
//     </View>
// ))}
//         </ScrollView>
//     );
// };


// const screenWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#F5F5F8",
//         flex: 1,
//     },
//     guestContainer: {
//         flex: 1,
//         backgroundColor: "white",
//         marginHorizontal: 15,
//         borderRadius: 10,
//         elevation: 2,
//         justifyContent: "center",
//         // alignItems: "center",
//         marginBottom: 10,
//         marginTop: 15
//     },
//     guestHeader: {
//         height: 35,
//         backgroundColor: "#1b5372",
//         width: "100%",
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         justifyContent: "center"
//     },
//     guestHeaderText: {
//         fontSize: 12,
//         color: "#fff",
//         marginHorizontal: 10,
//         fontWeight: "500"
//     },
//     guestContent: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         marginHorizontal: 10,
//         marginVertical: 10,
//     },
//     guestContentImage: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         marginHorizontal: 10,
//     },
//     image: {
//         width: screenWidth * 0.3,  // 40% of the screen width
//         height: screenWidth * 0.3, // Adjust the height similarly to maintain aspect ratio
//         marginTop: 10

//     },
//     text: {
//         fontSize: 12,
//         fontWeight: "500",
//         color: "#000",
//         marginTop: 5,
//         marginHorizontal: 10
//     },
//     text2: {
//         fontSize: 10,
//         fontWeight: "500",
//         color: "#000",
//         marginTop: 5,
//         marginHorizontal: 10

//     },
//     detailButton: {
//         borderWidth: 0.5,
//         borderColor: "#024063",
//         backgroundColor: "#024063",
//         borderRadius: 5,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     detailButtonText: {
//         fontSize: 12,
//         color: "#fff",
//         paddingVertical: 7
//     },
//     lableText: {
//         fontSize: 12,
//         color: "#000",
//         marginLeft: 0,
//         width: "45%",
//         marginTop: 10
//     },

// });
// export default PendingReportDetails;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Pressable, Alert, StatusBar } from 'react-native';
import BackIcon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Spinner from './Spinner';
import RNHTMLtoPDF from 'react-native-html-to-pdf'; // Import the PDF library
import { ToastAndroid } from 'react-native';
import RNFS from 'react-native-fs'; // Import the RNFS library

const PendingReportDetails = ({ navigation, route }) => {

    const SubmitDate = route.params.SubmitDate;

    useEffect(() => {
        PendingDetails();
    }, []);

    const [guestData, setGuestData] = useState([]);
    const [commonData, setCommonData] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const PendingDetails = async () => {
        setIsLoading(true);
        const value = await AsyncStorage.getItem('hotelmgmt');
        let updatedValue = JSON.parse(value);
        setCommonData(updatedValue);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
                "Authorization": `Bearer ${updatedValue.Token}`
            }
        };
        await axios.post(`${baseUrl}GuestPandingDetailForReport?HotelId=${updatedValue.idHotelMaster}&fromDate=${SubmitDate}&toDate=${SubmitDate}`, {}, config)
            .then((res) => {
                setIsLoading(false);
                setGuestData(res.data.Result);
            })
            .catch(err => {
                setIsLoading(false);
            });
    };

    const isDateOlderThanTodayAndYesterday = (date) => {
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'days').startOf('day');

        let submitDate = moment(date, "DD MMM YYYY", true); // Adjust format according to actual data format

        if (!submitDate.isValid()) {
            return false; // Handle invalid date format case
        }
        return submitDate.isBefore(yesterday);
    };

    const getGenderCount = () => {
        const maleCount = guestData.filter(guest => guest.gender.toLowerCase() === 'पुरुष').length;
        const femaleCount = guestData.filter(guest => guest.gender.toLowerCase() === 'महिला').length;
        return { maleCount, femaleCount };
    };

    const { maleCount, femaleCount } = getGenderCount();

    // Function to generate PDF
    const generatePDF = async () => {
        const getFormattedDate = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
        };

        let htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 10px;
                        }
                        .header {
                            background-color: #024063;
                            color: white;
                            text-align: center;
                            padding: 10px;
                        }
                        .detailsContainer {
                            margin-top: 20px;
                        }
                        .detailText {
                            font-size: 16px;
                            margin-bottom: 10px;
                        }
                        .guestContainer {
                            border: 1px solid #ccc;
                            padding: 10px;
                            margin-top: 10px;
                        }
                        .guestHeader {
                            font-weight: bold;
                            margin-bottom: 10px;
                        }
                        .guestContent {
                            display: flex;
                            justify-content: space-between;
                        }
                        .text2 {
                            font-size: 14px;
                            margin-bottom: 5px;
                        }
                        .image {
                            width: 100px;
                            height: 100px;
                        }
                        .downloadButton {
                            background-color: #024063;
                            color: white;
                            text-align: center;
                            padding: 10px;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>पेंडिंग रिपोर्ट डिटेल</h1>
                    </div>
                    <div class="detailsContainer">
                        <p class="detailText">होटल का नाम: ${commonData.HotelName || 'Test Hotel'}</p>
                        <p class="detailText">चेक इन तारीख: ${SubmitDate || '2024-10-17'}</p>
                        <p class="detailText">रिपोर्ट सबमिट : ${commonData.isSubmitted == true ? "हाँ" : "रिपोर्ट सबमिट नहीं की गई है।"}</p>

                        <p class="detailText">कुल अतिथि: ${guestData?.length || 0}</p>
                    </div>
                    ${guestData?.map((item, index) => `
                        <div class="guestContainer">
                            <div class="guestHeader">अतिथि क्र. ${index + 1}</div>
                            <div class="guestContent">
                                <div>
                                    <img class="image" src="data:image/jpeg;base64,${item.Image1}" alt="Guest-Image-1" />
                                    <p class="text2">नाम: ${item.GuestName} ${item.GuestLastName}</p>
                                    <p class="text2">जेंडर: ${item.gender}</p>
                                    <p class="text2">मोबाइल नंबर: ${item.ContactNo}</p>
                                    <p class="text2">पता: ${item.Address}</p>
                                </div>
                                <div>
                                    <p class="text2">यात्रा का उद्देश्य: ${item.TravelReson}</p>
                                    <p class="text2">आईडी प्रकार: ${item.IdentificationType}</p>
                                    <p class="text2">आईडी नंबर: ${item.IdentificationNo}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </body>
            </html>
        `;

        let options = {
            html: htmlContent,
            fileName: `HotelGuest_Pending_Report_${getFormattedDate()}`,
            directory: 'Documents',  // Save in the app's Documents directory temporarily
        };

        try {
            // Generate the PDF file
            let file = await RNHTMLtoPDF.convert(options);

            if (file && file.filePath) {
                // Define the public Downloads path where the file will be moved
                const destPath = `${RNFS.DownloadDirectoryPath}/Pending_Report_${getFormattedDate()}.pdf`;

                // Move the file from app-specific directory to public Downloads
                await RNFS.moveFile(file.filePath, destPath);

                // Notify user with a toast message
                ToastAndroid.show("PDF saved to: " + destPath, ToastAndroid.LONG);
            } else {
                console.error("No file generated");
            }
        } catch (error) {
            // Detailed error handling
            ToastAndroid.show("Error generating or moving PDF: " + error.message, ToastAndroid.LONG);
        }
    };



    return (
        <ScrollView style={styles.container}>
            <Spinner isLoading={isLoading} />
            <View style={{ flexDirection: "row", height: 100, width: Dimensions.get('window').width, backgroundColor: "#024063", borderBottomRightRadius: 15, alignItems: "center", justifyContent: "flex-start" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon name="arrow-back-outline" size={20} color="#fff" style={{ marginLeft: 15 }} />
                </TouchableOpacity>
                <Text style={[styles.lableText, { marginLeft: 10, fontSize: 14, fontWeight: "400", color: "#fff", width: "auto", marginTop: 0 }]}>पेंडिंग रिपोर्ट डिटेल</Text>
            </View>
            <StatusBar backgroundColor="#024063" barStyle="light-content" hidden={false} />

            <View style={{ paddingVertical: 10, elevation: 1, backgroundColor: "white", borderRadius: 10, marginHorizontal: 15, marginTop: 20, borderWidth: 1, borderColor: "#1b5372", paddingHorizontal: 15 }}>
                <View style={{ justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 10, color: "#000" }}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>होटल का नाम :</Text> {commonData.HotelName}</Text>
                </View>
                <View style={{ justifyContent: "space-between", marginTop: 8 }}>
                    <Text style={{ fontSize: 10, color: "#000" }}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>चेक इन तारीख :</Text> {SubmitDate}</Text>
                </View>
                <View style={{ justifyContent: "space-between", marginTop: 8 }}>
                    <Text style={{ fontSize: 10, color: "#000" }}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>रिपोर्ट सबमिट :</Text> {commonData.isSubmitted == true ? "हाँ" : "रिपोर्ट सबमिट नहीं की गई है।"}</Text>
                </View>
                <View style={{ justifyContent: "space-between", marginTop: 8 }}>
                    <Text style={{ fontSize: 10, color: "#000" }}>
                        <Text style={{ fontSize: 10, color: "#8E8E8E" }}>कुल अतिथि :</Text> {guestData.length} ( {maleCount} पुरुष, {femaleCount} महिला )
                    </Text>
                </View>
            </View>
            {/* Download PDF Button */}
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                <TouchableOpacity style={styles.downloadButton} onPress={generatePDF}>
                    <Text style={styles.downloadButtonText}>Download</Text>
                </TouchableOpacity>
            </View>
            {guestData.map((item, index) => (
                <View key={index} style={styles.guestContainer}>
                    <View style={styles.guestHeader}>
                        <Text style={styles.guestHeaderText}>अतिथि क्र. {index + 1}</Text>
                    </View>
                    <View style={styles.guestContentImage}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={{ uri: "data:image/jpeg;base64," + item.Image1 }} style={styles.image} resizeMode="contain" />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={{ uri: "data:image/jpeg;base64," + item.Image2 }} style={styles.image} resizeMode="contain" />
                        </View>
                    </View>
                    <View style={styles.guestContent}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={[styles.text2, { textTransform: "capitalize" }]}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>नाम :</Text> {item.GuestName} {item.GuestLastName}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>जेंडर :</Text> {item.gender}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>मोबाइल नंबर :</Text> {item.ContactNo}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>पता :</Text> {item.Address}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>यात्रा का उद्देश्य :</Text> {item.TravelReson}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>आईडी प्रकार :</Text> {item.IdentificationType}</Text>
                            <Text style={styles.text2}><Text style={{ fontSize: 10, color: "#8E8E8E" }}>आईडी नंबर :</Text> {item.IdentificationNo}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", marginBottom: 10, marginHorizontal: 30 }}>


                        {isDateOlderThanTodayAndYesterday(SubmitDate) ? (
                            <Pressable style={{ justifyContent: "center", alignItems: "flex-end", borderRadius: 4, borderColor: "lightgrey", backgroundColor: "lightgrey", borderWidth: 1.5, marginTop: 10 }} >
                                <Text style={{ textAlign: "center", fontSize: 10, fontWeight: "400", color: "#fff", paddingHorizontal: 20, paddingVertical: 6 }}>Edit</Text>
                            </Pressable>
                        ) : (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("AddGuestInPendingReport", { guestsId: guestData[0].idGuestMaster })}
                                // onPress={() => alert("In Progress")}
                                style={{ justifyContent: "center", alignItems: "flex-end", borderRadius: 4, borderColor: '#1AA7FF', backgroundColor: '#1AA7FF', borderWidth: 1.5, marginTop: 10 }} >
                                <Text style={{ textAlign: "center", fontSize: 10, fontWeight: "400", color: "#fff", paddingHorizontal: 20, paddingVertical: 6 }}>Edit</Text>
                            </TouchableOpacity>

                        )}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F8",
        flex: 1,
    },
    guestContainer: {
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 15,
        borderRadius: 10,
        elevation: 2,
        justifyContent: "center",
        // alignItems: "center",
        marginBottom: 10,
        marginTop: 15
    },
    guestHeader: {
        height: 35,
        backgroundColor: "#1b5372",
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center"
    },
    guestHeaderText: {
        fontSize: 12,
        color: "#fff",
        marginHorizontal: 10,
        fontWeight: "500"
    },
    guestContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    guestContentImage: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    image: {
        width: screenWidth * 0.3,  // 40% of the screen width
        height: screenWidth * 0.3, // Adjust the height similarly to maintain aspect ratio
        marginTop: 10

    },
    text: {
        fontSize: 12,
        fontWeight: "500",
        color: "#000",
        marginTop: 5,
        marginHorizontal: 10
    },
    text2: {
        fontSize: 10,
        fontWeight: "500",
        color: "#000",
        marginTop: 5,
        marginHorizontal: 10

    },
    detailButton: {
        borderWidth: 0.5,
        borderColor: "#024063",
        backgroundColor: "#024063",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    detailButtonText: {
        fontSize: 12,
        color: "#fff",
        paddingVertical: 7
    },
    lableText: {
        fontSize: 12,
        color: "#000",
        marginLeft: 0,
        width: "45%",
        marginTop: 10
    },
    downloadButton: {
        backgroundColor: "#1AA7FF",
        padding: 8,
        margin: 15,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 0,
        width: "25%",
    },
    downloadButtonText: {
        color: "#fff",
        fontSize: 12,
    },
});

export default PendingReportDetails;
