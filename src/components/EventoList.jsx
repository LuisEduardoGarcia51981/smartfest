import React, { useContext } from 'react';
import {Text,FlatList} from 'react-native'

import EventoItem from './EventoItem.jsx';
import useEventos from '../hooks/useEventos.js';
import {Datos,Contexto} from './Contexto';

const EventoList=()=>{
    const {eventos}=useEventos()
    const {actionFlatList}=useContext(Contexto)  
    return (        
        <FlatList 
            data={eventos}            
            ItemSeparatorComponent={()=><Text></Text>}
            renderItem={({item:repo})=>(
                <EventoItem {...repo}/>
            )}
            ListEmptyComponent={<Text>No hay datos disponibles</Text>}
            extraData={actionFlatList}
        />         
    )
}
export default EventoList