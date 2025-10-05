import { Text, View ,StyleSheet} from "react-native";

export default function App(){
    return(
        <View style={styles.container}>
            <Text style={styles.Text}>Hello This is meta react native project</Text>
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#0b0b0bff",
    },Text:{

        fontSize:16,
  
        color:"white"
    }
})