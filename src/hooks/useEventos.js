import React, { useEffect, useState ,useContext} from 'react'
import {Contexto} from '../components/Contexto.jsx'
import {configuracion} from '../sistema/configuracion.js'
//definimos el custom Hook, que realiza refactorizacion
//mantiene el codigo mas limpio
//Esto es especialmente común cuando tenemos componentes que llaman a una API para obtener un dato,
// lo meten en un estado y ejecutan una acción determinada con él. Todos estos pasos, que al final son muy repetitivos, se simplifican con el uso de custom hooks.

const UseEventos=()=>{    
    const [eventos,setEventos]=useState(null)
    const {actionFlatList}=useContext(Contexto) 
    const agregarEvento=(evento)=>{
        setEventos(prev => prev.push[evento])
    }
    const fetchEventos=async()=>{
        const response= await globalThis.fetch(configuracion.ipserver+':'+configuracion.puertoserver+'/api/eventosUser?userId=234',{
            method: 'GET'
        })
        const json=await response.json()
        setEventos(json.eventos)       
    }
    useEffect(()=>{
        fetchEventos()
    },[actionFlatList])        
    const eventosNodes=eventos==null
        ? []
        : eventos
    let respuesta={eventos:eventosNodes,agregarEvento} ;   
    return respuesta
}
export default UseEventos

