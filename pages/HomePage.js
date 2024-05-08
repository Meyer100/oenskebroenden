import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fontsizes } from '../utils/theme'
import SharedWishItem from '../components/homepage/SharedWishItem'
import WishItem from '../components/homepage/WishItem'
import { Image } from 'expo-image'



const HomePage = () => {
  const maadrilla = [
    {id: 1, title: 'Techdddddd', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 2, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 3, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 4, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
  ]

  const maadrillapt2 = [
    {id: 1, title: 'Techdddddd', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 2, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 3, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
    {id: 4, title: 'Tech', author: 'Jonas ItJab Albin', emoji: '📱'},
  ]
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ønskelister</Text>  
      </View>
      
      <View>
        <View style={styles.sharedContainer}>
          <Text style={styles.sharedTitle}>Delt med mig</Text>
          <Image style={styles.searchIcon} source={require('../assets/images/searchIcon.png')}/>
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


      <View>
        <View style={styles.wishTitleContainer}>
          <Text style={styles.wishTitle}>Ønskelister</Text>
          <Image style={styles.searchIcon} source={require('../assets/images/addIcon.png')}/>
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
  sharedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  sharedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchIcon: {
    height: 20,
    width: 20,
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
  wishTitleContainer: {},
  wishTitle: {},
  searchIcon: {},
  wishContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  itemSeparator: {
    marginTop: 20,
    marginBottom: 5,
    borderWidth: 0.4,
    borderColor: 'gray',
    marginLeft: 20,
  },
})