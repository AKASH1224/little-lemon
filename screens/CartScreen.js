import React,{useEffect,useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Sqlite from 'expo-sqlite';

//Open Database  
const openDb = async()=>{
    const db = await Sqlite.openDatabaseAsync('littlelemon_cart.db');
    return db;
};

const CartScreen = () =>{
    const [getCartItems,setCartItems] =useState([]);
    const [loading ,setLoading] =useState(true);
    // fetch all items from cart
    
    const fetchCartItems = async () =>{
     try
    } 



}