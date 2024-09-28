// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { Dropdown } from 'react-native-element-dropdown';
// import PhotoIcon from "../assets/images/photologoicon.png";

// const AddGuestInPendingReport = () => {
//     const route = useRoute();
//     const { guestData = [] } = route.params || {};  // Use empty array if guestData is undefined
//     const [formValues, setFormValues] = useState({});
//     const [additionalGuests, setAdditionalGuests] = useState(0);

//     const genderData = [
//         { label: 'पुरुष', value: 'पुरुष' },
//         { label: 'महिला', value: 'महिला' },
//         { label: 'अन्य', value: 'अन्य' },
//     ];

//     const idTypeData = [
//         { label: 'आधार कार्ड', value: 'आधार कार्ड' },
//         { label: 'पासपोर्ट', value: 'पासपोर्ट' },
//         { label: 'वोटर आई कार्ड', value: 'वोटर आई कार्ड' },
//         { label: 'ड्राइविंग लाइसेंस', value: 'ड्राइविंग लाइसेंस' },
//         { label: 'पैन कार्ड', value: 'पैन कार्ड' },
//         { label: 'राशन कार्ड', value: 'राशन कार्ड' },
//         { label: 'सरकारी कर्मचारी पहचान पत्र', value: 'सरकारी कर्मचारी पहचान पत्र' },
//         { label: 'विदेशियों का पंजीकरण कार्ड (FRC)', value: 'विदेशियों का पंजीकरण कार्ड (FRC)' },
//         { label: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र', value: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र' },
//     ];

//     const travelReasonData = [
//         { label: 'दर्शन', value: 'दर्शन' },
//         { label: 'अध्यन या सेमिनार', value: 'अध्यन या सेमिनार' },
//         { label: 'सत्संग', value: 'सत्संग' },
//         { label: 'पारिवारिक या मित्रो से मिलना', value: 'पारिवारिक या मित्रो से मिलना' },
//         { label: 'व्यापारिक या व्यावासयिक यात्रा', value: 'व्यापारिक या व्यावासयिक यात्रा' },
//         { label: 'अन्य', value: 'अन्य' },
//     ];

//     useEffect(() => {
//         console.log('Received guestData:', guestData);
//         const initialFormValues = initializeFormValues(guestData);
//         setFormValues(initialFormValues);
//     }, [guestData]);



//     // Initialize form values dynamically
//     const initializeFormValues = (guestData) => {
//         if (!Array.isArray(guestData)) {
//             return {};  // Return empty form values if guestData is not an array
//         }

//         const initialValues = {};
//         guestData.forEach((guest, index) => {
//             initialValues[`firstname_${index}`] = guest.firstname || '';
//             initialValues[`lastname_${index}`] = guest.lastname || '';
//             initialValues[`gender_${index}`] = guest.gender || ''; // Assuming `gender` field exists in guestData
//             initialValues[`city_${index}`] = guest.city || '';  // This will only be used for the last user
//             initialValues[`travelReason_${index}`] = guest.travelReason || '';  // This will only be used for the last user
//             initialValues[`identificationType_${index}`] = guest.identificationType || '';
//             initialValues[`identificationNo_${index}`] = guest.identificationNo || '';
//             initialValues[`idFront_${index}`] = guest.idFront || '';  // Initialize idFront from API data
//             initialValues[`idBack_${index}`] = guest.idBack || '';  // Initialize idBack from API data
//         });
//         return initialValues;
//     };



//     // Update form values
//     const handleChange = (name, value) => {
//         setFormValues({ ...formValues, [name]: value });
//     };

//     // Render guest form fields
//     const renderGuestFields = () => {
//         return guestData.map((guest, index) => (
//             <View key={index} style={{ justifyContent: "center", alignItems: "center" }}>
//                 <Text style={styles.label}>First Name:</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={formValues[`firstname_${index}`]}
//                     onChangeText={(text) => handleChange(`firstname_${index}`, text)}
//                 />

//                 <Text style={styles.label}>Last Name:</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={formValues[`lastname_${index}`]}
//                     onChangeText={(text) => handleChange(`lastname_${index}`, text)}
//                 />

//                 <Text style={styles.label}>Gender:</Text>
//                 <Dropdown
//                     style={styles.input}
//                     data={genderData}
//                     labelField="label"
//                     valueField="value"
//                     value={formValues[`gender_${index}`]}
//                     onChange={(item) => handleChange(`gender_${index}`, item.value)}
//                 />

//                 {/* Conditionally Render Travel Reason and City for the last user (Ashutosh Wagh) */}
//                 {index === guestData.length - 1 && (
//                     <>
//                         <Text style={styles.label}>Travel Reason:</Text>
//                         <Dropdown
//                             style={styles.input}
//                             data={travelReasonData}
//                             labelField="label"
//                             valueField="value"
//                             value={formValues[`travelReason_${index}`]}
//                             onChange={(item) => handleChange(`travelReason_${index}`, item.value)}
//                         />

//                         <Text style={styles.label}>City:</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={formValues[`address_${index}`]}
//                             onChangeText={(text) => handleChange(`address_${index}`, text)}
//                         />
//                     </>
//                 )}

//                 <Text style={styles.label}>Identification Type:</Text>
//                 <Dropdown
//                     style={styles.input}
//                     data={idTypeData}
//                     labelField="label"
//                     valueField="value"
//                     value={formValues[`identificationType_${index}`]}
//                     onChange={(item) => handleChange(`identificationType_${index}`, item.value)}
//                 />

//                 <Text style={styles.label}>Identification No:</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={formValues[`identificationNo_${index}`]}
//                     onChangeText={(text) => handleChange(`identificationNo_${index}`, text)}
//                 />

//                 {/* Image Upload Section */}
//                 <Text style={styles.label}>Upload ID Front Photo:</Text>
//                 <TouchableOpacity
//                     style={[styles.input, { height: 80, width: "85%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", alignItems: "center" }]}
//                     onPress={() => handleDocumentPicker(index, 'idFront')}>
//                     {guest.idFront ? (
//                         <Text style={{ fontSize: 12, color: "green" }}>Image Uploaded</Text>
//                     ) : (
//                         <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
//                     )}
//                 </TouchableOpacity>

//                 <Text style={styles.label}>Upload ID Back Photo:</Text>
//                 <TouchableOpacity
//                     style={[styles.input, { height: 80, width: "85%", backgroundColor: '#fff', borderColor: '#1AA7FF', borderStyle: 'dashed', justifyContent: "center", alignItems: "center" }]}
//                     onPress={() => handleDocumentPicker(index, 'idBack')}>
//                     {guest.idBack ? (
//                         <Text style={{ fontSize: 12, color: "green" }}>Image Uploaded</Text>
//                     ) : (
//                         <Image source={PhotoIcon} style={{ height: 25, width: 25 }} />
//                     )}
//                 </TouchableOpacity>
//             </View>
//         ));
//     };

//     return (
//         <ScrollView>
//             <Button title="Initialize Form" onPress={initializeFormValues} />
//             {renderGuestFields()}
//             <Text style={styles.label}>Additional Guests:</Text>
//             <Dropdown
//                 style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 inputSearchStyle={styles.inputSearchStyle}
//                 itemTextStyle={styles.selectedTextStyle}
//                 data={Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
//                 labelField="label"
//                 valueField="value"
//                 placeholder="Select Additional Guests"
//                 value={additionalGuests || guestData.length}  // Fallback to guestData length
//                 onChange={(item) => handleAdditionalGuestsChange(item.value)}  // Update the value when changed
//             />

//         </ScrollView>

//     );
// };
// export default AddGuestInPendingReport;

// const styles = StyleSheet.create({
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
// });



//////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { Dropdown } from 'react-native-element-dropdown';

// const AddGuestInPendingReport = () => {
//     const route = useRoute();
//     const { guestData } = route.params; // Accessing guestData from params
//     const [formValues, setFormValues] = useState({});
//     const [additionalGuests, setAdditionalGuests] = useState(0);

//     const genderData = [
//         { label: 'पुरुष', value: 'पुरुष' },
//         { label: 'महिला', value: 'महिला' },
//         { label: 'अन्य', value: 'अन्य' },
//     ];

//     const idTypeData = [
//         { label: 'आधार कार्ड', value: 'आधार कार्ड' },
//         { label: 'पासपोर्ट', value: 'पासपोर्ट' },
//         { label: 'वोटर आई कार्ड', value: 'वोटर आई कार्ड' },
//         { label: 'ड्राइविंग लाइसेंस', value: 'ड्राइविंग लाइसेंस' },
//         { label: 'पैन कार्ड', value: 'पैन कार्ड' },
//         { label: 'राशन कार्ड', value: 'राशन कार्ड' },
//         { label: 'सरकारी कर्मचारी पहचान पत्र', value: 'सरकारी कर्मचारी पहचान पत्र' },
//         { label: 'विदेशियों का पंजीकरण कार्ड (FRC)', value: 'विदेशियों का पंजीकरण कार्ड (FRC)' },
//         { label: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र', value: 'कोई अन्य सरकारी जारी किया गया पहचान पत्र' },
//     ];

//     const travelReasonData = [
//         { label: 'दर्शन', value: 'दर्शन' },
//         { label: 'अध्यन या सेमिनार', value: 'अध्यन या सेमिनार' },
//         { label: 'सत्संग', value: 'सत्संग' },
//         { label: 'पारिवारिक या मित्रो से मिलना', value: 'पारिवारिक या मित्रो से मिलना' },
//         { label: 'व्यापारिक या व्यावासयिक यात्रा', value: 'व्यापारिक या व्यावासयिक यात्रा' },
//         { label: 'अन्य', value: 'अन्य' },
//     ];

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

//         const additionalGuestsValue = guestData[0]?.AddionalGuest ?? guestData.length;
//         setAdditionalGuests(additionalGuestsValue);

//         setFormValues(initialValues);
//     };

//     const handleChange = (name, value) => {
//         setFormValues({ ...formValues, [name]: value });
//     };

//     const renderGuestFields = () => {
//         return guestData.map((guest, index) => {
//             const isLastUser = index === guestData.length - 1;
//             return (
//                 <View key={index} style={{ justifyContent: "center", alignItems: "center" }}>
//                     <Text style={styles.label}>First Name:</Text>
//                     <TextInput style={styles.input}
//                         value={formValues[`firstname_${index}`]}
//                         onChangeText={(text) => handleChange(`firstname_${index}`, text)}
//                     />
//                     <Text style={styles.label}>Last Name:</Text>
//                     <TextInput style={styles.input}
//                         value={formValues[`lastname_${index}`]}
//                         onChangeText={(text) => handleChange(`lastname_${index}`, text)}
//                     />

//                     {/* Gender Dropdown */}
//                     <Text style={styles.label}>Gender:</Text>
//                     <Dropdown
//                         style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
//                         placeholderStyle={styles.placeholderStyle}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         inputSearchStyle={styles.inputSearchStyle}
//                         itemTextStyle={styles.selectedTextStyle}
//                         data={genderData}
//                         labelField="label"
//                         valueField="value"
//                         value={formValues[`gender_${index}`]}
//                         placeholder="Select Gender"
//                         onChange={(item) => handleChange(`gender_${index}`, item.value)}
//                     />

//                     {/* Travel Reason and City fields only for the last user */}
//                     {isLastUser && (
//                         <>
//                             <Text style={styles.label}>Travel Reason:</Text>
//                             <Dropdown
//                                 style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
//                                 placeholderStyle={styles.placeholderStyle}
//                                 selectedTextStyle={styles.selectedTextStyle}
//                                 inputSearchStyle={styles.inputSearchStyle}
//                                 itemTextStyle={styles.selectedTextStyle}
//                                 data={travelReasonData}
//                                 labelField="label"
//                                 valueField="value"
//                                 value={formValues[`travelReason_${index}`]}
//                                 placeholder="Select Travel Reason"
//                                 onChange={(item) => handleChange(`travelReason_${index}`, item.value)}
//                             />

//                             <Text style={styles.label}>City:</Text>
//                             <TextInput style={styles.input}
//                                 value={formValues[`address_${index}`]}
//                                 onChangeText={(text) => handleChange(`address_${index}`, text)}
//                             />
//                         </>
//                     )}

//                     {/* Identification Type Dropdown */}
//                     <Text style={styles.label}>Identification Type:</Text>
//                     <Dropdown
//                         style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
//                         placeholderStyle={styles.placeholderStyle}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         inputSearchStyle={styles.inputSearchStyle}
//                         itemTextStyle={styles.selectedTextStyle}
//                         data={idTypeData}
//                         labelField="label"
//                         valueField="value"
//                         value={formValues[`identificationType_${index}`]}
//                         placeholder="Select ID Type"
//                         onChange={(item) => handleChange(`identificationType_${index}`, item.value)}
//                     />

//                     <Text style={styles.label}>Identification No:</Text>
//                     <TextInput style={styles.input}
//                         value={formValues[`identificationNo_${index}`]}
//                         onChangeText={(text) => handleChange(`identificationNo_${index}`, text)}
//                     />
//                     <Text style={styles.label}>Contact No:</Text>
//                     <TextInput style={styles.input}
//                         value={formValues[`contactNo_${index}`]}
//                         onChangeText={(text) => handleChange(`contactNo_${index}`, text)}
//                     />
//                 </View>
//             );
//         });
//     };

//     return (
//         <ScrollView>
//             <Button title="Initialize Form" onPress={initializeFormValues} />
//             {renderGuestFields()}
//             <Text style={styles.label}>Additional Guests:</Text>
//             <Dropdown
// style={[styles.input, { width: "85%", backgroundColor: '#fff', borderColor: '#E3E2E2', alignItems: "center", justifyContent: "center", marginTop: 15 }]}
// placeholderStyle={styles.placeholderStyle}
// selectedTextStyle={styles.selectedTextStyle}
// inputSearchStyle={styles.inputSearchStyle}
// itemTextStyle={styles.selectedTextStyle}
//                 data={Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
//                 labelField="label"
//                 valueField="value"
//                 placeholder="Select Additional Guests"
//                 value={additionalGuests || guestData.length}
//                 onChange={(item) => setAdditionalGuests(item.value)}
//             />
//         </ScrollView>
//     );
// };



// export default AddGuestInPendingReport;


// const styles = StyleSheet.create({
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
// });




///////////////////////////////////////////////////////////////////////////////////////













