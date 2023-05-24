{
    //useState: permite actualizar el estado de una variable
    //useEffect: nos permiten ejecutar un trozo de código según el momento en el que 
    //se encuentre el ciclo de vida de nuestro componente
    // permite realizar efectos secundarios en componentes funcionales.
    //Tiene dos argumentos: una función de efecto y una matriz de dependencias opcionales.

}
import React, { useContext,useState,useEffect} from 'react';
{
    //TouchableWithoutFeedback: componente en React Native que permite envolver otros componentes
     //para manejar interacciones táctiles sin agregar ningún efecto visual. 
    //ActivityIndicator:  muestra un indicador de progreso
}
import { View,Text,FlatList, TouchableWithoutFeedback,ActivityIndicator,StyleSheet} from 'react-native'

import EventoItem from './EventoItem.jsx'; //genera un item de evento
import {Contexto} from './Contexto';  //para acceder al contexto
import {configuracion} from '../sistema/configuracion.js' // para acceder al ip y otros datos de configuracion que usa la app



const EventoList=()=>{

    const {page,setPage}=useContext(Contexto) //para actualizar los datos del flatlist   
    const {forzarpage,setForzarPage}=useContext(Contexto) //para actualizar los datos del flatlist      
    //Datos para la paginacion infinita
    const [fullData, setFullData]=useState([])//Datos a cargar en el FlatList
    const [viewFooter,setviewFooter]=useState(false)//para ocultar o mostrar el footer del flatlist

//--------------------------------------------------------------------------
//Footer para el FlatList
const renderFooter =()=>{
    if (viewFooter){
        return (
            <View style={styles.footer}>
                <TouchableWithoutFeedback>
                    <ActivityIndicator color="#e5989b"/>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    else
    {
        return null
    }    
}
//--------------------------------------------------------------------------
const [eventos,setEventos]=useState(null)//Me parece que no se usa
//--------------------------------------------------------------------------
//Funcion flecha no regular, sino de componente para realizar peticion a la api
//solicitando eventos
const buscarEventos=()=>{ console.log("entrando a buscarEventos");   
    const fetchEventos=async()=>{         
        const response= await globalThis.fetch(configuracion.ipserver+':'+configuracion.puertoserver+
        
        '/api/eventosScroll?page='+page+'&userId=234',{
            method: 'GET'
        })
        const json=await response.json()
        setEventos(json.eventos) //Me parece que no se usa       
        const eventosNuevos=json.eventos;
        
        if (page==0){                      
            setFullData(eventosNuevos)            
        }
        else
        {            
            setFullData([...fullData,...eventosNuevos ]) //Spread operator
        }         
        setviewFooter(false)
    }
    fetchEventos()
}

//--------------------------------------------------------------------------
//Cuando se requiere recargar el Flatlist con datos nuevos, se cambia el valor
//de forzarpage. Por ejemplo, cuando se crea un nuevo evento, cuando se edita o elimina un evento
//o cuando se solicita una nueva pagina (handleMore) por el infinite Scrolling
useEffect(()=>{    
    buscarEventos()            
},[forzarpage])

//--------------------------------------------------------------------------
//Para incrementar en 1 la paginacion (una pagina representa un bloque o conjunto de eventos)
const handleMore=()=>{
   setPage( page+1) 
   setForzarPage(!forzarpage) 
}
//--------------------------------------------------------------------------
//Fin datos para la paginacion infinita    
    const {actionFlatList}=useContext(Contexto)           
    return (   
           
        <FlatList 
            data={fullData}    
            ListFooterComponent={renderFooter}        
            onEndReachedThreshold={0.1}//si esta en el rango dado, se dispara onEndReached
            onEndReached={handleMore}
            ItemSeparatorComponent={()=><Text></Text>}
            renderItem={({item:repo})=>(                
                <EventoItem {...repo}/> //spread operator
            )}
            ListEmptyComponent={<Text>No hay datos disponibles</Text>}
            extraData={actionFlatList}// para la actualizacion del flatlist            
        />         
    )
}
export default EventoList

const styles=StyleSheet.create({
    footer:{
        height:35,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#6fa7b6',
        flexDirection:'row',
    }
})