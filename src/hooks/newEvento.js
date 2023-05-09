import  {useState } from 'react'



const NewEvento=(data)=>{
    const [respuesta,setRespuesta]=useState("")
    const fetchEventos=async()=>{
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response= await globalThis.fetch('http://192.168.0.154:3003/api/evento', requestOptions)
        const json=await response.json()
        setRespuesta(json)
    }   
    fetchEventos()
    return {response:respuesta}
}

export default NewEvento