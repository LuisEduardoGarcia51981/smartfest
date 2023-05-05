import React from "react";
import { Text,View} from 'react-native';
import EventoList from "./EventoList.jsx";
import AppBar from './AppBar.jsx'
import { Route,Routes, Link } from "react-router-native"
import LogInPage from "../pages/Login.jsx";


const Signin = () => <Text>Para crear cuenta</Text>;

const Main = () => {
    
    return (
        <View style={{ flex:1}} >                    
            <AppBar />
            <Routes>
                <Route exact path='/'  element={<EventoList/>}/>    
                <Route exact path='/signin'  element={<LogInPage/>}/>                  
            </Routes>            
        </View>
    )
}
export default Main
