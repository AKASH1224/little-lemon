import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen  from "../screens/ProfileScreen";
import Header from "../component/Header";
import { Ionicons } from '@expo/vector-icons'; 


const Tab =createBottomTabNavigator();

const AppStack = ({setHasOnboarded   })=>{
    return(
        <Tab.Navigator screenOptions={({route}) =>({
            tabBarIcon: ({focused,color,size}) => {
                let iconName ;
                let IconCompo;
                if (route.name ==="Home"){
                     iconName= focused ? "home" :"home-outline";
                    // iconName = 'home';
                    // IconCompo = FontAwesome ;
                }else if (route.name === "Profile"){
                    iconName = focused ? 'person' : 'person-outline';
                 //   IconCompo =Ionicons;
                }

                return <Ionicons  name={iconName} size={size} color={color} />;

            },
                tabBarActiveTintColor: '#F27329',
    tabBarInactiveTintColor: 'gray',
    
            
        })
        }>
      <Tab.Screen name="Home" options={{
        header: (props) => <Header {...props} />, // custom header for this screen
       }}>
           
        {(props) => <HomeScreen {...props}  setHasOnboarded={setHasOnboarded}/>}
     </Tab.Screen>
    <Tab.Screen name="Profile" options={{header : (props)=> <Header {...props}/>}} >
        {(props) => <ProfileScreen {...props} setHasOnboarded={setHasOnboarded} />}
    </Tab.Screen>
          
        </Tab.Navigator>

    );
}
export default AppStack;