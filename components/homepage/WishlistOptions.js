import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const WishlistOptions = ({name, deleteWish}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      
      <View style={styles.btnContainer}>
        {/* Tilføjet [] til styles så jeg kan behandle det som et array, hvilket betyder jeg kan sætte opacity direkte*/}
        <TouchableOpacity style={[styles.optionBtn, {opacity: 0.4}]} disabled>
            <Text style={styles.optionText}>Rediger ønskeliste</Text>
            <Image style={styles.deleteIcon} source={require('../../assets/images/editIcon.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn} onPress={deleteWish}>
            <Text style={styles.optionText}>Slet ønskeliste</Text>
            <Image style={styles.deleteIcon} source={require('../../assets/images/deleteIcon.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default WishlistOptions

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 40,
        gap: 40,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
    },
    btnContainer: {
        gap: 40,
    },
    optionBtn: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    optionText: {
        fontSize: 18,
    },
    deleteIcon: {
        height: 25,
        width: 25,
    },
})