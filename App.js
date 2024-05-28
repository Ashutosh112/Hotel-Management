import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigator from './src/navigators/stacknavigator/StackNavigator'
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <>
      <StackNavigator />
      <Toast />
    </>
  )
}

export default App

const styles = StyleSheet.create({})