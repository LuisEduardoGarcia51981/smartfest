import React, {useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { Contexto } from './Contexto';
import { useNavigation } from '@react-navigation/native';


const Modalalert = () => {  
    const {vermodal,setVermodal}=useContext(Contexto)
    const {textomodal}=useContext(Contexto)  
    const {path_return}=useContext(Contexto)  
    const {actionFlatList,setActionFlatList}=useContext(Contexto)  
    
    const navigation = useNavigation();    

    const cambiarActionFlat=()=>{
      setActionFlatList(!actionFlatList)
    }
    const onpressFunction=(props_state)=>{  
          
      setVermodal(props_state)     
      if  (path_return!='error'){
        console.log("antes de cambiarActionFlat: "+actionFlatList);
        cambiarActionFlat
        console.log("Otro intento: "+actionFlatList);
        navigation.navigate(path_return)        
      }           
    }
  
    return (
      
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible= {vermodal==true || vermodal==false ? vermodal: false} 
          onRequestClose={() => {
            Alert.alert('Se ha cerrado modal.');
           
          }}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{textomodal}</Text>
              
                <Pressable
                  style={[styles.buttonalert, styles.buttonClose]}
                  onPress={() => onpressFunction(false)}>
                  <Text style={styles.textStyle}>aceptar</Text>
                </Pressable>
                
              
            </View>
          </View>
        </Modal>        
      </View>
     
    );
  };
  
  const styles = StyleSheet.create({
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
  export default Modalalert;