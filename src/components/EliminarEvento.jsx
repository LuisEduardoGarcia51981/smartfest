import React, {useContext,useState,useEffect} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { Contexto } from './Contexto';
import { useNavigation } from '@react-navigation/native';
import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
import {configuracion} from '../sistema/configuracion.js'

const EliminarEvento = ({id_evento}) => {  
  
    const {textomodalconfirm}=useContext(Contexto)  
    const {path_return}=useContext(Contexto)  
    const {actionFlatList,setActionFlatList}=useContext(Contexto)  
    
    const {vermodalconfirm, setVermodalconfirm}=useContext(Contexto)

    const {setVermodal}=useContext(Contexto)
    const {setTextomodal}=useContext(Contexto)
    const {setPath_return}=useContext(Contexto)


    const [respuesta,setRespuesta] = useState("");
    const navigation = useNavigation();    
    console.log("El id del evento en EliminarEvento linea 18 es: ");
    console.log(id_evento);
    console.log(Object.keys(id_evento));
    
      
      const eliminarEvento=async()=>{        
          const requestOptions = {
              method: 'DELETE',            
          };
          const response= await globalThis.fetch(configuracion.ipserver+':'+configuracion.puertoserver+"/api/evento/"+id_evento, requestOptions)
          const json=await response.json()
          setRespuesta(json)
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

    const cambiarActionFlat=()=>{
      setActionFlatList(!actionFlatList)
    }


    const onpressCancelFunction=(props_state)=>{  
      console.log("aca en cancellonpressFunction");          
      setVermodalconfirm(props_state)          
                 
    }

    const onpressDeleteFunction=(props_state)=>{  
      console.log("aca en onpressDeleteFunction");  
      //useEffect(()=>{        
        eliminarEvento();
      //},[]) 
               
      //deleteEvento(id_evento);
      console.log("por aca");
      cambiarActionFlat(); 
      console.log("Despues de action flat")
      setVermodalconfirm(props_state)
      console.log("ocultamos el modal")
      
    }
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
  //onPress={() => setModalVisible(!mostrarModal)}>
  //setModalVisible(!mostrarModal);
  //visible={mostrarModal}
  export default EliminarEvento;