import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen  from "../screens/ProfileScreen";

const Stack =createNativeStackNavigator();

const AppStack = ({setHasOnboarded   })=>{
    return(
        <Stack.Navigator>
           <Stack.Screen name="Profile">
            {(props) => <ProfileScreen {...props}  setHasOnboarded={setHasOnboarded}/>}

           </Stack.Screen>
           <Stack.Screen name="Home" component={HomeScreen}/>
          
        </Stack.Navigator>

    );
}
export default AppStack;