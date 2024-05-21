import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Dimensions } from 'react-native';
import Logo from "../assets/images/UjjainPoliceLogo.png"

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#F5F5F8' barStyle="dark-content" hidden={false} />

      <View style={styles.body}>
        <Image source={Logo} style={{ height: 80, width: 80 }} />
        <Text style={styles.text}>Login</Text>
        <Text style={[styles.text2, { marginTop: 5 }]}>Welcome back!</Text>
        <Text style={styles.text2}>Please login to continue</Text>

        <View style={styles.inputContainer}>
          <TextInput maxLength={10} keyboardType='number-pad' placeholderTextColor='darkgrey' placeholder='Mobile No.' style={styles.input}></TextInput>
          <TextInput placeholderTextColor='darkgrey' placeholder='Enter OTP' style={[styles.input, { marginTop: 20 }]}></TextInput>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("BottomNavigator")}>
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={[styles.greyText, { marginTop: 5 }]}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} onPress={() => navigation.navigate("Signup")}>
        <Text style={[styles.greyText, { marginVertical: 20, color: "black", fontWeight: "400" }]}>Don't have an account?

          <Text style={[styles.greyText, { marginVertical: 20, fontWeight: "500" }]}> Signup here</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login

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
    marginTop: 10
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    borderRadius: 10,
    marginTop: 16,
    width: Dimensions.get('window').width - 60,
    height: 55,
    marginBottom: 10,
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


});