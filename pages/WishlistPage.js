import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors, fontsizes } from '../utils/theme'
import AddWish from '../components/wishlistpage/AddWish'
import { createWish } from '../services/WishService'
import { Image } from 'expo-image'
import Wish from '../components/wishlistpage/Wish'
import { themeCore } from "../utils/themes.android";


const WishlistPage = ({user}) => {
  
  const route = useRoute();
  const {wishlist} = route?.params;

  // State holder styr på om modal skal vises
  const [modalAddWishVisible, setModalAddWishVisible] = useState(false);
  
  
  const addWish = async (data) => {
    data.wishListId = wishlist.id;
    await createWish(data, user.token).then(res => {
        if(res.status == 200) {
            console.log('Ønske tilføjet!');
        }
    })
  }

  const nav = useNavigation();
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
      {/*<View style={styles.topContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalAddWishVisible(true)}>
            <Text style={styles.addText}>+</Text>
        </TouchableOpacity>

        <Wish wish={wishlist.wishes[0]}/>
        </View>*/}

        <TouchableOpacity style={styles.addBtn} onPress={() => setModalAddWishVisible(true)}>
            <Text style={styles.addText}>+</Text>
        </TouchableOpacity>

        <FlatList 
          data={wishlist.wishes}
          renderItem={({item}) => {
            return <Wish wish={item}/>
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          columnWrapperStyle={{justifyContent: 'space-between'}}   // causes items to be equally spaced
          
        />
      
      
      <Modal visible={modalAddWishVisible} animationType='slide'>
        <AddWish addWish={(param) => addWish(param)}  closeModal={() => setModalAddWishVisible(false)}/>
      </Modal>


      
    </View>
  )
}

const ItemSeparator = () => {
    return <View style={{height: 20}} />;
  };

export default WishlistPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: themeCore.paddingTop,
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
      addBtn: {
        backgroundColor: colors.buttonPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 5,
        marginBottom: 20,
      },
      addText: {
        fontSize: 20,
        color: 'white',
      },
})