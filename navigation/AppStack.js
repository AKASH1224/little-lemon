import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen  from "../screens/ProfileScreen";
import Header from "../component/Header";

const Stack =createNativeStackNavigator();

const AppStack = ({setHasOnboarded   })=>{
    return(
        <Stack.Navigator>
      <Stack.Screen name="Home" options={{
        header: (props) => <Header {...props} />, // custom header for this screen
       }}>
           
        {(props) => <HomeScreen {...props}  setHasOnboarded={setHasOnboarded}/>}
     </Stack.Screen>
    <Stack.Screen name="Profile" options={{header : (props)=> <Header {...props}/>}} >
        {(props) => <ProfileScreen {...props} setHasOnboarded={setHasOnboarded} />}
    </Stack.Screen>
          
        </Stack.Navigator>

    );
}
export default AppStack;