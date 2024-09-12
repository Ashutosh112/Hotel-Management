import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from '../../screens/Login';
import BottomNavigator from '../bottomnavigator/BottomNavigator';
import SplashScreen from '../../screens/SplashScreen';
import Signup from '../../screens/Signup';
import CreateReport from '../../screens/CreateReport';
import AddGuestInReport from '../../screens/AddGuestInReport';
import SearchGuest from '../../screens/SearchGuest';
import SubmittedReport from '../../screens/SubmittedReport';
import NoCheckIn from '../../screens/NoCheckIn';
import PendingReport from '../../screens/PendingReport';
import PendingReportDetails from '../../screens/PendingReportDetails';
import SearchGuestDetails from '../../screens/SearchGuestDetails';
import SubmittedReportDetails from '../../screens/SubmittedReportDetails';
import ReportSubmitScreen from '../../screens/ReportSubmitScreen';
import AddGuestInPendingReport from '../../screens/AddGuestInPendingReport';
import Profile from '../../screens/Profile';
import ContactWithUs from '../../screens/ContactWithUs';
import PrivacyPolicy from '../../screens/PrivacyPolicy';
import PrivacyPolicyDetail from '../../screens/PrivacyPolicyDetail';
import SubscriptionPlan from '../../screens/SubscriptionPlan';
import SignupFirst from '../../screens/SignupFirst';
import AddRoomCategory from '../../screens/AddRoomCategory';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const [showSplashScreen, setShowSplashScreen] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowSplashScreen(false);
        }, 3000);
    }, []);

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    {showSplashScreen ? (<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />) : null}
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="SignupFirst" component={SignupFirst} options={{ headerShown: false }} />
                    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                    <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="CreateReport" component={CreateReport} options={{ headerShown: false, headerTitle: "Create Report" }} />
                    <Stack.Screen name="AddGuestInReport" component={AddGuestInReport} options={{ headerShown: false, headerTitle: "Add Guest" }} />
                    <Stack.Screen name="SearchGuest" component={SearchGuest} options={{ headerShown: false, headerTitle: "Search Guest" }} />
                    <Stack.Screen name="SearchGuestDetails" component={SearchGuestDetails} options={{ headerShown: false, headerTitle: "Guest Details" }} />
                    <Stack.Screen name="SubmittedReport" component={SubmittedReport} options={{ headerShown: false, headerTitle: "Submitted Report" }} />
                    <Stack.Screen name="SubmittedReportDetails" component={SubmittedReportDetails} options={{ headerShown: false, headerTitle: "Submitted Report" }} />
                    <Stack.Screen name="PendingReport" component={PendingReport} options={{ headerShown: false, headerTitle: "Pending Reports" }} />
                    <Stack.Screen name="NoCheckIn" component={NoCheckIn} options={{ headerShown: false, headerTitle: "No Check In" }} />
                    <Stack.Screen name="PendingReportDetails" component={PendingReportDetails} options={{ headerShown: false, headerTitle: "Report Details" }} />
                    <Stack.Screen name="ReportSubmitScreen" component={ReportSubmitScreen} options={{ headerShown: false, headerTitle: "Report Submit" }} />
                    <Stack.Screen name="AddGuestInPendingReport" component={AddGuestInPendingReport} options={{ headerShown: false, headerTitle: "AddGuest In Pending Report" }} />
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, headerTitle: "Profile" }} />
                    <Stack.Screen name="ContactWithUS" component={ContactWithUs} options={{ headerShown: false, headerTitle: "Contact With Us" }} />
                    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false, headerTitle: "Privacy Policy" }} />
                    <Stack.Screen name="PrivacyPolicyDetail" component={PrivacyPolicyDetail} options={{ headerShown: false, headerTitle: "Privacy Policy Detail" }} />
                    <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} options={{ headerShown: false, headerTitle: "Subscription Plan" }} />
                    <Stack.Screen name="AddRoomCategory" component={AddRoomCategory} options={{ headerShown: false, headerTitle: "Add Room Category" }} />


                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})