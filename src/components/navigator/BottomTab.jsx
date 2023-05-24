 //import React from "react";
 //createBottomTabNavigator:
 //componente de navegación proporcionado por la biblioteca React Navigation, 
 //que permite crear una barra de pestañas en la parte inferior de la app. 
 //Esta barra de pestañas suele utilizarse para facilitar la navegación entre diferentes 
 //pantallas o secciones de la aplicación.
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";

//Inicio de declaracion de uso de Componentes que son las pantallas a las que va a
//navegar la ap con Bottom_Tab:

import HomeScreen from "../HomeScreen";
import EventoList from "../EventoList";
import Newevento from "../Newevento"
import Updevento from "../Updevento"
import Verevento from "../Verevento"
import ProfileScreen from "../ProfileScreen"
//Fin declaracion de uso de Componentes que son las pantallas a las que va a
//navegar la ap con Bottom_Tab
//------------------------------------------------------------------------- 

// react-native-vector-icons/Ionicons: biblioteca de iconos populares que se utiliza en 
// APS desarrolladas con React Native. 
import Icon from 'react-native-vector-icons/Ionicons';
//------------------------------------------------------------------------- 
//Datos que estan en el conteto global de la app disponible para todos los childrens envueltos
//por "Datos"
import {Datos} from '../Contexto'
//------------------------------------------------------------------------- 
const Tab = createBottomTabNavigator();

//createBottomTabNavigator: Componente que brinda una barra de pestañas en la parte inferior de la pantalla que  
//permite cambiar entre diferentes rutas. 
//Tab contendrá dos componentes 
//  - Tab.Navigator: que representa a toda la barra de navegación y 
//  - Tab.screen que representa un pestaña del tab.
const BottomTab =()=> {
  return (  
    <Datos>
      <Tab.Navigator  // es la barra de navegación                
        screenOptions={ //Definimos propiedades de la barra de navegacion
          ({route})=>({   
//-------------------------------------------------------------------------            
          //Inicio de codigo: definimos los botones de la barra de pestañas que son parte del             
          //botom_navigator pero que son invisibles
          tabBarButton: [ 
          
            "Nuevo Evento",  
            "Editar Evento",     
            "Ver Evento",           
          ].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
          //Inicio de codigo: definimos los botones
//-------------------------------------------------------------------------      
//Definimos los iconos de la barra de pestañas          
          tabBarIcon:({focused, color, size})=>{
            let iconName=''; //defino string iconName para registrar el icono a mostrar en el tab           
            switch (route.name){
              case 'Inicio':
                    iconName='home-outline';
                    break;
              case 'Dashboard':
                    iconName=focused ? 'person-circle'  : 'person-circle-outline';
                    break;
              case 'Perfil':
                    iconName=focused ? 'cog'  : 'cog-outline';
                    break;                  
            }           
              return <Icon name= { iconName } size={size} color={color} />
          }
        })
        }      
      >
{
//------------------------------------------------------------------------- 
          //Inicio es el nombre de la ruta y HomeScreen el contenido de la pantalla del tab            
          }
          <Tab.Screen name="Inicio" component={HomeScreen} />   

{/*-------------------------------------------------------------------------           
  caso especial de Screen, ya que va a mostrar el flatlist de "eventos":*/
}
{/*------------------------------------------------------------------------- opciones para el tab.screen que contendra la lista de eventos (EventoList.jsx)*/} 

          <Tab.Screen name="Dashboard" component={EventoList}   
                options={({navigation})=>({                                        
                      headerStyle: {
                        height: 80, // Personalizo la altura del header
                      },
                      tabBarLabel: 'Dashboard',//label del header del tab.screen
                      headerRightContainerStyle:{//Estilo del header del tab.screen
                        flex:1, 
                        flexDirection: 'row', 
                        justifyContent:'flex-start',
                        overflow: "hidden",
                        alignItems:"center"
                      },
                      headerRight:()=>(  //Contenido derecho dentro del header del tab.screen                        
                          <Icon  // de la libreria 'react-native-vector-icons/Ionicons';
                            name={'add-circle-outline'}
                            size={25}   
                            color={'rgb(111, 167, 182)'}
                            onPress={() => navigation.navigate('Nuevo Evento')}                            
                          />
                                       
                      )                  
                  })}
        />           
          <Tab.Screen name="Perfil" component={ProfileScreen} />   
          <Tab.Screen name="Nuevo Evento" component={Newevento} options={{tabBarVisible:false, headerShown: true ,  tabBarStyle:{ display: 'none' }}} />          
          <Tab.Screen name="Editar Evento" component={Updevento} options={{tabBarVisible:false, headerShown: true ,  tabBarStyle:{ display: 'none' }}} />          
          <Tab.Screen name="Ver Evento" component={Verevento} options={{tabBarVisible:false, headerShown: true ,  tabBarStyle:{ display: 'none' }}} />                    
      </Tab.Navigator>   
      </Datos>   
  );
}

export default BottomTab