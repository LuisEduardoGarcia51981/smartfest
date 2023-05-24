import {useContext,useState,} from "react";
import {Text, StyleSheet,ScrollView,Image,View } from "react-native";
import {useForm} from "react-hook-form";
import "../css/styleforms.css"
import DatePicker from "./DatePicker";
import { Box } from "@mui/material";
import Modalalert from './Modalalert.jsx'
import {Contexto} from './Contexto.jsx'
import { useNavigation } from '@react-navigation/native';
import {configuracion} from '../sistema/configuracion.js'
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
        paddingBottom: 1,
        paddingLeft:0,
        paddingRight:10,            
        alignSelf: 'flex-start',        
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',     
    },
    titulo2: {
        color: 'black',                
        fontSize: 16,
        fontWeight: 'bold',   
        marginRight: 10,  
    },
    descripcion: {
        textAlign: 'justify'
    },
    elemItem: {        
        marginBottom:10,
        marginRight:8
    },
    elemItem2: {                
        flex: 1,
    },
    elemItemImg: {        
        marginBottom:10,
        marginRight:8,
        borderWidth: 1,
        borderColor:"#D8D8D8",
        borderRadius:5
    },
    
})
  
export default function Newevento(){  
    
 //--------------------------------------------------------------------------
 //obtenemos las funciones a usar desde useForm  
    const {register,formState:{errors},watch,handleSubmit, control}= useForm({
        defaultValues:{
            titulo:'',            
        }
    });
//--------------------------------------------------------------------------
//Para ver el ModalAlert.jsx cuando al final se le informa al usuario de que 
// los datos de la edicion se guardaron exitosamente
    const {setVermodal}=useContext(Contexto)
    const {setTextomodal}=useContext(Contexto)
    const {setPath_return}=useContext(Contexto)
//--------------------------------------------------------------------------
//al final del formulario hay 2 botones: guardar o cancelar
//cancelar vuelve al EventoList
//esta funcion cancelarAction es la que realiza la vuelta a la ruta apropiada 
    const navigation = useNavigation();  
    const cancelarAction=()=>{
        navigation.navigate("Dashboard")   
           
    }
//--------------------------------------------------------------------------
// No se si se usa
    const resetAction=()=>{        
           
    }
//--------------------------------------------------------------------------
    const onSubmit= (data)=>{   

        let fecha = new Date(data.fecha_evento);
        
        fecha=fecha.toISOString().substring(0,10);        
        data.fecha_evento=fecha;
        
        var form_data = new FormData();
        form_data.append('titulo', data.titulo);
        form_data.append('descripcion', data.descripcion);
        
        form_data.append(
            "file",  
            data.file[0]);
        form_data.append('id_usuario', "234");
        form_data.append('tipofiesta', data.tipofiesta);        
        form_data.append('horario_inicio', data.horario_inicio);
        form_data.append('fecha_evento', data.fecha_evento);        
        form_data.append('clasificacion', data.clasificacion);
        form_data.append('activo', data.activo);
        form_data.append('direccion', data.direccion);
        let cad_redes = '[{ "red":"facebook" ,"link":"' + data.facebook+ '"},{"red":"twiter", "link":"' +  data.twitter + '" }]'
        form_data.append("redes_sociales", cad_redes)
        const fetchEventos=async()=>{    
            const response= await globalThis.fetch(configuracion.ipserver+':'+configuracion.puertoserver+'/api/evento', {                
                method: "POST",
                body: form_data
            })  

            if (response.status==200)     {  
                    {setTextomodal("El evento se creo exitosamente")}                                              
                    {setVermodal(true)}                        
                    {setPath_return("Dashboard")} 
            }
            else
            {                
                {setTextomodal("Error: no se pudo guardar el evento")}
                {setPath_return("error")}    
                {setVermodal(true)}  
            }            
            const json=await response.json() ;                       
        }   
        fetchEventos();                

    }  
//Fin onSubmit    
//--------------------------------------------------------------------------

//Codigo para el manejo de la imagen
// la muestra en pantalla
    const [selectedImage, setSelectedImage] = useState(null);//para visualizar la imagen del evento  
    const handleFileChange = (event) => {        
        const file = event.target.files[0];    
        setSelectedImage(URL.createObjectURL(file));  
      };

//--------------------------------------------------------------------------
    return (                
            <ScrollView>                
                <Box sx={{ p: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>                
                    <View style={styles.elemItem}> 
                        <Text lines='1' style={styles.titulo}>Nombre del evento</Text>                     
                        <input type="text" {...register('titulo',{
                            required:true,
                            minLength:1
                        })}></input>
                        {errors.titulo?.type ==='required' && <span style={styles.error}>El campo titulo es requerido</span>}
                        {errors.titulo?.type ==='minLength' && <p>El campo nombre debe de tener mas de 1 caracter</p>}
                    </View>
                    <View style={styles.elemItem}>
                            <div>
                                <Text lines='1' style={styles.titulo}>Fecha del evento</Text>                                 
                                <DatePicker
                                    name="fecha_evento"
                                    control={control}
                                    label="ingrese fecha evento"
                                    format="DD/MM/YYYY"
                                    error={errors?.fecha_evento?.message}
                                    {...register('fecha_evento')}
                                />
                            </div>
                            <div>
                                <Text lines='1' style={styles.titulo}>Hora</Text>                             
                                <input type="text" {...register('horario_inicio',{
                                    required:true,                               
                                })}></input>                                                
                                    
                            </div>                      
                    </View>
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Dirección del evento</Text> 
                        <input type="text" {...register('direccion',{
                                    required:true,                               
                                })}></input> 
                    </View>
                    <View Viewstyle={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Descripción del evento</Text> 
                        <textarea
                            type="text" 
                            rows="5"
                            placeholder="Escribe una descripción..."
                            name="descripcion"
                            {...register('descripcion',{required: true, maxLength: 1000})}

                        />
                            {errors.descripcion?.type ==='required: true,' && <p>El campo descripcion no puede estar vacio</p>}
                    </View>
                    <View Viewstyle={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Tipo de fiesta</Text> 
                        <select {...register('tipofiesta')}>
                            <option value="Sin clasificar">Sin clasificar</option>
                            <option value="Aniversario">Aniversario</option>
                            <option value="Baile">Baile</option>
                            <option value="Bautismo">Bautismo</option>
                            <option value="Bingo">Bingo</option>
                            <option value="Casamiento">Casamiento</option>
                            <option value="Condecoración">Condecoración</option>
                            <option value="Cumpleaño">Cumpleaño</option>
                            <option value="Cumpleaño de 15">Cumpleaño de 15</option>
                            <option value="Cumpleaño de 18">Cumpleaño de 18</option>
                            <option value="Despedida de casado">Despedido de casado</option>
                            <option value="Despedida de soltero">Despedida de soltero</option>
                            <option value="Egreso">Egreso</option>                            
                            <option value="Electronica">Electrónica</option>
                            <option value="Fiesta">Fiesta</option>                                                                                                                                                                                                                                                                                                                                                
                        </select>
                    </View>
                    <View Viewstyle={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Clasificación</Text>
                        <select {...register('clasificacion')}>
                            <option value="Sin clasificar">Sin clasificar</option>
                            <option value="Privado libre">Privado libre</option>
                            <option value="Privado pago">Privado pago</option>                            
                            <option value="Público libre">Público libre</option>
                            <option value="Público pago">público pago</option>                     
                        </select>
                    </View>
                    <View Viewstyle={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Flyer</Text>
                        <input  
                            type="file"
                            name="file"
                            accept="image/jpg"
                            //value={evento.file}  
                            {...register('file')}                       
                            onChange={handleFileChange}
                            
                            
                            />
                            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
                        
                    </View>  
                    <View Viewstyle={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Facebook</Text>
                        <input type="text" {...register('facebook')}></input> 
                    </View>
                    <View Viewstyle={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Twitter</Text>
                        <input type="text" {...register('twitter')}></input> 
                    </View>                                          
                    <View Viewstyle={styles.elemItem2}>
                        <Text lines='1' style={styles.titulo2}>Activo</Text>
                        <input type="checkbox" {...register('activo')} />
                        
                    </View>            
                    <div className="botones">
                        <input type="submit" value="Guardar"></input>
                        <input type="button" value="Cancelar" onClick={cancelarAction}></input>
                    </div>
                    
                </form>                
                </Box>
                <Modalalert />
            </ScrollView>
       
    )    
} 