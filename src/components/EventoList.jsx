import React from 'react';
import {Text,FlatList} from 'react-native'
import eventos from '../hooks/useEventos'
import EventoItem from './EventoItem.jsx';
import useEventos from '../hooks/useEventos.js';
const EventoList=()=>{

    const {eventos}=useEventos()
    return (
        
        <FlatList 
            data={eventos}
            ItemSeparatorComponent={()=><Text></Text>}
            renderItem={({item:repo})=>(
                <EventoItem {...repo}/>
            )}
        
        />        
    )
}
export default EventoList