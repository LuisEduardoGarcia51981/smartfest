import React ,{useState,useEffect } from 'react'
import { View, StyleSheet,Image, Platform} from 'react-native'
import StyledText from './StyledText'
import theme from "../theme.js";
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {Contexto} from '../components/Contexto.jsx'
import { useContext } from 'react';
import EliminarEvento from './EliminarEvento';
import {configuracion} from '../sistema/configuracion.js'
Moment.locale('es');
//CONCEPTO:
//Props: se refiere a un mecanismo para pasar datos de un componente padre a un componente hijo. 
//Los props son una forma de comunicación unidireccional en React.
//Las props son la colección de datos que un componente recibe del contenedor padre

const EventoItemHeader=({_id,flyer,titulo,descripcion,fecha_evento,horario_inicio,clasificacion,tipofiesta,activo,redes_sociales,direccion})=>{             
//--------------------------------------------------------------------------   
// obtiene las redes sociales de la prop redes_sociales
    const linkface=redes_sociales[0].link;
    const linktwitter= redes_sociales[1].link    
//--------------------------------------------------------------------------    
//Creacion de horario
    const time_evento = new Date(horario_inicio);
    const horas = time_evento.getHours().toString().padStart(2, '0');
    const minutos = time_evento.getMinutes().toString().padStart(2, '0');
    const segundos = time_evento.getSeconds().toString().padStart(2, '0');
    const horario_inicio_up=horas+':'+minutos+':'+segundos
//--------------------------------------------------------------------------    
//Se crea un registro que contiene la info del evento y que luego es pasada a la
//edicion y a la accion de "ver un evento"
    const reg_evento={
            _id:_id,
            flyer:flyer,
            titulo:titulo,
            descripcion:descripcion,        
            fecha_evento:fecha_evento,
            horario_inicio:horario_inicio_up,
            clasificacion:clasificacion,
            tipofiesta:tipofiesta,
            activo:activo, 
            direccion:direccion,  
            facebook:linkface, 
            twitter:linktwitter,           
    }
//-------------------------------------------------------------------------- 
// convertir fecha_evento en un formato apto para ser procesado por Datepicker de MUI
//MUI (Material-UI) es una biblioteca de componentes de interfaz de usuario (UI) de React

    const mongoDate = new Date(fecha_evento);
    const year = mongoDate.getUTCFullYear();
    const month = String(mongoDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(mongoDate.getUTCDate()).padStart(2, '0');
    const dateEvento = `${year}-${month}-${day}`;    
//--------------------------------------------------------------------------  
//Para navegar hacia las acciones: ver, editar y eliminar   
    const navigation = useNavigation(); 
//--------------------------------------------------------------------------
//Codigo para la eliminacion de un evento. En realidad muestre el componente EliminarEvento.jsx,
// seteando del contexto los datos apropiados para hacerlo,
//entre los cuales esta la opcion de visualizar el componente y el texto que mostrara
    const {setVermodalconfirm}=useContext(Contexto)
    const {setTextomodalconfirm}=useContext(Contexto)
    
   
    const eliminarEvento = (id_evento)=>{        
        {setTextomodalconfirm("Seguro desea eliminar el evento?")}
        {setVermodalconfirm(true)}
       
    }
//--------------------------------------------------------------------------
// del contexto, para decirle al componente de edicion de eventos (Updevento.jsx)  que actualize el estado
//de los datos que van en su formulario

    const {loadDatos,setLoadDatos}=useContext(Contexto) 
//--------------------------------------------------------------------------

    const {setViewPort}=useContext(Contexto) //para ir al inicio del componente que muestra la view del evento: Verevento    
//--------------------------------------------------------------------------
//Para verificar si la imagen existe
// si la imagen no existe, entonces se carga una por defecto

    const [imagen,setImagen]=useState(null);
    const imageUrl = configuracion.ipserver+':'+configuracion.puertoserver+'/img/'; 
    
    const evaluarImagen=()=>{  
        console.log("entro en evaluarImagen con: "+flyer)                
        let  imagenfinal=""
        Image.getSize(imageUrl+flyer, (width, height) => {
            imagenfinal=imageUrl+flyer
            setImagen(imagenfinal)           
        }, (error) => {            
            imagenfinal=configuracion.ipserver+':'+configuracion.puertoserver+'/assets/photos/unknown.jpg'
            setImagen(imagenfinal)            
        });        
    }
    useEffect(()=>{  
        console.log("vamos a evaluar la imagen"+flyer)            
        evaluarImagen()        
    },[flyer,_id])

    //Fin del codigo para verificar si la imagen existe
//--------------------------------------------------------------------------
    
    return (
        
    <View style={{flexDirection:"row", paddingBottom:2}}>        
        <View><EliminarEvento id_evento={_id}/></View>
        <View style={{paddingRight:10}}> 
        
            <Image style={styles.image} source={{uri:imagen}} />    
                 
        </View>
        <View style={{flex:1, justifyContent:'center'}}>        
            <StyledText fontWeight='bold' lines='1'>{titulo}</StyledText>
            <StyledText  color='secondary' lines='1'>{descripcion}</StyledText>
            <StyledText style={styles.datetime}>{Moment(dateEvento).format('dddd DD/MM/YYYY')} | {Moment(horario_inicio).format('h:mm:ss a')}</StyledText>
            <StyledText fontWeight='boldgreen' lines='1'>Evento: {clasificacion} | Tipo: {tipofiesta}</StyledText> 
            <StyledText fontWeight='boldgreen' lines='1'><Icon name={activo===true ? "thumbs-up-outline" : "thumbs-down-outline"}></Icon> Activo </StyledText> 
            <View style={styles.view_icons}>    
                 
                    <Icon 
                                name={'eye-outline'}
                                size={20}                                                        
                                onPress={
                                    () =>
                                        {
                                            setViewPort(true)
                                            navigation.navigate('Ver Evento', { reg_evento})} 
                                            //Recordar que estas rutas estan contenidas dentro del 
                                            //<NavigationContainer de app.js definidas en BottomTab.jsx

                                        }
                                style={styles.copyIcon}
                    />
                    <Icon 
                                name={'pencil-outline'}
                                size={20}                        
                                style={styles.copyIcon}                                
                                onPress=
                                {
                                    () =>
                                        {
                                            setLoadDatos(true)                                            
                                            navigation.navigate('Editar Evento', { reg_evento})
                                        }
                                }
                    />
                    <Icon 
                                name={'trash-outline'}
                                size={20}  
                                style={styles.copyIcon}                                                      
                                onPress={() =>eliminarEvento(_id)}                                   
                    />
            </View>
        </View> 
        
    </View>
    
    );
}

//--------------------------------------------------------------------------
//Define un item de un evento:
const EventoItem=(props)=> {    
    return (   
    <View key={props.id} style={styles.container} > 
        <EventoItemHeader {...props}/>                      
    </View>
)}
//--------------------------------------------------------------------------

const styles=StyleSheet.create({
    container:{
        padding:20,
        paddingVertical:5
    },
    strong:{
        color:'#09f',
        fontWeight:"bold", 
        marginBottom:5,
    },
    datetime:{
        padding:4,
        color:theme.colors.white,        
        backgroundColor:Platform.select(
            {
                android:theme.colors.primary,
                ios:'orange',
                default:'#6fa7b6'
            }
        ),
        alignSelf:'flex-start',
        borderRadius:4,
        overflow:'hidden',        
        marginVertical:4,
    },
    image:{
        width:48,
        height:48,
        borderRadius:4,
    },
    copyIcon: {        
        color:'rgb(111, 167, 182)',
        borderRadius:2,
        borderWidth: 1,        
        borderColor:'rgb(111, 167, 182)',
        overflow: "hidden",
        padding: 2,
        marginHorizontal:2,
        marginTop:5,
    },
    view_icons:{
        flex:1, 
        flexDirection: 'row', 
        justifyContent:'flex-end',
    },
})

export default EventoItem

