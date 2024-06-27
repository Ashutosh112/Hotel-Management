import { StyleSheet, Text, View, Image, Modal, StatusBar } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

const Spinner = (props) => {
    return (

        <Modal transparent={true}
            animationType={'fade'}
            visible={props.isLoading}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060' }}>
                <Lottie source={require('../assets/images/animationLottie.json')} autoPlay loop style={{ height: 70, width: 70 }} />
            </View>
        </Modal>
    )
}

export default Spinner

const styles = StyleSheet.create({})
