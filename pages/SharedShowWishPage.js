import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { colors, fontsizes } from '../utils/theme';
import * as WebBrowser from 'expo-web-browser';
import { reserveWish } from '../services/WishService';


const SharedShowWishPage = ({user}) => {

    const [isReservedByMe, setIsReservedByMe] = useState(null);

    const route = useRoute();
    const {wish} = route?.params;

    const nav = useNavigation();

    // Åbner link i default browser
    const openLink = async () => {
      await WebBrowser.openBrowserAsync(wish.link);
    }

    // Tjekker om man selv har reserveret et ønske, eller om et ønske er reserveret af en anden
    useEffect(() => {
      if(wish.reservedUserId != null) {
        if(wish.reservedUserId == user.id) {
          setIsReservedByMe(true);
        }
        else {
          setIsReservedByMe(false);
        }
      }
    }, [])

    // Reserverer et ønske
    const reserveOneWish = async () => {
      await reserveWish(wish.id, user.token).then(res => {
        if(res && res.status == 200) {
          setIsReservedByMe(true);
        }
      })
    }

  return (
      <View style={styles.container}>
          <TouchableOpacity onPress={() => nav.pop()}>
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
              <Text style={styles.wishTitle}>{wish.name}</Text>
              <Text style={styles.wishDescription}>{wish.description ? wish.description : "Ingen beskrivelse"}</Text>

              <View style={styles.priceContainer}>
                  <Text style={styles.price}>Kr. {wish.price}</Text>
                  <TouchableOpacity style={styles.linkBtn} onPress={openLink}>
                      <Text>Link</Text>
                      <Image style={styles.linkIcon} source={require('../assets/images/linkIcon.png')}/>
                  </TouchableOpacity>
              </View>
          </View>

          <View style={styles.optionContainer}>
              <TouchableOpacity style={[styles.reserveBtn, {backgroundColor: isReservedByMe == null ? colors.buttonPrimary : colors.textGray}]} onPress={reserveOneWish} disabled={isReservedByMe != null}>
                  <Text style={styles.reserveText}>{isReservedByMe != null ? isReservedByMe ? "Du har reserveret" : "Allerede reserveret" : "Reserver Produkt"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.pricerunnerBtn} onPress={null}>
                  <Image style={styles.pricerunnerIcon} source={require('../assets/images/pricerunnerIcon.png')} />
              </TouchableOpacity>
          </View>
      </View>
  )
}

export default SharedShowWishPage

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
        flexDirection: 'row',
        gap: 5,
      },
      linkIcon: {
        height: 10,
        width: 10,
      },
      optionContainer: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'flex-end',
      },
      reserveBtn: {
        flex: 0.6,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      reserveText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      pricerunnerBtn: {
        backgroundColor: '#101010',
        flex: 0.4,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      pricerunnerIcon: {
        height: 50,
        width: 50,
      },
      bottomSheetViewContainer: {
        backgroundColor: colors.wishItemBackground,
      },
})