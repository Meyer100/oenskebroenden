import 'react-native-gesture-handler'; // to finalize installation of react-native-gesture-handler this needs to be imported
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WishlistPage from './pages/WishlistPage';
import ShowWishPage from './pages/ShowWishPage';
import ShowWishlistPage from './pages/SharedWishlistPage';
import { createWish, createWishlist, deleteWish, deleteWishlist, getOwnWishlists } from './services/WishService';
import SharedShowWishPage from './pages/SharedShowWishPage';
import ChatPage from './pages/ChatPage';

export default function App() {

  // Disse variabler fungere som globale, da de bliver sendt rundt til de forskellige sider
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  

  // UseEffect er et hook som kører efter første render og hver render derefter
  // For at forstå hvordan useEffect hook fungerer skal vi break den lidt ned
  // Første argument er den effect/kode vi vil køre. Derefter tager den imod et array af dependencies
  // Når array'et er tomt skal den kun køre efter intial render, ellers skal den køre hver gang en dependency bliver opdateret
  useEffect(() => {

    retriveUserData();
  }, [])

  // Her gør vi så brug af user dependencies array'et, vi ønsker at for hver gang user bliver opdateret, så skal det inde i useEffect køre
  // Nu er eksempelt her meget småt, men den ville kunne bruges på 2 måder. 1 hent brugens ønskelister når han logger ind.
  /// 2. Fjern ønskelisterne fra wishlist state, når brugeren logger ud.
  useEffect(() => {
    if(user) {
      getWishlists();
    }
  }, [user])

  // Henter brugerens data fra både AsyncStorage, og SecureStorage (læs på produktrapporten)
  const retriveUserData = async () => {
    try {
      const jwtToken = await SecureStore.getItemAsync('jwt');
      const lifespan = await SecureStore.getItemAsync('jwtlifespan');
      const name = await AsyncStorage.getItem('name');
      const id = await AsyncStorage.getItem('id');
      if(jwtToken || lifespan || name || id) {
          const jwtlifespan = new Date(lifespan);
          if(new Date() > jwtlifespan) {
            console.log('jeg er allerde for gammel :/');
              await handleUserLoginStateAsync();
              return;
          }
          setUser({name: name, token: jwtToken, id: Number(id)});
      }
    }
    catch {

    }

    return;
  }

  // Henter alle ønskelister
  const getWishlists = async () => {
    try {
      const res = await getOwnWishlists(user.token);
      if (res && res.status === 200) {
        setWishlist(res.data);
      } else {
        console.error('Failed to fetch wishlists:', res.status);
      }
    } catch (error) {
    }
  };
  
  const getUpdatedWishlist = async () => {
    try {
      const res = await getOwnWishlists(user.token);
      if (res && res.status === 200) {
        setWishlist(res.data);
        return res.data;
      }
    } catch (error) {
      console.error('Failed to fetch wishlists:', error);
    }
  }
  

  const removeWish = async (id) => {
    await deleteWish(user.token, id).then(res => {
      if(res.status == 200) {
        console.log(wishlist);
        removeWishFromWishlist(id);
        console.log('Fjernet!');
      }
    })
  }

  const removeWishlist = async (id) => {
    await deleteWishlist(user.token, id).then(res => {
      if(res.status == 200) {
        console.log('Fjernet ønskeliste');
        setWishlist(wishlist.filter(wishlist => wishlist.id !== id));
      }
    })
  }

  const removeWishFromWishlist = async (wishId) => {
    // Find the wishlist containing the wish with the given ID
    const wishlistContainingWish = wishlist.find((list) => list.wishes.some((wish) => wish.id === wishId));

    if (wishlistContainingWish) {
      // Find the index of the wish in the wishes array of the wishlist
      const wishIndex = wishlistContainingWish.wishes.findIndex((wish) => wish.id === wishId);

      if (wishIndex !== -1) {
        // Remove the wish from the wishlist
        const updatedWishlist = [...wishlist];
        updatedWishlist[wishlist.indexOf(wishlistContainingWish)].wishes.splice(wishIndex, 1);
        setWishlist(updatedWishlist);
      }
    }
  };

    // Kalder en POST request til api med opret en ny ønskeliste
    const createNewWishlist = async (wishlist) => {
      await createWishlist(wishlist, user.token)
        .then((res) => {
          if (res.status == 200) {
            getWishlists();
          }
        })
    };


    const addNewWish = async (data) => {
      try {
          const res = await createWish(data, user.token);
          if (res && res.status == 200) {
              const result = await getUpdatedWishlist();
              const temp = result.find(wishlist => wishlist.id === selectedWishlist.id);
              setSelectedWishlist(temp);
          }
      } catch (error) {
          console.error('Fejl i tilføjelse af ny ønskeliste');
      }
  }
  
    
  



  // Funktion kan både logge en bruger ind, samt fjerne hans login detaljer
  // baseret på data argumentet
  const handleUserLoginStateAsync = async (data, stayLoggedIn) => {


    if(data) {
      if(!stayLoggedIn) {
        setUser({name: data.name, token: data.token, id: Number(data.id)});
        return;
      }
        await SecureStore.setItemAsync('jwt', data.token);
        await SecureStore.setItemAsync('jwtlifespan', data.tokenExpires);
        await AsyncStorage.setItem('name', data.name);
        await AsyncStorage.setItem('id', data.id.toString()) 
        setUser({name: data.name, token: data.token, id: Number(data.id)});
    }
    else {
        await SecureStore.deleteItemAsync('jwt');
        await SecureStore.deleteItemAsync('jwtlifespan');
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('id');
        setUser(null);
    }
  }

  const Stack = createStackNavigator();
  // Login stack for when the user is not logged in
  if(!user) {
    return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
          <Stack.Screen name='Login'>
          {props => <LoginPage loginUser={(data, stayLoggedIn) => handleUserLoginStateAsync(data, stayLoggedIn)} />}
          </Stack.Screen>
          <Stack.Screen name='Signup' component={SignupPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
          <Stack.Screen name='Home'>
            {props => <HomePage user={user} wishlist={wishlist} removeWishlist={(id) => removeWishlist(id)} createNewWishlist={(wishlist) => createNewWishlist(wishlist)} wishlistSelected={(wishlist) => setSelectedWishlist(wishlist)} logout={handleUserLoginStateAsync} />}
          </Stack.Screen>
          <Stack.Screen name='Wishlist'>
            {props => <WishlistPage user={user} addNewWish={(wish) => addNewWish(wish)} wishlist={selectedWishlist}/>}
          </Stack.Screen>
          <Stack.Screen name='ShowWish'>
            {props => <ShowWishPage user={user} deleteWish={(id) => removeWish(id)}/>}
          </Stack.Screen>
          <Stack.Screen name='SharedWishlistPage'>
            {props => <ShowWishlistPage user={user}/>}
          </Stack.Screen>
          <Stack.Screen name='SharedShowWishPage'>
            {props => <SharedShowWishPage user={user}/>}
          </Stack.Screen>
          <Stack.Screen name='ChatPage'>
            {props => <ChatPage user={user}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}


