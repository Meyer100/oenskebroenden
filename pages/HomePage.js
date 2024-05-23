import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fontsizes } from "../utils/theme";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import SharedWishItem from "../components/homepage/SharedWishItem";
import WishItem from "../components/homepage/WishItem";
import AddWishlist from "../components/homepage/AddWishlist";
import { addWishlistToHistory, createWishlist, getHistoryWishlist, getOneWishlist, getOwnWishlists } from "../services/WishService";
import SearchModal from "../components/homepage/SearchModal";

const HomePage = ({ user }) => {

  const [wishlist, setWishlist] = useState(null);
  const [historyWishlist, setHistoryWishlist] = useState(null);
    // State holder styr på om modal skal vises
  const [modalVisible, setModalVisible] = useState(false);

  const [searchModal, setSearchModal] = useState(false);

  const getWishlists = async () => {
    await getOwnWishlists(user.token).then(res => {
      if(res.status == 200) {
        console.log(res.data[0].wishes[0]);
        setWishlist(res.data);
      }
    })
  }

  const getUserHistoryWishlists = async () => {
    await getHistoryWishlist(user.token).then(res => {
      if(res.status == 200) {
        //console.log(res.data);
        setHistoryWishlist(res.data);
      }
    })
  }


  // Henter alle ens ønskelister samt ønsker
  useEffect(() => {
    getWishlists();
    getUserHistoryWishlists();
  },[]);

  const maadrilla = [
    { id: 1, name: "Techdddddd", author: "Jonas ItJab Albin", emoji: "📱" },
    { id: 2, name: "Tech", author: "Jonas ItJab Albin", emoji: "📱" },
    { id: 6, name: "Tech", author: "Jonas ItJab Albin", emoji: "📱" },
    { id: 3, name: "Tech", author: "Jonas ItJab Albin", emoji: "📱" },
    { id: 4, name: "Tech", author: "Jonas ItJab Albin", emoji: "📱" },
  ];

  // Kalder en POST request til api med opret en ny ønskeliste
  const createNewWishlist = async (wishlist) => {
    await createWishlist(wishlist, user.token)
      .then((res) => {
        console.log(user.token);
        if (res.status == 200) {
          console.log("Tilføjet ny ønskeliste!");
          setModalVisible(false);
        }
      })
  };

  // Metode henter en ønskeliste fra en anden bruger og gemmer i historik
  const getWishlist = async (id) => {
    await getOneWishlist(user.token, id).then(async res => {
      if(res.status == 200) {
        console.log(res.data);
        console.log(user.token);
        await addWishlistToHistory(user.token, id).then(res => {
          if(res.status == 200) {
            console.log("Tilføjet til history!");
            getUserHistoryWishlists();
          }
        })
      }
    })
  }


  const nav = useNavigation();
  const navigateToWishlistPage = (wishlist) => {
    if(wishlist) {
      nav.navigate('Wishlist', {wishlist: wishlist});
    }
  }

  const navigateToSharedWishlistPage = (wishlist) => {
    if(wishlist) {
      console.log(wishlist);
      nav.navigate('SharedWishlistPage', {wishlist: wishlist});
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ønskelister</Text>
      </View>

      <View style={styles.wishAndTitleContainer}>
        <View style={styles.sharedContainer}>
          <Text style={styles.sharedTitle}>Delt med mig</Text>
          <TouchableOpacity onPress={() => setSearchModal(true)}>
            <Image
              style={styles.sharedIcon}
              source={require("../assets/images/searchIcon.png")}
            />
          </TouchableOpacity>

        </View>
        <View style={styles.sharedWishContainer}>
          <FlatList
            data={historyWishlist}
            renderItem={({ item }) => {
              return <SharedWishItem data={item.wishList} clickEvent={() => navigateToSharedWishlistPage(item.wishList)} />;
            }}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sharedWishItemsContainer}
          />
        </View>
      </View>

      <View style={styles.ownWishContainer}>
        <View style={styles.wishTitleContainer}>
          <Text style={styles.sharedTitle}>Ønskelister</Text>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={styles.sharedIcon}
              source={require("../assets/images/addIcon.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.wishContainer}>
          <FlatList
            data={wishlist}
            renderItem={({ item }) => {
              return <WishItem data={item} clickEvent={() => navigateToWishlistPage(item)}/>;
            }}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <AddWishlist
          createWishlist={(wishlist) => createNewWishlist(wishlist)}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>

      <Modal visible={searchModal} animationType="fade" transparent={true}>
        <SearchModal closeModal={() => setSearchModal(false)} getwishList={(param) => getWishlist(param)}/>
      </Modal>
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,

    paddingHorizontal: 20,
    gap: 30,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontsizes.title,
  },
  wishAndTitleContainer: {
    gap: 10,
  },
  ownWishContainer: {
    flex: 1,
    marginBottom: 30,
    gap: 10,
  },
  sharedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  sharedTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sharedIcon: {
    height: 17,
    width: 17,
  },
  sharedWishContainer: {
    backgroundColor: "white",
    height: 190,
    justifyContent: "center",
    borderRadius: 10,
  },
  sharedWishItemsContainer: {
  },
  wishTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wishContainer: {
    flex: 1, 
    backgroundColor: "white",
    borderRadius: 10,
    padding: 0,
  },
  itemSeparator: {
    marginBottom: 5,
    borderWidth: 0.4,
    marginLeft: 65,
    opacity: 0.1,
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
});
