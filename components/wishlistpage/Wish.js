import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { colors } from '../../utils/theme'
const Wish = ({wish}) => {

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
        <View style={styles.productBackground}>
            <Image style={styles.productPicture} source={{uri: wish.pictureURL}} contentFit='cover'/>
        </View>
        <View style={styles.wishOptions}>
            <Text style={styles.wishName}>{truncateTitleString(wish.name)}</Text>
            <TouchableOpacity>
                <Image style={styles.moreOptionImg} source={require('../../assets/images/optionsIcon.png')}/>
            </TouchableOpacity>
        </View>
        <Text style={styles.wishPrice}>Kr. {wish.price}</Text>
    </View>
  )
}

export default Wish

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
})