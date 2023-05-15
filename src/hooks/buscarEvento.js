import React, { useEffect, useState } from 'react'
//definimos el custom Hook, que realiza refactorizacion
//mantiene el codigo mas limpio
//Esto es especialmente común cuando tenemos componentes que llaman a una API para obtener un dato,
// lo meten en un estado y ejecutan una acción determinada con él. Todos estos pasos, que al final son muy repetitivos, se simplifican con el uso de custom hooks.

const BuscarEvento=(id_evento)=>{
    const [evento,setEvento]=useState(null)
    const fetchEvento=async()=>{
        const response= await globalThis.fetch('http://192.168.2.118:3003/api/evento/'+id_evento,{
            method: 'GET'
        })
        const json=await response.json()
        
        setEvento(json.obj_evento)               
    }
    useEffect(()=>{
        fetchEvento()
    },[])  
      
    const eventoNode=evento==null
        ? []
        : evento
    let respuesta={evento:eventoNode} ;  
   
    return respuesta
    
}

export default BuscarEvento