import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { colors, fontsizes } from '../utils/theme';
import { deleteWish } from '../services/WishService';
import { useNavigation, useRoute } from '@react-navigation/native'

const ShowWishPage = ({user}) => {
    const route = useRoute();
    const nav = useNavigation();
    const {wish,removeWish} = route?.params;
    const deleteWishBtn = async () => {
  
      await deleteWish(user.token,wish.id).then(res => {
        if(res.status == 200){
          console.log("Wish Deleted");
        }
      })
      nav.pop();
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={null}>
          <Image
            style={styles.backIcon}
            source={require("../assets/images/backIcon.png")}
          />
        </TouchableOpacity>


        <View style={styles.titleContainer}>
          <Text style={styles.title}>{wish.name}</Text>
        </View>

        <View style={styles.wishContainer}>
            <View style={styles.imgContainer}>
                <Image style={styles.wishImg} source={{uri: wish.pictureURL}} contentFit='resize'/>
            </View>
            <Text style={styles.wishTitle}>Iphone 14 256GB</Text>
            <Text style={styles.wishDescription}>In publishing and graphic design, Lorem 
                ipsum is a placeholder text commonly used 
                to demonstrate the visual form of a document 
                or a typeface without relying on meaningful 
                content.
            </Text>

            <View style={styles.priceContainer}>
                <Text style={styles.price}>Kr. 6700</Text>
                <TouchableOpacity style={styles.linkBtn}>
                    <Text>Link</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.pricerunnerBtn}>
                <Image style={styles.pricerunnerIcon} source={require('../assets/images/pricerunnerIcon.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={deleteWishBtn} style={styles.deleteBtn}>
                <Image style={styles.deleteIcon} source={require('../assets/images/deleteIcon.png')} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ShowWishPage

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        paddingHorizontal: 40,
        flex: 1,
    },
    backIcon: {
        height: 20,
        width: 20,
      },
      titleContainer: {
        alignItems: "center",
        paddingBottom: 20,
      },
      title: {
        fontSize: fontsizes.title,
      },
      wishContainer: {
        flex: 0.9,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
        gap: 5,
        marginBottom: 20,
      },
      imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
      },
      wishImg: {
        height: 200,
        width: 250,
      },
      wishTitle: {
        fontSize: 22,
      },
      wishDescription: {
        color: colors.textGray,
      },
      priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flex: 1,
      },
      price: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      linkBtn: {
        backgroundColor: colors.wishItemBackground,
        height: 40,
        width: 80,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      optionContainer: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'flex-end',
      },
      pricerunnerBtn: {
        backgroundColor: '#101010',
        flex: 0.6,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

      },
      pricerunnerIcon: {
        height: 50,
        width: 50,
      },
      deleteBtn: {
        backgroundColor: colors.wishItemBackground,
        flex: 0.4,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      deleteIcon: {
        height: 30,
        width: 30,
      },
})