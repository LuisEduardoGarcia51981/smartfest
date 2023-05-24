import React, {useContext} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { Contexto } from './Contexto';
import {configuracion} from '../sistema/configuracion.js'
import Modalalert from './Modalalert.jsx'


const EliminarEvento = ({id_evento}) => {  

//--------------------------------------------------------------------------
  //texto que visualiza solicitando confirmacion para eliminar, tambien muestra el modal
    const {textomodalconfirm}=useContext(Contexto) 
    const {vermodalconfirm, setVermodalconfirm}=useContext(Contexto)
//--------------------------------------------------------------------------    
//Si elimina, tiene que actualizar el flatlist de EventoList
    const {actionFlatList,setActionFlatList}=useContext(Contexto)   
    const {setPage}=useContext(Contexto) //para actualizar los datos del flatlist
    const {forzarpage,setForzarPage}=useContext(Contexto) //para actualizar los datos del flatlist
//--------------------------------------------------------------------------    
//Para ver el modalalert para indicar que la eliminacion se realizo de forma exitosa   
    const {setVermodal}=useContext(Contexto)
    const {setTextomodal}=useContext(Contexto)
    const {setPath_return}=useContext(Contexto)
//-------------------------------------------------------------------------- 
    
    
    const eliminarEvento=async()=>{       
          const requestOptions = {
              method: 'DELETE',            
          };
          const response= await globalThis.fetch(configuracion.ipserver+':'+configuracion.puertoserver+"/api/evento/"+id_evento, requestOptions)
          if (response.status==200)     {              
            {setTextomodal("El evento se elimino exitosamente")}                                              
            {setVermodal(true)}                        
            {setPath_return("Dashboard")} 
          }
          else
          {                  
              {setTextomodal("Error: el evento no se pudo eliminar")}
              {setPath_return("error")}    
              {setVermodal(true)}  
          }    
      }            
    //-------------------------------------------------------------------------- 
    //-------------------------------------------------------------------------- 
    const cambiarActionFlat=()=>{// me parece que lo ejecuta el modalalert.jsx
      setActionFlatList(!actionFlatList)
    }
    const actionChangePage=()=>{// me parece que lo ejecuta el modalalert.jsx
      setPage(0)
      setForzarPage(!forzarpage)      
    }
    //-------------------------------------------------------------------------- 
    // accion a ejecutar cuando se presiona el boton cancelar al solicitar la confirmacion de
    //la eliminacion del evento
    const onpressCancelFunction=(props_state)=>{        
      setVermodalconfirm(props_state)          
                 
    }
    //-------------------------------------------------------------------------- 
    const onpressDeleteFunction=(props_state)=>{          
        setVermodalconfirm(props_state)        
        eliminarEvento();                   
    }
    //-------------------------------------------------------------------------- 
    return (      
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible= {vermodalconfirm==true || vermodalconfirm==false ? vermodalconfirm: false} 
          onRequestClose={() => {            
           
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{textomodalconfirm}</Text>
              <View style={styles.linea}>               
                  <Pressable
                    style={[styles.buttonalert, styles.buttonClose]}
                    onPress={() => onpressDeleteFunction(false)}>
                    <Text style={styles.textStyle}>aceptar</Text>
                  </Pressable>
                
                  <Pressable
                    style={[styles.buttonalert, styles.buttonClose]}
                    onPress={() => onpressCancelFunction(false)}>
                    <Text style={styles.textStyle}>cancelar</Text>
                  </Pressable>               
              </View>                                            
            </View>
          </View>
        </Modal>  
        <Modalalert />      
      </View>     
    );
  };
  
  const styles = StyleSheet.create({
    linea: {
      display: 'flex',
      justifyContent:'space-between'  
      
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonalert: {
      borderRadius: 5,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });  
  export default EliminarEvento;