import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoarding from './screens/OnBoarding';
import ProfileScreen from './screens/ProfileScreen';
import  HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="OnBoarding" component={OnBoarding} />
       <Stack.Screen name="Profile" component={ProfileScreen} />
       <Stack.Screen name="Home" component={HomeScreen} />  

     </Stack.Navigator>
   </NavigationContainer>
 );
}
export default App;