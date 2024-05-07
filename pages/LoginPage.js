import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { colors } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {

  const [rememberMe, setRememberme] = useState(false);

  const nav = useNavigation();

  const navigateToSignup = () => {
    nav.navigate('Signup');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View  style={styles.container}>
            <View style={styles.loginContainer}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
                <Text style={styles.title}>Velkommen</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Navn' />
                    <TextInput style={styles.input} placeholder='Adgangskode' />

                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.checkBoxContainer} onPress={() => setRememberme(!rememberMe)}>
                            <View style={styles.checkBox}>
                                {rememberMe ?
                                <Text style={styles.checkmark}>✔</Text>
                                : null}
                            </View>
                            <Text style={styles.greyText}>Husk Mig</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={navigateToSignup}>
                            <Text style={styles.greyText}>Opret ny konto</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.9,
    },
    loginContainer: {
       width: '80%',
       alignItems: 'center',
       gap: 50,
    },
    logo: {
        height: 120,
        width: 120,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        gap: 17,
    },
    input: {
        backgroundColor: 'white',
        alignItems: 'stretch',
        width: '100%',
        height: 50,
        padding: 10,
        borderRadius: 5,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
    },
    checkBox: {
        height: 15,
        width: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.textGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 8,
    },
    greyText: {
        color: colors.textGray,
    },
    loginBtn: {
        height: 60,
        width: '100%',
        backgroundColor: colors.buttonPrimary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
})