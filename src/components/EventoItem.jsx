import React from 'react'
import { View, StyleSheet,Image, Platform} from 'react-native'
import StyledText from './StyledText'
import theme from "../theme.js";
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import buscarEvento from '../hooks/buscarEvento.js';

Moment.locale('es');

const EventoItemHeader=({_id,flyer,titulo,descripcion,fecha_evento,horario_inicio,clasificacion,tipofiesta,activo,redes_sociales,direccion})=>{             
    //console.log(redes_sociales);
    const linkface=redes_sociales[0].link;
    const linktwitter= redes_sociales[1].link    

    const time_evento = new Date(horario_inicio);
    const horas = time_evento.getHours().toString().padStart(2, '0');
    const minutos = time_evento.getMinutes().toString().padStart(2, '0');
    const segundos = time_evento.getSeconds().toString().padStart(2, '0');
    const horario_inicio_up=horas+':'+minutos+':'+segundos
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
    const mongoDate = new Date(fecha_evento);
    const year = mongoDate.getUTCFullYear();
    const month = String(mongoDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(mongoDate.getUTCDate()).padStart(2, '0');
    const dateEvento = `${year}-${month}-${day}`;    
    
    //const actualizarEvento=(props_event)=>{      
         
       // alert(props_event.titulo);
       // alert(props_event.fecha_evento);
        //alert(props.redes_sociales);
        //console.log(props_event.redes_sociales)
        //navigation.navigate('Editar Evento', { id_evento: })
    //}
    const navigation = useNavigation(); 
    return (
    <View style={{flexDirection:"row", paddingBottom:2}}>
        <View style={{paddingRight:10}}> 
            <Image style={styles.image} source={{uri:'http://192.168.2.118:3003/img/'+flyer}} />    
                 
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
                                //style={{ justifyContent: 'flex-start' }}
                                //onPress={() => navigation.navigate('Post')}
                                style={styles.copyIcon}
                    />
                    <Icon 
                                name={'pencil-outline'}
                                size={20}                        
                                style={styles.copyIcon}
                                //style={{ justifyContent: 'flex-start' }}
                                onPress={() =>navigation.navigate('Editar Evento', { reg_evento })}
                    />
                    <Icon 
                                name={'trash-outline'}
                                size={20}  
                                style={styles.copyIcon}                      
                                //style={{ justifyContent: 'flex-start' }}
                                //onPress={() => navigation.navigate('Post')}
                    />
            </View>
        </View> 
        
    </View>
    );
}
const EventoItem=(props)=> {
    //console.log("aca en VentoItem: ")
    //console.log(props.redes_sociales[0]);
    return (   
    <View key={props.id} style={styles.container} > 
        <EventoItemHeader {...props}/>                      
    </View>
)}
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
        //backgroundColor:theme.colors.primary,
        //backgroundColor:Platform.OS==='android'?'red': theme.colors.primary,
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
        //color: "rgb(170, 207, 202)", 
        color:'rgb(111, 167, 182)',
        borderRadius:2,
        borderWidth: 1,
        //borderColor: 'rgb(170, 207, 202)',
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

