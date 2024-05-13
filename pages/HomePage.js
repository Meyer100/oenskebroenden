import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { fontsizes } from '../utils/theme'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import SharedWishItem from '../components/homepage/SharedWishItem'
import WishItem from '../components/homepage/WishItem'
import AddWishlist from '../components/homepage/AddWishlist'


const HomePage = () => {
  const maadrilla = [
    {id: 1, title: 'Techdddddd', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 2, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 3, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 4, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
  ];

  const maadrillapt2 = [
    {id: 1, title: 'Techdddddd', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 2, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 3, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 4, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
  ];

  // State holder styr på om modal skal vises
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ønskelister</Text>  
      </View>
      
      <View style={styles.wishAndTitleContainer}>
        <View style={styles.sharedContainer}>
          <Text style={styles.sharedTitle}>Delt med mig</Text>
          <Image style={styles.sharedIcon} source={require('../assets/images/searchIcon.png')}/>
        </View>
        <View style={styles.sharedWishContainer}>
          <FlatList 
            data={maadrilla}
            renderItem={({item}) => {
              return <SharedWishItem data={item} />
            }}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sharedWishItemsContainer}
          />
        </View>
      </View>


      <View style={styles.wishAndTitleContainer}>
        <View style={styles.wishTitleContainer}>
          <Text style={styles.sharedTitle}>Ønskelister</Text>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image style={styles.sharedIcon} source={require('../assets/images/addIcon.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.wishContainer}>
            <FlatList 
              data={maadrillapt2}
              renderItem={({item}) => {
                return <WishItem data={item}/>
              }}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={ItemSeparator}
            />
        </View>
      </View>
      <Modal 
        visible={modalVisible}
        animationType='slide'
      >
        <AddWishlist />
      </Modal>
    </View>
  )
}

const ItemSeparator = () => {
  return <View style={styles.itemSeparator}/>
}


export default HomePage

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 20,
    gap: 30,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontsizes.title,
  },
  wishAndTitleContainer: {
    gap: 10,
  },
  sharedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  sharedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sharedIcon: {
    height: 17,
    width: 17,
  },
  sharedWishContainer: {
    backgroundColor: 'white',
    height: 190,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 10,
  },
  sharedWishItemsContainer: {
    gap: 20,
  },
  wishTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wishContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
  },
  itemSeparator: {
    marginBottom: 5,
    borderWidth: 0.4,
    marginLeft: 65,
    opacity: 0.1
  },
})