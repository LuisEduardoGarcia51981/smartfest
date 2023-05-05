import React, { useEffect, useState } from 'react'
//definimos el custom Hook, que realiza refactorizacion
//mantiene el codigo mas limpio
//Esto es especialmente común cuando tenemos componentes que llaman a una API para obtener un dato,
// lo meten en un estado y ejecutan una acción determinada con él. Todos estos pasos, que al final son muy repetitivos, se simplifican con el uso de custom hooks.

const UseEventos=()=>{
    
    const [eventos,setEventos]=useState(null)

    const fetchEventos=async()=>{
        const response= await globalThis.fetch('http://192.168.100.4:3003/api/eventosUser?userId=643f12a09103566cb5e1981f',{
            method: 'GET'
        })
        const json=await response.json()
        //console.log(json.eventos)
        setEventos(json.eventos)
        
    }
    useEffect(()=>{
        fetchEventos()
    },[])
    console.log("inicio/n");
    console.log(eventos)
    console.log("final/n");

    const eventosNodes=eventos==null
        ? []
        : eventos
    return {eventos:eventosNodes}
}

export default UseEventos