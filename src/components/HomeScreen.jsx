
//import Icon from 'react-native-vector-icons/Ionicons';
      //<Icon name="american-football-outline" size={30} color="#900" /

import React from 'react';
import {StyleSheet,Text, View,Image,ScrollView,Dimensions} from 'react-native';
import logo from '../../assets/logo.png';
//import '../../css/Main.css';
import theme from "../theme.js";

var { height } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;
const styles=StyleSheet.create({
  /*container:{
      backgroundColor:theme.appBar.primary,        
      flexDirection:"row",
      paddingTop: 10,
  },*/ 
  lineStyle:{ 
    borderWidth: 0.05, 
    borderColor:'#e3e3e3', 
    margin:10, 
    alignSelf:'stretch',

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:theme.appBar.primary,   
    
  },

  box1: {
    
    backgroundColor: '#FFFFFF',
    height: '30%',
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  box2: {  
    flex:1,
    backgroundColor: '#6fa7b6',       
    //justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    paddingTop: 10,

  },
  box3: {   
    flex: 10,       
    backgroundColor: '#b2c7cc',        
    alignContent:'center',
    alignItems: 'center',
  }

})

const HomeScreen = () => (

 

  //<View style={{ justifyContent: 'center', alignItems: 'center'}}>
  //<Image style = {theme.style_logo} source={logo} resizeMethod = "contain"/>
  <View style={styles.container}>

        <View style={[styles.box1]}>
            <Image style = {theme.style_logo} source={logo} resize = "contain"/>
            <Text style={theme.titleText}>
                Tu fiesta, en un lugar
                {'\n'}        
            </Text> 
        </View>
        <View style={[ styles.box2,]}>
            <Text style={theme.subtitleText}>
            Autogestione sus eventos
              {'\n'}{'\n'}
            </Text>
        </View>        
        <View style={[ styles.box3]}>
            <Text style={theme.singleText}>
            SmartFest, fiestas inteligentes,  le permite organizar y publicitar cualquier tipo de evento por  la web oficial.
           </Text>
           <Text style={theme.singleText}>
            Organizá y publicá tu fiesta como quieras!!
             
            </Text>
            
        </View>                 
</View>
);
  
export default HomeScreen