
import {StyleSheet,Text, View,Image} from 'react-native';
import logo from '../../assets/logo.png';
import theme from "../theme.js";

{
  //StyleSheet se utiliza para manipular y controlar estilos CSS de elementos HTML en tiempo de ejecución. 
  //Permite cambiar o aplicar estilos dinámicamente a elementos HTML 
}

const styles=StyleSheet.create({ 
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
//Los box me permiten dividir la pantalla en 3 layouts: box1, box2 box 3
  box1: {
    
    backgroundColor: '#FFFFFF',
    height: '30%',
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  box2: {  
    flex:1,
    backgroundColor: '#6fa7b6',           
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
            <Text style={theme.singleTextHomeScreen} >
            SmartFest, fiestas inteligentes,  le permite organizar y publicitar cualquier tipo de evento por  la web oficial.
           </Text>
           <Text style={theme.singleTextHomeScreen}>
            Organizá y publicá tu fiesta como quieras!!
             
            </Text>
            
        </View>                 
</View>
);
  
export default HomeScreen