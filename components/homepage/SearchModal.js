import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../utils/theme'

const SearchModal = ({closeModal, getwishList}) => {

  const [id, setId] = useState(0);

  // Henter og gemmer en delt ønskeliste
  const getandAddToHistory = () => {
    if(id > 0) {
        getwishList(id);
        closeModal();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Søg på ønskeliste</Text>
                </View>
                <TextInput style={styles.input} placeholder='0' placeholderTextColor={colors.textGray} onChangeText={(text) => setId(text)}/>
            <TouchableOpacity style={styles.searchBtn} onPress={getandAddToHistory}>
                <Text style={styles.searchText}>Søg</Text>
            </TouchableOpacity>
            </View>
        </View>
    </TouchableWithoutFeedback> 
  )
}

export default SearchModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    searchContainer: {
        backgroundColor: 'white',
        height: 200,
        borderRadius: 5,
        paddingHorizontal: 60,
        gap: 30,

    },
    titleContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
    },
    input: {
        backgroundColor: colors.wishItemBackground,
        height: 40,
        padding: 10,
    },
    searchBtn: {
        backgroundColor: colors.buttonPrimary,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
})