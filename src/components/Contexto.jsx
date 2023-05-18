import React,{createContext,useState} from 'react'

export const Contexto =createContext()



export const Datos  =({children})=>{
    const [vermodal, setVermodal]=useState(false)
    const [textomodal, setTextomodal]=useState("")
    const [path_return, setPath_return]=useState("")
    const [actionFlatList, setActionFlatList]=useState(false)
    const [actualizarFormUpdate, setActualizarFormUpdate]=useState(false)
    const [vermodalconfirm, setVermodalconfirm]=useState(false)
    const [textomodalconfirm, setTextomodalconfirm]=useState("")
    
    return ( 
        <Contexto.Provider value={{vermodal,setVermodal,textomodal, setTextomodal,path_return, setPath_return,actionFlatList, setActionFlatList,vermodalconfirm, setVermodalconfirm,textomodalconfirm, setTextomodalconfirm}}>
            {children}

        </Contexto.Provider>
    )
}