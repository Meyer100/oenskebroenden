import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/theme'
import { Image } from 'expo-image'

const WishItem = ({data, clickEvent}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={clickEvent}>
        <View style={styles.wishContainer}>
            <TouchableOpacity style={styles.iconContainer}>
                <Text>{data.emoji}</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.countText}>{data.wishes.length} items</Text>
            </View>
        </View>
        <View style={styles.optionsContainer}>
        <Image style={styles.optionsImg} source={require('../../assets/images/optionsIcon.png')} />
        <Image style={styles.optionsImg} source={require('../../assets/images/nextIcon.png')} />
        </View>
    </TouchableOpacity>
  )
}

export default WishItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    wishContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    iconContainer: {
        backgroundColor: colors.wishItemBackground,
        height: 40,
        width: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    countText: {
        color: colors.textGray,
    },
    optionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    optionsImg: {
        height: 20,
        width: 20,
    },
})