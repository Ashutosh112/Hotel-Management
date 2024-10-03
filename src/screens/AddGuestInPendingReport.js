// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { Dropdown } from 'react-native-element-dropdown';
// import ImagePicker from 'react-native-image-crop-picker';
// import axios from 'axios';
// import { baseUrl } from '../utils/env';
// import CheckBox from '@react-native-community/checkbox';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddGuestInPendingReport = () => {
//     const route = useRoute();
//     const { guestData } = route.params; // Accessing guestData from params
//     const [hotelCategories, setHotelCategories] = useState([]);
//     const [formValues, setFormValues] = useState({});
//     const [additionalGuests, setAdditionalGuests] = useState(guestData.length);
//     const [guestsImages, setGuestsImages] = useState(guestData.map((guest) => ({
//         Image1: guest.Image1 || null,
//         Image2: guest.Image2 || null
//     })));


//     useEffect(() => {
//         initializeFormValues();
//         hotelRoomCategory()
//     }, []);

//     const hotelRoomCategory = async () => {
//         // setIsLoading(true);
//         const value = await AsyncStorage.getItem('hotelmgmt');
//         let updatedValue = JSON.parse(value);
//         const config = {
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Content-type": "application/json",
//                 "Authorization": `Bearer ${updatedValue.Token}`
//             }
//         };
//         await axios.post(`${baseUrl}HotelCategory?idHotel=${updatedValue.idHotelMaster}`, {}, config)
//             .then((res) => {
//                 // setIsLoading(false);
//                 const categories = res.data.Result.map(cat => ({ ...cat, isChecked: false }));
//                 setHotelCategories(categories);
//             })
//             .catch(err => {
//                 // setIsLoading(false);
//             });
//     };

//     const handleCategoryCheck = (index) => {
//         const newCategories = [...hotelCategories];
//         newCategories[index].isChecked = !newCategories[index].isChecked;
//         setHotelCategories(newCategories);
//     };

// const genderData = [
//     { label: 'पुरुष', value: 'पुरुष' },
//     { label: 'महिला', value: 'महिला' },
//     { label: 'अन्य', value: 'अन्य' },
// ];

// const idTypeData = [
//     { label: 'आधार कार्ड', value: 'आधार कार्ड' },
//     { label: 'पासपोर्ट', value: 'पासपोर्ट' },
//     { label: 'वोटर आई कार्ड', value: 'वोटर आई कार्ड' },
//     { label: 'ड्राइविंग लाइसेंस', value: 'ड्राइविंग लाइसेंस' },
//     { label: 'पैन कार्ड', value: 'पैन कार्ड' },
//     { label: 'राशन कार्ड', value: 'राशन कार्ड' },
//     { label: 'सरकारी कर्मचारी पहचान पत्र', value: 'सरकारी कर्मचारी पहचान पत्र' },
//     { label: 'विदेशियों का पंजीकरण कार्ड (FRC)', value: 'विदेशियों का पंजीकरण कार्ड (FRC)' },
//     { label: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र', value: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र' },
// ];

// const travelReasonData = [
//     { label: 'दर्शन', value: 'दर्शन' },
//     { label: 'अध्यन या सेमिनार', value: 'अध्यन या सेमिनार' },
//     { label: 'सत्संग', value: 'सत्संग' },
//     { label: 'पारिवारिक या मित्रो से मिलना', value: 'पारिवारिक या मित्रो से मिलना' },
//     { label: 'व्यापारिक या व्यावासयिक यात्रा', value: 'व्यापारिक या व्यावासयिक यात्रा' },
//     { label: 'अन्य', value: 'अन्य' },
// ];



//     const initializeFormValues = () => {
//         let initialValues = {};
//         guestData.forEach((guest, index) => {
//             initialValues[`firstname_${index}`] = guest.GuestName;
//             initialValues[`lastname_${index}`] = guest.GuestLastName;
//             initialValues[`gender_${index}`] = guest.gender;
//             initialValues[`address_${index}`] = guest.Address;
//             initialValues[`travelReason_${index}`] = guest.TravelReson;
//             initialValues[`identificationType_${index}`] = guest.IdentificationType;
//             initialValues[`identificationNo_${index}`] = guest.IdentificationNo;
//             initialValues[`contactNo_${index}`] = guest.ContactNo;
//         });

//         setFormValues(initialValues);
//         setAdditionalGuests(guestData.length); // Set initial guests to match the passed guestData
//     };

//     const handleChange = (name, value) => {
//         setFormValues({ ...formValues, [name]: value });
//     };

//     const handleImagePick = async (index, field) => {
//         try {
//             const result = await ImagePicker.openPicker({
//                 includeBase64: true,
//                 mediaType: 'photo',
//             });

//             const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//             if (!allowedMimeTypes.includes(result.mime)) {
//                 Alert.alert('Invalid File', 'Please select a JPG or PNG image.');
//                 return;
//             }

//             const maxSizeInBytes = 5 * 1024 * 1024;
//             if (result.size > maxSizeInBytes) {
//                 Alert.alert('File Too Large', 'The selected file size should not exceed 5MB.');
//                 return;
//             }

//             const base64Image = result.data;
//             const updatedImages = [...guestsImages];
//             updatedImages[index] = { ...updatedImages[index], [field]: base64Image };
//             setGuestsImages(updatedImages);
//         } catch (err) {
//             if (ImagePicker.isCancel(err)) {
//                 Alert.alert('Canceled', 'Image picker was canceled');
//             } else {
//                 Alert.alert('Error', 'Failed to pick image');
//             }
//         }
//     };

//     const renderGuestFields = () => {
//         return Array.from({ length: additionalGuests }, (_, index) => (
//             <View key={index} style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
//                 <Text style={styles.userLabel}>अतिथि {index + 1}</Text>

//                 <Text style={styles.label}>First Name:</Text>
//                 <TextInput style={styles.input}
//                     value={formValues[`firstname_${index}`]}
//                     onChangeText={(text) => handleChange(`firstname_${index}`, text)}
//                 />
//                 <Text style={styles.label}>Last Name:</Text>
//                 <TextInput style={styles.input}
//                     value={formValues[`lastname_${index}`]}
//                     onChangeText={(text) => handleChange(`lastname_${index}`, text)}
//                 />

//                 <Text style={styles.label}>Gender:</Text>
//                 <Dropdown
// style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
// placeholderStyle={styles.placeholderStyle}
// selectedTextStyle={styles.selectedTextStyle}
// inputSearchStyle={styles.inputSearchStyle}
// itemTextStyle={styles.selectedTextStyle}
//                     data={genderData}
//                     labelField="label"
//                     valueField="value"
//                     value={formValues[`gender_${index}`]}
//                     placeholder="Select Gender"
//                     onChange={(item) => handleChange(`gender_${index}`, item.value)}
//                 />

//                 {/* Show Travel Reason and Address only for User 1 */}
//                 {index === 0 && (
//                     <>
//                         <Text style={styles.label}>Travel Reason:</Text>
//                         <Dropdown
// style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
// placeholderStyle={styles.placeholderStyle}
// selectedTextStyle={styles.selectedTextStyle}
// inputSearchStyle={styles.inputSearchStyle}
// itemTextStyle={styles.selectedTextStyle}
//                             data={travelReasonData}
//                             labelField="label"
//                             valueField="value"
//                             value={formValues[`travelReason_${index}`]}
//                             placeholder="Select Travel Reason"
//                             onChange={(item) => handleChange(`travelReason_${index}`, item.value)}
//                         />

//                         <Text style={styles.label}>Address:</Text>
//                         <TextInput style={styles.input}
//                             value={formValues[`address_${index}`]}
//                             onChangeText={(text) => handleChange(`address_${index}`, text)}
//                         />
//                     </>
//                 )}

//                 <Text style={styles.label}>Identification Type:</Text>
//                 <Dropdown
//                     style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
//                     placeholderStyle={styles.placeholderStyle}
//                     selectedTextStyle={styles.selectedTextStyle}
//                     inputSearchStyle={styles.inputSearchStyle}
//                     itemTextStyle={styles.selectedTextStyle}
//                     data={idTypeData}
//                     labelField="label"
//                     valueField="value"
//                     value={formValues[`identificationType_${index}`]}
//                     placeholder="Select ID Type"
//                     onChange={(item) => handleChange(`identificationType_${index}`, item.value)}
//                 />

//                 <Text style={styles.label}>Identification No:</Text>
//                 <TextInput style={styles.input}
//                     value={formValues[`identificationNo_${index}`]}
//                     onChangeText={(text) => handleChange(`identificationNo_${index}`, text)}
//                 />

//                 <Text style={styles.label}>Contact No:</Text>
//                 <TextInput style={styles.input}
//                     value={formValues[`contactNo_${index}`]}
//                     onChangeText={(text) => handleChange(`contactNo_${index}`, text)}
//                 />

//                 {/* Image Upload for User */}
//                 <Text style={styles.label}>Upload ID Images:</Text>
//                 <View style={styles.imageContainer}>
//                     <TouchableOpacity onPress={() => handleImagePick(index, 'Image1')} style={styles.imageUpload}>
//                         {guestsImages[index]?.Image1 ? (
//                             <Image source={{ uri: `data:image/jpeg;base64,${guestsImages[index].Image1}` }} style={styles.imagePreview} />
//                         ) : (
//                             <Text>Select Image 1</Text>
//                         )}
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleImagePick(index, 'Image2')} style={styles.imageUpload}>
//                         {guestsImages[index]?.Image2 ? (
//                             <Image source={{ uri: `data:image/jpeg;base64,${guestsImages[index].Image2}` }} style={styles.imagePreview} />
//                         ) : (
//                             <Text>Select Image 2</Text>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         ));
//     };

//     return (
//         <ScrollView>
//             {/* Render guest fields based on the number of additional guests */}
//             {renderGuestFields()}



//             <View style={{ width: "85%", marginHorizontal: 30 }}>
//                 {hotelCategories.length > 0 && (
//                     <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
//                         <Text style={{
//                             fontSize: 12,
//                             color: "#000",
//                             marginTop: 20,
//                             fontWeight: "500"
//                         }}>अतिथि को दिए हुए कमरे की श्रेणी चुनें।<Text style={[styles.lableText, { color: "red" }]}>*</Text></Text>
//                         {hotelCategories.map((category, index) => (
//                             <View key={category.idHotelRoomCategory} style={styles.categoryContainer}>
//                                 <CheckBox
//                                     value={category.isChecked}
//                                     onValueChange={() => handleCategoryCheck(index)}
//                                     tintColors='grey'
//                                     onTintColor="grey"
//                                     onFillColor='grey'
//                                 />
//                                 <Text style={{ fontSize: 13, color: "#000", fontWeight: "500", textTransform: "capitalize" }}>{category.CategoryName} - {category.iPrice}</Text>
//                             </View>
//                         ))}


//                     </View>
//                 )}
//             </View>

//             <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
//                 <Text style={styles.label}>Additional Guests:</Text>
//                 <Dropdown
//                     style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
//                     placeholderStyle={styles.placeholderStyle}
//                     selectedTextStyle={styles.selectedTextStyle}
//                     inputSearchStyle={styles.inputSearchStyle}
//                     itemTextStyle={styles.selectedTextStyle}
//                     data={Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
//                     labelField="label"
//                     valueField="value"
//                     value={additionalGuests}
//                     onChange={(item) => setAdditionalGuests(item.value)}
//                 />
//             </View>
//         </ScrollView>
//     );
// };


// const styles = StyleSheet.create({
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginBottom: 10,
//         width: '80%',
//         borderRadius: 5,
//     },
//     dropdown: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginBottom: 10,
//         width: '80%',
//         borderRadius: 5,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     userLabel: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         color: "#000"
//     },
//     imageContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         marginBottom: 20,
//     },
//     imageUpload: {
//         width: 100,
//         height: 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//     },
//     imagePreview: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 5,
//     },
//     container: {
//         padding: 20,
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     textInput: {
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         marginBottom: 12,
//         paddingHorizontal: 10,
//         borderRadius: 5,
//         color: "black"

//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 6,
//         color: "black",
//     },
//     input: {
//         width: Dimensions.get('window').width - 60,
//         backgroundColor: '#fff',
//         borderWidth: 1,
//         borderColor: '#E3E2E2',
//         borderRadius: 10,
//         paddingHorizontal: 20,
//         color: "#000",
//         height: 50,
//         marginTop: 10,
//     },
//     placeholderStyle: {
//         fontSize: 14,
//         color: "grey"
//     },
//     selectedTextStyle: {
//         fontSize: 12,
//         color: "black"
//     },
//     inputSearchStyle: {
//         height: 40,
//         fontSize: 12,
//         color: "grey"
//     },
//     lableText: {
//         fontSize: 12,
//         color: "#000",
//         marginLeft: 0,
//         width: "45%",
//         marginTop: 10
//     },
//     categoryContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
// });

// export default AddGuestInPendingReport;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { Dropdown } from 'react-native-element-dropdown';
// import ImagePicker from 'react-native-image-crop-picker';
// import axios from 'axios';
// import { baseUrl } from '../utils/env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddGuestInPendingReport = () => {
//     const route = useRoute();
//     const { guestData } = route.params; // Accessing guestData from params
//     const [allGuestData, setAllGuestData] = useState([])
//     const [formValues, setFormValues] = useState({});
//     const [additionalGuests, setAdditionalGuests] = useState(guestData.length);
//     const [guestsImages, setGuestsImages] = useState(guestData.map((guest) => ({
//         Image1: guest.Image1 || null,
//         Image2: guest.Image2 || null
//     })));

//     useEffect(() => {
//         initializeFormValues();
//         GuestDetails()
//     }, []);


// const GuestDetails = async () => {
//     const value = await AsyncStorage.getItem('hotelmgmt');
//     let updatedValue = JSON.parse(value);
//     const config = {
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${updatedValue.Token}`
//         }
//     };
//     await axios.post(`${baseUrl}GuestDetails?idGuestMaster=${route.params.guestsId}`, {}, config)
//         .then((res) => {
//             setAllGuestData(res.data.Result);
//             console.log("rrrrrr", res.data.Result)
//         })
//         .catch(err => {
//             console.log("eeeerrr", err)
//         });
// };

// const genderData = [
//     { label: 'पुरुष', value: 'पुरुष' },
//     { label: 'महिला', value: 'महिला' },
//     { label: 'अन्य', value: 'अन्य' },
// ];

// const idTypeData = [
//     { label: 'आधार कार्ड', value: 'आधार कार्ड' },
//     { label: 'पासपोर्ट', value: 'पासपोर्ट' },
//     { label: 'वोटर आई कार्ड', value: 'वोटर आई कार्ड' },
//     { label: 'ड्राइविंग लाइसेंस', value: 'ड्राइविंग लाइसेंस' },
//     { label: 'पैन कार्ड', value: 'पैन कार्ड' },
//     { label: 'राशन कार्ड', value: 'राशन कार्ड' },
//     { label: 'सरकारी कर्मचारी पहचान पत्र', value: 'सरकारी कर्मचारी पहचान पत्र' },
//     { label: 'विदेशियों का पंजीकरण कार्ड (FRC)', value: 'विदेशियों का पंजीकरण कार्ड (FRC)' },
//     { label: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र', value: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र' },
// ];

// const travelReasonData = [
//     { label: 'दर्शन', value: 'दर्शन' },
//     { label: 'अध्यन या सेमिनार', value: 'अध्यन या सेमिनार' },
//     { label: 'सत्संग', value: 'सत्संग' },
//     { label: 'पारिवारिक या मित्रो से मिलना', value: 'पारिवारिक या मित्रो से मिलना' },
//     { label: 'व्यापारिक या व्यावासयिक यात्रा', value: 'व्यापारिक या व्यावासयिक यात्रा' },
//     { label: 'अन्य', value: 'अन्य' },
// ];



//     const initializeFormValues = () => {
//         let initialValues = {};
//         guestData.forEach((guest, index) => {
//             initialValues[`firstname_${index}`] = guest.GuestName;
//             initialValues[`lastname_${index}`] = guest.GuestLastName;
//             initialValues[`gender_${index}`] = guest.gender;
//             initialValues[`address_${index}`] = guest.Address;
//             initialValues[`travelReason_${index}`] = guest.TravelReson;
//             initialValues[`identificationType_${index}`] = guest.IdentificationType;
//             initialValues[`identificationNo_${index}`] = guest.IdentificationNo;
//             initialValues[`contactNo_${index}`] = guest.ContactNo;
//         });

//         setFormValues(initialValues);
//         setAdditionalGuests(guestData.length); // Set initial guests to match the passed guestData
//     };

//     const handleChange = (name, value) => {
//         setFormValues({ ...formValues, [name]: value });
//     };

//     const handleImagePick = async (index, field) => {
//         try {
//             const result = await ImagePicker.openPicker({
//                 includeBase64: true,
//                 mediaType: 'photo',
//             });

//             const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//             if (!allowedMimeTypes.includes(result.mime)) {
//                 Alert.alert('Invalid File', 'Please select a JPG or PNG image.');
//                 return;
//             }

//             const maxSizeInBytes = 5 * 1024 * 1024;
//             if (result.size > maxSizeInBytes) {
//                 Alert.alert('File Too Large', 'The selected file size should not exceed 5MB.');
//                 return;
//             }

//             const base64Image = result.data;
//             const updatedImages = [...guestsImages];
//             updatedImages[index] = { ...updatedImages[index], [field]: base64Image };
//             setGuestsImages(updatedImages);
//         } catch (err) {
//             if (ImagePicker.isCancel(err)) {
//                 Alert.alert('Canceled', 'Image picker was canceled');
//             } else {
//                 Alert.alert('Error', 'Failed to pick image');
//             }
//         }
//     };

//     const renderGuestFields = () => {
//         return Array.from({ length: additionalGuests }, (_, index) => (
//             <View key={index} style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
//                 <Text style={styles.userLabel}>अतिथि {index + 1}</Text>

//                 <Text style={styles.label}>First Name:</Text>
//                 <TextInput style={styles.input}
//                     value={formValues[`firstname_${index}`]}
//                     onChangeText={(text) => handleChange(`firstname_${index}`, text)}
//                 />
//                 <Text style={styles.label}>Last Name:</Text>
//                 <TextInput style={styles.input}
//                     value={formValues[`lastname_${index}`]}
//                     onChangeText={(text) => handleChange(`lastname_${index}`, text)}
//                 />

//                 <Text style={styles.label}>Gender:</Text>
//                 <Dropdown
//                     style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
//                     placeholderStyle={styles.placeholderStyle}
//                     selectedTextStyle={styles.selectedTextStyle}
//                     inputSearchStyle={styles.inputSearchStyle}
//                     itemTextStyle={styles.selectedTextStyle}
//                     data={genderData}
//                     labelField="label"
//                     valueField="value"
//                     value={formValues[`gender_${index}`]}
//                     placeholder="Select Gender"
//                     onChange={(item) => handleChange(`gender_${index}`, item.value)}
//                 />

//                 {/* Show Travel Reason and Address only for User 1 */}
//                 {index === 0 && (
//                     <>
//                         <Text style={styles.label}>Travel Reason:</Text>
//                         <Dropdown
//                             style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
//                             placeholderStyle={styles.placeholderStyle}
//                             selectedTextStyle={styles.selectedTextStyle}
//                             inputSearchStyle={styles.inputSearchStyle}
//                             itemTextStyle={styles.selectedTextStyle}
//                             data={travelReasonData}
//                             labelField="label"
//                             valueField="value"
//                             value={formValues[`travelReason_${index}`]}
//                             placeholder="Select Travel Reason"
//                             onChange={(item) => handleChange(`travelReason_${index}`, item.value)}
//                         />

//                         <Text style={styles.label}>Address:</Text>
//                         <TextInput style={styles.input}
//                             value={formValues[`address_${index}`]}
//                             onChangeText={(text) => handleChange(`address_${index}`, text)}
//                         />
//                     </>
//                 )}

//                 <Text style={styles.label}>Identification Type:</Text>
//                 <Dropdown
// style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
// placeholderStyle={styles.placeholderStyle}
// selectedTextStyle={styles.selectedTextStyle}
// inputSearchStyle={styles.inputSearchStyle}
// itemTextStyle={styles.selectedTextStyle}
//                     data={idTypeData}
//                     labelField="label"
//                     valueField="value"
//                     value={formValues[`identificationType_${index}`]}
//                     placeholder="Select ID Type"
//                     onChange={(item) => handleChange(`identificationType_${index}`, item.value)}
//                 />

//                 <Text style={styles.label}>Identification No:</Text>
//                 <TextInput style={styles.input}
//                     value={formValues[`identificationNo_${index}`]}
//                     onChangeText={(text) => handleChange(`identificationNo_${index}`, text)}
//                 />

//                 <Text style={styles.label}>Contact No:</Text>
//                 <TextInput style={styles.input}
//                     value={formValues[`contactNo_${index}`]}
//                     onChangeText={(text) => handleChange(`contactNo_${index}`, text)}
//                 />

//                 {/* Image Upload for User */}
//                 <Text style={styles.label}>Upload ID Images:</Text>
//                 <View style={styles.imageContainer}>
//                     <TouchableOpacity onPress={() => handleImagePick(index, 'Image1')} style={styles.imageUpload}>
//                         {guestsImages[index]?.Image1 ? (
//                             <Image source={{ uri: `data:image/jpeg;base64,${guestsImages[index].Image1}` }} style={styles.imagePreview} />
//                         ) : (
//                             <Text>Select Image 1</Text>
//                         )}
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleImagePick(index, 'Image2')} style={styles.imageUpload}>
//                         {guestsImages[index]?.Image2 ? (
//                             <Image source={{ uri: `data:image/jpeg;base64,${guestsImages[index].Image2}` }} style={styles.imagePreview} />
//                         ) : (
//                             <Text>Select Image 2</Text>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         ));
//     };

//     return (
//         <ScrollView>
//             {/* Render guest fields based on the number of additional guests */}
//             {renderGuestFields()}
//             <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
//                 <Text style={styles.label}>Additional Guests:</Text>
//                 <Dropdown
//  style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
// placeholderStyle={styles.placeholderStyle}
// selectedTextStyle={styles.selectedTextStyle}
// inputSearchStyle={styles.inputSearchStyle}
// itemTextStyle={styles.selectedTextStyle}
//                     data={Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
//                     labelField="label"
//                     valueField="value"
//                     value={additionalGuests}
//                     onChange={(item) => setAdditionalGuests(item.value)}
//                 />
//             </View>
//         </ScrollView>
//     );
// };


// const styles = StyleSheet.create({
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginBottom: 10,
//         width: '80%',
//         borderRadius: 5,
//     },
//     dropdown: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginBottom: 10,
//         width: '80%',
//         borderRadius: 5,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     userLabel: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 15,
//         color: "#000"
//     },
//     imageContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         marginBottom: 20,
//     },
//     imageUpload: {
//         width: 100,
//         height: 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//     },
//     imagePreview: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 5,
//     },
//     container: {
//         padding: 20,
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     textInput: {
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         marginBottom: 12,
//         paddingHorizontal: 10,
//         borderRadius: 5,
//         color: "black"

//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 6,
//         color: "black",
//     },
//     input: {
//         width: Dimensions.get('window').width - 60,
//         backgroundColor: '#fff',
//         borderWidth: 1,
//         borderColor: '#E3E2E2',
//         borderRadius: 10,
//         paddingHorizontal: 20,
//         color: "#000",
//         height: 50,
//         marginTop: 10,
//     },
//     placeholderStyle: {
//         fontSize: 14,
//         color: "grey"
//     },
//     selectedTextStyle: {
//         fontSize: 12,
//         color: "black"
//     },
//     inputSearchStyle: {
//         height: 40,
//         fontSize: 12,
//         color: "grey"
//     },
//     lableText: {
//         fontSize: 12,
//         color: "#000",
//         marginLeft: 0,
//         width: "45%",
//         marginTop: 10
//     },
//     categoryContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
// });

// export default AddGuestInPendingReport;






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { baseUrl } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from '@react-native-community/checkbox';

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

    const handleCategoryCheck = (index) => {
        const newCategories = [...hotelCategories];
        newCategories[index].isChecked = !newCategories[index].isChecked;
        setHotelCategories(newCategories);
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

    const handleSubmit = () => {
        if (validateForm()) {
            console.log({ primaryGuest, guests });
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
                                    onValueChange={() => handleCategoryCheck(index)}
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
