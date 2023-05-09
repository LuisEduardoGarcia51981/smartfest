 import React from "react";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen";
import ProfileScreen from "../ProfileScreen"
import Icon from 'react-native-vector-icons/Ionicons';
import EventoList from "../EventoList";
import { Text,View} from 'react-native';
import Newevento from "../Newevento"
import {Datos,Contexto} from '../Contexto'

const Tab = createBottomTabNavigator();


const BottomTab =()=> {
  
  return (  
    <Datos>
      <Tab.Navigator
      
        //style={{justifyContent: 'flex-start'}}
        //screenOptions={{ headerStyle: { justifyContent: 'flex-start' } }}
        screenOptions={({route})=>({      
          //headerShown: false,
          tabBarButton: [
            "Nuevo Evento",           
          ].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
          
          tabBarIcon:({focused, color, size})=>{
            let iconName='';            
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
          <Tab.Screen name="Inicio" component={HomeScreen} />               
          <Tab.Screen name="Dashboard" component={EventoList}  
                                    
                options={({navigation})=>({
                    
                    /*tabBarStyle: {flex:1, 
                      flexDirection: 'row', 
                      justifyContent:'flex-start',
                      overflow: "hidden", },*/
                      headerStyle: {
                        height: 80, // Specify the height of your custom header
                      },
                      tabBarLabel: 'Dashboard',
                      headerRightContainerStyle:{
                        flex:1, 
                        flexDirection: 'row', 
                        justifyContent:'flex-start',
                        overflow: "hidden",
                        alignItems:"center"
                      },
                      headerRight:()=>(  
                        
                          <Icon 
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
      </Tab.Navigator>   
      </Datos>   
  );
}

export default BottomTab