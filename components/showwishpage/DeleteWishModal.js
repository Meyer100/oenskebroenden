import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const DeleteWishModal = ({name, confirm}) => {
  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>Er du sikker på at du vil slette</Text>
            <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.deleteBtn} onPress={confirm}>
                <Text style={styles.deleteText}>Bekræft sletning af ønske</Text>
                <Image style={styles.deleteIcon} source={require('../../assets/images/deleteIcon.png')}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default DeleteWishModal

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        paddingHorizontal: 30,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    btnContainer: {
        marginBottom: 40,
    },
    deleteBtn: {
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    deleteText: {
        fontSize: 16,
    },
    deleteIcon: {
        height: 20,
        width: 20,
    },
})