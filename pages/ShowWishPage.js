import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { colors, fontsizes } from '../utils/theme';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import DeleteWishModal from '../components/showwishpage/DeleteWishModal';
import * as WebBrowser from 'expo-web-browser';

const ShowWishPage = ({user, deleteWish}) => {
    const route = useRoute();
    const {wish} = route?.params;


    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['40%',], []);


    const nav = useNavigation();

    // Åbner bottomsheet modal
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    // funktion fjernet et ønske og popper siden
    const removeWish = () => {
      deleteWish(wish.id);
      nav.pop();
    }

    // Åbner link
    const openLink = async () => {
      await WebBrowser.openBrowserAsync(wish.link);
    }


  return (
    <BottomSheetModalProvider>
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
              <TouchableOpacity style={styles.pricerunnerBtn}>
                  <Image style={styles.pricerunnerIcon} source={require('../assets/images/pricerunnerIcon.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteBtn} onPress={handlePresentModalPress}>
                  <Image style={styles.deleteIcon} source={require('../assets/images/deleteIcon.png')} />
              </TouchableOpacity>
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            index={0}
            enablePanDownToClose={true}
            backgroundStyle={styles.bottomSheetViewContainer}
          >
          <BottomSheetView>
            <DeleteWishModal name={wish.name} confirm={removeWish}/>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
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
        fontSize: fontsizes.title - 5,
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
      bottomSheetViewContainer: {
        backgroundColor: colors.wishItemBackground,
      },
})