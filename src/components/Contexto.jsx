{
/*Conceptos:
  Un contexto (Context) provee una forma de pasar datos a través del árbol de componentes 
  sin tener que pasar props manualmente en cada nivel.
Normalmente en React, los datos se pasan de arriba hacia abajo (de padre a hijo) 
usando  props, pero esta forma puede resultar incómoda para ciertos tipos de props 
 que son necesarias para muchos componentes dentro de una aplicación. 
 Context provee una forma de compartir valores como estos entre componentes sin tener que pasar 
 explícitamente una prop a través de cada nivel del árbol.
Permite compartir datos que pueden considerarse “globales” para un árbol de componentes en React.

*/

}
{
    /*
    createContext es una función que se utiliza para crear un contexto, 
    el cual proporciona una forma de compartir datos entre componentes 
    sin tener que pasar explícitamente props a través de la jerarquía de componentes.

    */
}
import React,{createContext,useState} from 'react'

export const Contexto =createContext()

export const Datos  =({children})=>{
    //--------------------------------------------------------------------------
    //Definición de variables de contexto para el ModalAlert
    const [vermodal, setVermodal]=useState(false)//permite ver u ocultar un modal (ModalAlert.jsx)
    const [textomodal, setTextomodal]=useState("") //Es el texto del componente ModalAlert 
    const [path_return, setPath_return]=useState("") // la ruta hacia donde se navegara cuando se presione el boton "aceptar" en ModalAlert

    //--------------------------------------------------------------------------
    //Definición de variables de contexto para el campo "extraData" del FlatList en EventoList.jsx
    const [actionFlatList, setActionFlatList]=useState(false)

    //--------------------------------------------------------------------------
    //Definición de variable de contexto el useEffect que permite cargar nuevamente los datos  de un evento a actualizar de un formulario, en Updateevento.jsx llamado desde EventoItem.jsx
    //NO SE USA; HAY QUE ELIMINARLOS:
    const [actualizarFormUpdate, setActualizarFormUpdate]=useState(false)
    
    //--------------------------------------------------------------------------
    //Definición de variables de contexto para ver el fomulario de eliminacion de eventos (EliminarEvento.jsx)
    const [vermodalconfirm, setVermodalconfirm]=useState(false)
    const [textomodalconfirm, setTextomodalconfirm]=useState("")

    //--------------------------------------------------------------------------
    //Definición de variable de contexto para el useEffect que permite cargar nuevamente los datos  de un evento a actualizar de un formulario, en Updateevento.jsx llamado desde EventoItem.jsx
    const [loadDatos,setLoadDatos] = useState(false);

    //--------------------------------------------------------------------------
    //Definición de variable de contexto para ir al inicio del componente ScrollView que muestra la 
    //view del evento: Verevento       
    const [viewport,setViewPort]=useState(false)
    //--------------------------------------------------------------------------
    //Definición de las variables de contexto para el infinite scroll o paginacion infinita
    //forzarpage es usado en un useEffect para ejecutar el componente que buscarEventos y genera los datos
    //para el FlatList
    const [page,setPage]=useState(0)
    const [forzarpage,setForzarPage]=useState(false)
    
    //--------------------------------------------------------------------------
    return ( 
        <Contexto.Provider value={{vermodal,setVermodal,textomodal, setTextomodal,path_return, setPath_return,actionFlatList, setActionFlatList,vermodalconfirm, setVermodalconfirm,textomodalconfirm, setTextomodalconfirm,loadDatos,setLoadDatos,viewport,setViewPort,page,setPage,forzarpage,setForzarPage}}>
            {children}

        </Contexto.Provider>
    )
}