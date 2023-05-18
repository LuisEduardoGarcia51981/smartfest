import React, { useState } from 'react'
import {configuracion} from '../sistema/configuracion.js'
const DelEvento=(id_evento)=>{
    console.log("estamos en DelEvento cheee");
    const [respuesta,setRespuesta] = useState("");
    const eliminarEvento=async()=>{        
        const requestOptions = {
            method: 'DELETE',            
        };
        const response= await globalThis.fetch(configuracion.ipserver+':'+configuracion.puertoserver+"/api/evento/"+id_evento, requestOptions)
        const json=await response.json()
        setRespuesta(json)
    }   
    React.useEffect(() => {
        eliminarEvento();
      }, []);   
    return {response:respuesta}
}
export default DelEvento

  

