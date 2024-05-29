import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { colors } from '../../utils/theme'
import { themeCore } from "../../utils/themes.android";
const SharedWish = ({wish, navigateToWish, isReserved}) => {

      // Her forkorter jeg strengen hvis den har en længe på over 9
      const truncateTitleString = (str) => {
        if (str.length >= 13) {
          return str.substring(0, 10) + '...';
        } else {
          return str;
        }
      };
      
  return (
    <View style={styles.firstProductContainer}>
        <TouchableOpacity style={styles.productBackground} onPress={navigateToWish}>
            <Image style={styles.productPicture} source={{uri: wish.pictureURL}} contentFit='cover'/>
            {isReserved ? <Image style={styles.saveIcon} source={require('../../assets/images/saveBlueIcon.png')} /> : isReserved != null ? <Image style={styles.saveIcon} source={require('../../assets/images/saveIcon.png')} /> : null}
        </TouchableOpacity>
        <View style={styles.wishOptions}>
            <Text style={styles.wishName}>{truncateTitleString(wish.name)}</Text>
        </View>
        <Text style={styles.wishPrice}>Kr. {wish.price}</Text>
        {isReserved ? <Text style={styles.reserveText}>Reservet af dig</Text> : isReserved != null ? <Text style={styles.reserveText}>Reservet af en anden</Text> : null}

    </View>
  )
}

export default SharedWish

const styles = StyleSheet.create({
    firstProductContainer: {},
    productBackground: {
        backgroundColor: colors.wishItemBackground,
        height: 130,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 5,
    },
    productPicture: {
        height: 100,
        width: 100,
    },
    wishOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wishName: {
        fontSize: 16,
    },
    moreOptionImg: {
        height: 20,
        width: 20,
        opacity: 0.4,
    },
    wishPrice: {
        fontWeight: 'bold',
    },
    saveIcon: {
        position: 'absolute',
        top: 0,
        left: 5,
        height: 20,
        width: 20,
    },
    reserveText: {
        fontSize: 12,
        color: colors.textGray,
    },
})