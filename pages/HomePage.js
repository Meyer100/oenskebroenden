import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { colors, fontsizes } from "../utils/theme";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import SharedWishItem from "../components/homepage/SharedWishItem";
import WishItem from "../components/homepage/WishItem";
import AddWishlist from "../components/homepage/AddWishlist";
import { themeCore } from "../utils/themes.android";
import { addWishlistToHistory, getHistoryWishlist, getOneWishlist, getOwnWishlists } from "../services/WishService";
import SearchModal from "../components/homepage/SearchModal";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import WishlistOptions from "../components/homepage/WishlistOptions";

const HomePage = ({ user, wishlist, removeWishlist, createNewWishlist, wishlistSelected, logout, historyWishlist, historyWishlistSelected }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [searchModal, setSearchModal] = useState(false);

  const [selectedWishlist, setSelectedWishlist] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['40%'], []);

  // Åbner for en modal
  const handlePresentModalPress = (wishlist) => {
    setSelectedWishlist(wishlist);
    bottomSheetModalRef.current?.present();
  };


  



  // Kalder createNewWishlist arg med en ønskeliste, og fjerner modal
  const createWishlist = async (wishlist) => {
    createNewWishlist(wishlist);
    setModalVisible(false);
  };

  // funktion henter en ønskeliste fra en anden bruger og gemmer i historik
  const getWishlist = async (id) => {
    await getOneWishlist(user.token, id).then(async res => {
      if(res && res.status == 200) {
        console.log(res.data);
        console.log(user.token);
        await addWishlistToHistory(user.token, id).then(res => {
          if(res && res.status == 200) {
            console.log("Tilføjet til history!");
            getUserHistoryWishlists();
          }
        })
      }
    })
  }

  // funktion fjerner en ønskeliste
  const deleteOneWishlist = () => {
    if(selectedWishlist) {
      bottomSheetModalRef.current?.dismiss();
      removeWishlist(selectedWishlist.id);
    }
  }

  const logoutUser = () => {
    logout();
  }

  const nav = useNavigation();
  // funktion navigerer til wishpage
  const navigateToWishlistPage = (wishlist) => {
    if(wishlist) {
      wishlistSelected(wishlist);
      nav.navigate('Wishlist', {wishlist: wishlist});
    }
  }

  // funktion navigere til sharedWishListPage
  const navigateToSharedWishlistPage = (wishlist) => {
    if(wishlist) {
      historyWishlistSelected(wishlist);
      nav.navigate('SharedWishlistPage');
    }
  }


  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>

        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={logoutUser}>
            <Image style={styles.logoutIcon} source={require('../assets/images/logoutIcon.png')} />
          </TouchableOpacity>
        </View>
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
                return <WishItem data={item} clickEvent={() => navigateToWishlistPage(item)} optionsClickEvent={() => handlePresentModalPress(item)}/>;
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
            createWishlist={(wishlist) => createWishlist(wishlist)}
            closeModal={() => setModalVisible(false)}
          />
        </Modal>

        <Modal visible={searchModal} animationType="fade" transparent={true}>
          <SearchModal closeModal={() => setSearchModal(false)} getwishList={(param) => getWishlist(param)}/>
        </Modal>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={0}
          enablePanDownToClose={true}
          backgroundStyle={styles.bottomSheetModalContainer}
        >
          <BottomSheetView>
            {selectedWishlist ?               
            <WishlistOptions name={selectedWishlist.name} deleteWish={deleteOneWishlist}/>
            : null}
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: themeCore.paddingTop,

    paddingHorizontal: 20,
    gap: 30,
  },
  logoutContainer: {
    alignItems: 'flex-end',
  },
  logoutIcon: {
    height: 20,
    width: 20,
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
  bottomSheetModalContainer: {
    backgroundColor: colors.wishItemBackground,
  },
});
