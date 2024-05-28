import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors, fontsizes } from '../utils/theme'
import AddWish from '../components/wishlistpage/AddWish'
import { createWish } from '../services/WishService'
import { Image } from 'expo-image'
import Wish from '../components/wishlistpage/Wish'

const SharedWishlistPage = ({user}) => {
  
  const route = useRoute();
  const {wishlist} = route?.params;

  useEffect(() => {
    console.log(wishlist);
  },[])
  
  const nav = useNavigation();

  const navigateToShowWishPage = (wish) => {
    if(wish) {
      nav.navigate('SharedShowWishPage', {wish: wish});
    }
  }

  const navigateToChatPage = () => {
    nav.navigate('ChatPage', {wishlistId: wishlist.id})
  }

  const navigateBack = () => {
    nav.pop();
  }

  if(wishlist) {
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={navigateBack}>
            <Image
              style={styles.backIcon}
              source={require("../assets/images/backIcon.png")}
            />
          </TouchableOpacity>
  
  
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{wishlist.name}</Text>
          </View>
  
          <FlatList 
            data={wishlist.wishes}
            renderItem={({item}) => {
              return <Wish wish={item} navigateToWish={() => navigateToShowWishPage(item)}/>
            }}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            columnWrapperStyle={{justifyContent: 'space-between'}} 
            
          />
          {/* Åben beskeder på ønskelisten */}
          <TouchableOpacity style={styles.messageBtn} onPress={navigateToChatPage}>
            <Image style={styles.messageIcon} source={require('../assets/images/messageIcon.png')} />
          </TouchableOpacity>
      </View>
    )
  }
  else {
    return (
      <Text>Hello</Text>
    )
  }

}

const ItemSeparator = () => {
    return <View style={{height: 20}} />;
  };

export default SharedWishlistPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 40,
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
      messageBtn: {
        position: 'absolute',
        bottom: '5%',
        right: '10%',
        backgroundColor: colors.wishItemBackground,
        borderRadius: '100%',
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
      },
      messageIcon: {
        height: 30,
        width: 30,
      },
})