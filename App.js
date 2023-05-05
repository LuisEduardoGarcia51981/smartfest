
import React from 'react';

import { NavigationContainer, DefaultTheme  } from '@react-navigation/native' //para la barra de abajo
import BottomTab from './src/components/navigator/BottomTab.jsx';
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
      <BottomTab/>
    </NavigationContainer>
  );
}


