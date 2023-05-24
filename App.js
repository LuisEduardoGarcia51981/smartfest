
import React from 'react';
//-------------------------------------------------------------------------
//para la barra de abajo. Thema predefenido para el Navigator Container
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native' 
//-------------------------------------------------------------------------
import BottomTab from './src/components/navigator/BottomTab.jsx';
//-------------------------------------------------------------------------
//Inicio de codigo: Estilo para el NavigationContainer
//NavigatorContainer: administra nuestro árbol de navegación
//Es un componente de la libreria react-navigatio, la cual es popular de enrutamiento 
//y navegación para aplicaciones de React Native
//El propósito principal de NavigationContainer es proporcionar un contexto de navegación 
//para toda la aplicación. Gestiona el estado de navegación y proporciona métodos y propiedades 
//para interactuar con la navegación.

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};
export default function App() {  
  return (
    <NavigationContainer theme={MyTheme}>             
    {// BottomTab, componente que usa Bottom Tabs  de react-navigation
    //Bottom_TabsUna es una barra de pestañas en la parte inferior de la pantalla que  
    //permite cambiar entre diferentes rutas. 
    //Las rutas se inicializan de forma perezosa: sus componentes de pantalla no se montan 
    //hasta que se enfocan por primera vez.
    }
      <BottomTab/> 
    </NavigationContainer>
  );
}


