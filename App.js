import 'react-native-gesture-handler'; // to finalize installation of react-native-gesture-handler this needs to be imported
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [user, setUser] = useState(null);

  // UseEffect er et hook som kører efter første render og hver render derefter
  // For at forstå hvordan useEffect hook fungerer skal vi break den lidt ned
  // Første argument er den effect/kode vi vil køre. Derefter tager den imod en array af dependencies
  // Når array'et er tomt skal den kun køre efter intial render, ellers skal den køre hver gang en dependency bliver opdateret
  useEffect(() => {
    console.log('JEG KØRER!');
    const retriveUserData = async () => {
        const jwtToken = await SecureStore.getItemAsync('jwt');
        const lifespan = await SecureStore.getItemAsync('jwtlifespan');
        const name = await AsyncStorage.getItem('name');
        if(jwtToken || lifespan || name) {
            const jwtlifespan = new Date(lifespan);
            if(new Date() > jwtlifespan) {
              console.log('jeg er allerde for gammel :/');
                await handleUserLoginStateAsync();
                return;
            }
            setUser({name: name, token: jwtToken});
        }
        console.log('kørt!');
        return;
    }

    retriveUserData();
  }, [])

  // Funktion kan både logge en bruger ind, samt fjerne hans login detaljer
  // baseret på data argumentet
  const handleUserLoginStateAsync = async (data) => {
    if(data) {
        await SecureStore.setItemAsync('jwt', data.token);
        await SecureStore.setItemAsync('jwtlifespan', data.tokenExpires);
        await AsyncStorage.setItem('name', data.name); 
        setUser({name: data.name, token: data.token});
        console.log('Logget ind');
    }
    else {
        await SecureStore.deleteItemAsync('jwt');
        await SecureStore.deleteItemAsync('jwtlifespan');
        await AsyncStorage.removeItem('name');
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
          <Stack.Screen name='Home' component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}


