import { View,Text,StyleSheet,ScrollView ,Image,} from "react-native";
import "../css/styleforms.css"
import { Box } from "@mui/material";
import { useNavigation,useRoute } from '@react-navigation/native';
import StyledText from './StyledText'
import Moment from 'moment';
import {configuracion} from '../sistema/configuracion.js'
Moment.locale('es');

const styles=StyleSheet.create({
    error:{
        color:'red',
        fontSize:12,
        marginBottom:20,
        marginTop:-5
    },     
    container: {
        flex: 1,        
      },
    image: {      
        width: 300,
        height: 300,
        marginRight: 10,
        marginBottom: 12,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: "center",        
        resizeMode:"contain"                    
    },
    titulo: {
        color: 'black',        
        paddingBottom: 2,
        paddingLeft:0,
        paddingRight:10,            
        alignSelf: 'flex-start',        
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',     
    },
    descripcion: {
        textAlign: 'justify'
    },
    elemItem: {        
        marginBottom:10,
        marginRight:8
    },
})

export default function Verevento(){               

    const route = useRoute();
    const registro_evento = route.params.reg_evento;
    
    const id_evento=registro_evento._id;
    const navigation = useNavigation();  
    const aceptarAction=()=>{
        navigation.navigate("Dashboard")   
        //reset()    
    }   
    const flyer=registro_evento.flyer;
    
    const mongoDate = new Date(registro_evento.fecha_evento);
    const year = mongoDate.getUTCFullYear();
    const month = String(mongoDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(mongoDate.getUTCDate()).padStart(2, '0');
    const dateEvento = `${year}-${month}-${day}`;   
        
    return (  
                      
            <ScrollView >    
                     
                <Box sx={{ p: 2 }}>
                   
                    <View style={styles.elemItem}>                        
                        <Text lines='1' style={styles.titulo}>Nombre del evento: </Text> 
                        <Text style={styles.descripcion}>{registro_evento.titulo} </Text>                                          
                                               
                    </View>
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Fecha y hora del evento: </Text> 
                        <Text style={styles.descripcion}>{Moment(dateEvento).format('dddd DD/MM/YYYY')} | {registro_evento.horario_inicio}</Text>                                                                 
                                               
                    </View>                    
                    <View style={styles.elemItem}>                           
                        <Text lines='1' style={styles.titulo}>Dirección del evento: </Text>
                        <Text style={styles.descripcion}>{registro_evento.direccion}</Text> 
                                                                           
                    </View>                    
                    <View style={styles.elemItem}>                        
                        <Text lines='1' style={styles.titulo}>Descripción del evento: </Text> 
                        <Text style={styles.descripcion}>{registro_evento.descripcion}</Text>                                                   
                    </View>
                    <View style={styles.elemItem}>                      
                        <Text lines='1' style={styles.titulo}>Tipo de fiesta y clasificación: </Text> 
                        <Text style={styles.descripcion}>{registro_evento.tipofiesta} | {registro_evento.clasificacion}</Text>
                    </View>                    
                    <View style={styles.elemItem}>                        
                            <Text lines='1' style={styles.titulo}>Flyer: </Text> 
                            <Image
                                source={{uri:configuracion.ipserver+':'+configuracion.puertoserver+'/img/'+flyer}}
                                style={styles.image}                            
                            />                          
                    </View>                 
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Facebook: </Text> 
                        <Text style={styles.descripcion}>{registro_evento.facebook}</Text>                                                 
                    </View>
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Twitter: </Text>
                        <Text style={styles.descripcion}>{registro_evento.twitter}</Text>
                         
                    </View>                                          
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>{registro_evento.activo == 0 ? "El registro no está activo" : "El registro está activo"} </Text>                                                      
                    </View>            
                    <div className="botones">                        
                        <input type="button" value="Volver" onClick={aceptarAction}></input>
                    </div>                                                 
                </Box>                
            </ScrollView>       
    )    
} 