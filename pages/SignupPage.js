import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { colors, fontsizes } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { createAccount } from '../services/UserService';

const SignupPage = () => {
  const nav = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigateToLogin = () => {
    nav.pop();
  }

  // Funktion kalder imod api'en med POST request for at oprette en ny bruger
  // Der bliver også tjekket på at strengen overholder vores regler med længde osv.
  const createUser = async () => {
    if (!name || !email || !password) {
        setError("Udfyld venligst alle feldter");
        return;
    }
    if (!email.includes("@")) {
        setError("Indtast en gyldig email adresse");
        return;
    }

    await createAccount({Name: name, Email: email, Password: password}).then(res => {
        if(res.status == 200) {
            console.log('Konto Oprettet!');
        }
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View  style={styles.container}>
            <View style={styles.loginContainer}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
                <Text style={styles.title}>Opret Bruger</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Navn' onChangeText={(text) => setName(text)} />
                    <TextInput style={styles.input} placeholder='Email' onChangeText={(text) => setEmail(text)}/>
                    <TextInput style={styles.input} placeholder='Adgangskode' onChangeText={(text) => setPassword(text)}/>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity onPress={navigateToLogin}>
                            <Text style={styles.greyText}>Har du allerede en konto?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.signupBtn} onPress={createUser}>
                        <Text style={styles.signupText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default SignupPage

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
        fontSize: fontsizes.title,
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
    errorText: {
        color: 'red',
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
    greyText: {
        color: colors.textGray,
    },
    signupBtn: {
        height: 60,
        width: '100%',
        backgroundColor: colors.buttonPrimary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
})