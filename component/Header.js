import React from "react";
// import { useFonts } from 'expo-font';
import {View,Text,Image,TextInput,TouchableOpacity,StyleSheet} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
const  Header =({navigation})=>{
      

return(
<SafeAreaView style={styles.safeArea}>
 <View style={styles.container}>
    <View  style={styles.heada}>
        <Image  source={require('../assets/lemo2.png')} style={styles.Image}    resizeMode ='contain'/>
           <Text style={styles.txt}>Little Lemon</Text>  
    </View>

    <View style={styles.headb}>
    <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Image  source={require('../assets/Profile.png')} style={styles.Prof}    resizeMode ='contain'/>
    </TouchableOpacity>
    </View>
</View>
</SafeAreaView>
)}

const styles=StyleSheet.create({
    safeArea:{
            backgroundColor: "#c26d19ff", // same as header color
            flex:0,
    },
    container:{
        // flex:1,
        height:56,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"#c26d19ff",
       borderRadius:2,
       paddingHorizontal:12,
    },

    heada:
    {
     flex:2,
     flexDirection:"row",
     alignItems:'center',
     justifyContent:"flex-start",

    },

    headb:{
        flex:1,
         alignItems: "flex-end",  
    },

    Image:{
        height:55,
        width:60,
        borderRadius:15,
        
    },
    Prof:{
       height:60,
       width:60,
       borderRadius:100,
    },
    txt:{
        fontSize:22,
        letterSpacing:2,
        fontWeight:700,
        color:"white",
        // marginLeft,
    }

})

export default Header;