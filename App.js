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
import { deleteWish, getOwnWishlists } from './services/WishService';

export default function App() {

  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  

  // UseEffect er et hook som kører efter første render og hver render derefter
  // For at forstå hvordan useEffect hook fungerer skal vi break den lidt ned
  // Første argument er den effect/kode vi vil køre. Derefter tager den imod en array af dependencies
  // Når array'et er tomt skal den kun køre efter intial render, ellers skal den køre hver gang en dependency bliver opdateret
  useEffect(() => {

    retriveUserData();
  }, [])

  useEffect(() => {
    if(user) {
      getWishlists();
    }
  }, [user])

  const retriveUserData = async () => {
    const jwtToken = await SecureStore.getItemAsync('jwt');
    const lifespan = await SecureStore.getItemAsync('jwtlifespan');
    const name = await AsyncStorage.getItem('name');
    const id = await AsyncStorage.getItem('id');
    console.log(lifespan);
    console.log(new Date());
    if(jwtToken || lifespan || name || id) {
        const jwtlifespan = new Date(lifespan);
        if(new Date() > jwtlifespan) {
          console.log('jeg er allerde for gammel :/');
            await handleUserLoginStateAsync();
            return;
        }
        setUser({name: name, token: jwtToken, id: Number(id)});
        //await handleUserLoginStateAsync();
    }
    console.log('kørt!');
    return;
  }

  const getWishlists = async () => {
  await getOwnWishlists(user.token).then(res => {
    if(res.status == 200) {
      console.log(res.data[0].wishes[0]);
      setWishlist(res.data);
    }
  })
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
  



  // Funktion kan både logge en bruger ind, samt fjerne hans login detaljer
  // baseret på data argumentet
  const handleUserLoginStateAsync = async (data) => {
    if(data) {
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
        await AsyncStorage.removeItem('id') 
    }
  }

  const Stack = createStackNavigator();
  // Login stack for when the user is not logged in
  if(!user) {
    return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
          <Stack.Screen name='Login'>
          {props => <LoginPage loginUser={(data) => handleUserLoginStateAsync(data)} />}
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
            {props => <HomePage user={user} wishlist={wishlist}/>}
          </Stack.Screen>
          <Stack.Screen name='Wishlist'>
            {props => <WishlistPage user={user}/>}
          </Stack.Screen>
          <Stack.Screen name='ShowWish'>
            {props => <ShowWishPage user={user} deleteWish={(id) => removeWish(id)}/>}
          </Stack.Screen>
          <Stack.Screen name='SharedWishlistPage'>
            {props => <ShowWishlistPage user={user}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}


