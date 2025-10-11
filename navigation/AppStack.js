import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen  from "../screens/ProfileScreen";

const Stack =createNativeStackNavigator();

const AppStack = ({setHasOnboarded   })=>{
    return(
        <Stack.Navigator>
           <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props}  setHasOnboarded={setHasOnboarded}/>}

           </Stack.Screen>
           <Stack.Screen name="Profile" component={ProfileScreen}/>
          
        </Stack.Navigator>

    );
}
export default AppStack;