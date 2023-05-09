import React,{createContext,useState} from 'react'

export const Contexto =createContext()



export const Datos  =({children})=>{
    const [vermodal, setVermodal]=useState(false)
    const [textomodal, setTextomodal]=useState("")
    const [path_return, setPath_return]=useState("")
    const [actionFlatList, setActionFlatList]=useState(false)
    return ( 
        <Contexto.Provider value={{vermodal,setVermodal,textomodal, setTextomodal,path_return, setPath_return,actionFlatList, setActionFlatList}}>
            {children}

        </Contexto.Provider>
    )
}