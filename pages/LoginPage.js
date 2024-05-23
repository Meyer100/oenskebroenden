import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { colors, fontsizes } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { userLogin } from '../services/UserService';
import { themeCore } from "../utils/themes.android";


const LoginPage = ({loginUser}) => {

  const [name, setName] = useState("test");
  const [password, setPassword] = useState("admin");
  const [rememberMe, setRememberme] = useState(false);


  const signInUserAsync = async () => {
    await userLogin({
        userName: name,
        password: password
    }).then(res => {
        if(res.status == 200) {
            //console.log(res.data);
            console.log('Virker');
            loginUser(res.data);
        }
    })
  }

  const nav = useNavigation();

  const navigateToSignup = () => {
    nav.navigate('Signup');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View  style={styles.container}>
            <View style={styles.loginContainer}>
                <Image style={styles.logo} contentFit='contain' source={require('../assets/images/logo.svg')}/>
                <Text style={styles.title}>Velkommen</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Navn' onChangeText={(text) => setName(text)} value='test' />
                    <TextInput style={styles.input} placeholder='Adgangskode' onChangeText={(text) => setPassword(text)} value='admin' secureTextEntry/>

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

                    <TouchableOpacity style={styles.loginBtn} onPress={signInUserAsync}>
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
        width:150,
        
        
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