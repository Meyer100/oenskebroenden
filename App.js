import 'react-native-gesture-handler'; // to finalize installation of react-native-gesture-handler this needs to be imported
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import { useState } from 'react';

export default function App() {

  const [user, setUser] = useState(null);

  const Stack = createStackNavigator();


  // Login stack for when the user is not logged in
  if(!user) {
    return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
          <Stack.Screen name='Login' component={LoginPage}/>
          <Stack.Screen name='Signup' component={SignupPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
          <Stack.Screen name='Home' component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}


