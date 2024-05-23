import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors, fontsizes } from '../utils/theme'
import AddWish from '../components/wishlistpage/AddWish'
import { createWish } from '../services/WishService'
import { Image } from 'expo-image'
import Wish from '../components/wishlistpage/Wish'

const SharedWishlistPage = ({user}) => {
  
  const route = useRoute();
  const {wishlist} = route?.params;

  
  const nav = useNavigation();

  /*const navigateToShowWishPage = (wish) => {
    if(wish) {
      nav.navigate('ShowWish', {wish: wish});
    }
  }*/

  const navigateBack = () => {
    nav.pop();
  }

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
            return <Wish wish={item} navigateToWish={null}/>
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          columnWrapperStyle={{justifyContent: 'space-between'}}   // causes items to be equally spaced
          
        />
    </View>
  )
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
})