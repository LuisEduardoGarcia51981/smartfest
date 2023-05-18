import  {useState } from 'react'
import {configuracion} from '../sistema/configuracion.js'


const NewEvento=(data)=>{
    const [respuesta,setRespuesta]=useState("")
    const fetchEventos=async()=>{
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response= await globalThis.fetch(configuracion.ipserver+':'+configuracion.puertoserver+'/api/evento', requestOptions)
        const json=await response.json()
        setRespuesta(json)
    }   
    fetchEventos()
    return {response:respuesta}
}

export default NewEvento