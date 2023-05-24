import {useContext, useState,useEffect} from "react";
import { Text,StyleSheet,ScrollView ,Image, View} from "react-native";
//--------------------------------------------------------------------------   
//biblioteca de formularios de validación y manejo de datos para React. 
//Proporciona una forma sencilla y eficiente de crear formularios en aplicaciones React, 
//utilizando hooks de React.  
import {useForm} from "react-hook-form";
//--------------------------------------------------------------------------   
import "../css/styleforms.css"
import DatePicker from "./DatePicker";
import { Box } from "@mui/material";
import Modalalert from './Modalalert.jsx'
import {Contexto} from './Contexto.jsx'
import { useNavigation,useRoute } from '@react-navigation/native';
import {configuracion} from '../sistema/configuracion.js'

import 'dayjs/locale/es';
import dayjs, { Dayjs } from 'dayjs';

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


export default function Updevento(){         
//--------------------------------------------------------------------------     
//Para ver el ModalAlert.jsx cuando al final se le informa al usuario de que 
// los datos de la edicion se guardaron exitosamente
    const {setVermodal}=useContext(Contexto)
    const {setTextomodal}=useContext(Contexto)
    const {setPath_return}=useContext(Contexto)    
//--------------------------------------------------------------------------  
// Se usa para saber si el formulario se tiene que cargar    
//Viene del contexto
    const {loadDatos,setLoadDatos}=useContext(Contexto) 
//--------------------------------------------------------------------------  
//Se recuperan el registro completo para editarlo   
    const route = useRoute();
    const registro_evento = route.params.reg_evento;  
 //--------------------------------------------------------------------------      
//para mas tarde usarlo en el update    
    const id_evento=registro_evento._id;
//--------------------------------------------------------------------------  
//al final del formulario hay 2 botones: guardar o cancelar
//cancelar vuelve al EventoList
//esta funcion cancelarAction es la que realiza la vuelta a la ruta apropiada        
    const navigation = useNavigation();    
    const cancelarAction=()=>{
        setLoadDatos(false)
        navigation.navigate("Dashboard")   
        reset()   // me parece que no se usa 
    }
//-------------------------------------------------------------------------- 
//Definimos las funciones que usaremos del formulario a partir de useForm de la libreria "react-hook-form
    const { setValue,reset,register,formState:{errors},watch,handleSubmit, control}= useForm({});

//--------------------------------------------------------------------------
    const onSubmit= (data)=>{  

        let fecha=(data.fecha_evento).toISOString().substring(0,10);          
        data.fecha_evento=fecha;           

        var form_data = new FormData();//FormData conjunto de par clave/valor

        form_data.append('activo', data.activo);
        form_data.append('clasificacion', data.clasificacion);
        form_data.append('descripcion', data.descripcion);
        form_data.append('direccion', data.direccion);
        let cad_redes = '[{ "red":"facebook" ,"link":"' + data.facebook+ '"},{"red":"twiter", "link":"' +  data.twitter + '" }]'
        form_data.append("redes_sociales", cad_redes)   
        form_data.append('fecha_evento', data.fecha_evento); //fecha_evento  
        //--------------------------------------------------------------------------
        //Evalua la creacion de un objeto File para la imagen del input type="File"      
        if  (data.file.length==0){
            //Temgo que crear un file
            //console.log("no hay archivo guardado")
            const ext ="jpg";
            const uniqueName = `${Date.now()}.${ext}`;
            const fakeSize = 1024; // Tamaño deseado en bytes

            const emptyBuffer = new ArrayBuffer(fakeSize); // Crear un buffer vacío del tamaño deseado

            // Crear un objeto File simulado
                       
            class FakeFile extends File {
                constructor(data, fileName, options) {
                  const blob = new Blob(data, options);
                  super([blob], fileName, options);
                }
              }
              
              const fileContent = ''; // Contenido vacío
              const fileName = 'archivo.jpgt'; // Nombre del archivo
              const options = { type: 'image/jpeg' }; // Opciones (tipo MIME)
              
              const fakeFile = new FakeFile([fileContent], fileName, options);

            
            form_data.append(
                "file",  
                fakeFile);
            
        }
        else
        {
            //console.log("Si hay archivo guardado")            
            form_data.append(
                "file",  
                data.file[0]);
        }
        //--------------------------------------------------------------------------
        
                            
        form_data.append('horario_inicio', data.horario_inicio);
        form_data.append('tipofiesta', data.tipofiesta); 
        form_data.append('titulo', data.titulo);                        
        form_data.append('id_usuario', "234"); 
       
                                                                          
        const fetchEventos=async()=>{    
            const response= await globalThis.fetch(configuracion.ipserver+':'+configuracion.puertoserver+'/api/evento/'+id_evento, {                
                method: 'PUT',
                body: form_data
            })  

            if (response.status==200)     {  
                    {setTextomodal("El evento se actualizó exitosamente")}                                              
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

    //FIN del onSubmit
 //-------------------------------------------------------------------------- 
const [inputValue, setInputValue] = useState(registro_evento.titulo);//Dudosa procedencia
////--------------------------------------------------------------------------
//Aca se cargan los datos en el formulario en el caso de la la variable de contexto loadDatos cambie
//y sea verdadera 
let dateEvento=null;
useEffect(()=>{        
    if (loadDatos)
    {   //console.log("se realizan los setValue");        
        const mongoDate = new Date(registro_evento.fecha_evento);
        const year = mongoDate.getUTCFullYear();
        const month = String(mongoDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(mongoDate.getUTCDate()).padStart(2, '0');
        const dateEvento = dayjs(`${year}-${month}-${day}`)    
        setValue('activo',registro_evento.activo)
        setValue('clasificacion',registro_evento.clasificacion)
        setValue('descripcion',registro_evento.descripcion)
        setValue('direccion',registro_evento.direccion)
        setValue('horario_inicio',registro_evento.horario_inicio)
        setValue('tipofiesta',registro_evento.tipofiesta)
        setValue('facebook',registro_evento.facebook)
        setValue('titulo',registro_evento.titulo)
        setValue('twitter',registro_evento.twitter)       
        setValue('fecha_evento',dateEvento)       
    }
    else{
        //console.log("NO se realizan los setValue");
    }        
    
},[registro_evento,loadDatos])   
//-------------------------------------------------------------------------- 
//Codigo para el manejo de la imagen
//para que muestre una por defecto si no existe 
// ademas lo muestra en pantalla
const [selectedImage, setSelectedImage] = useState(null);//para visualizar la imagen del evento
const imageUrl = configuracion.ipserver+':'+configuracion.puertoserver+'/img/';
const evaluarImagen=()=>{                  
    let  imagenfinal=""
    Image.getSize(imageUrl+registro_evento.flyer, (width, height) => {
        imagenfinal=imageUrl+registro_evento.flyer
        setSelectedImage(imagenfinal)           
    }, (error) => {            
        imagenfinal=configuracion.ipserver+':'+configuracion.puertoserver+'/assets/photos/unknown.jpg'
        setSelectedImage(imagenfinal)            
    });        
}
useEffect(()=>{              
    evaluarImagen()        
},[registro_evento,loadDatos])

const handleFileChange = (event) => {
    const file = event.target.files[0];    
    setSelectedImage(URL.createObjectURL(file));   
  };

 //-------------------------------------------------------------------------- 
    return (                
            <ScrollView >            
                <Box sx={{ p: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>                
                    <View style={styles.elemItem}>                                                                      
                        <Text lines='1' style={styles.titulo}>Nombre del evento</Text>                                                 
                        <input     
                            defaultValue={registro_evento.titulo}
                            name="titulo"                            
                            type="text" 
                            {...register('titulo',{
                                onChange:  (e) => {                                    
                                    setInputValue(e.target.value)},
                            required:true,
                            minLength:1
                        })} ></input>
                        {errors.titulo?.type ==='required' && <span style={styles.error}>El campo titulo es requerido</span>}
                        {errors.titulo?.type ==='minLength' && <p>El campo nombre debe de tener mas de 1 caracter</p>}
                    </View>
                    <View style={styles.elemItem}>
                            <div>
                                <Text lines='1' style={styles.titulo}>Fecha del evento</Text>
                                <DatePicker
                                    name="fecha_evento"                                    
                                    control={control}                                    
                                    format="DD/MM/YYYY"                                       
                                    fecha_evento={dateEvento}
                                    error={errors?.fecha_evento?.message}
                                    {...register('fecha_evento')}
                                />
                            </div>
                            <div> 
                                <Text lines='1' style={styles.titulo}>Hora del evento</Text>                        
                                <input 
                                    defaultValue={registro_evento.horario_inicio} 
                                    type="text" {...register('horario_inicio',{
                                    required:true,                               
                                })}></input>                                                
                                    
                            </div>                      
                    </View>
                    <View style={styles.elemItem}>                
                        <Text lines='1' style={styles.titulo}>Dirección del evento</Text>                        
                        <input 
                            defaultValue={registro_evento.direccion} 
                            type="text" name="direccion" 
                            
                            {...register('direccion',{
                                        required:true,                               
                                    })} 
                        />                        
                    </View>
                    
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Descripción del evento</Text>                        
                        <textarea
                            type="text"                             
                            rows="5"
                            defaultValue={registro_evento.descripcion}
                            placeholder="Escribe una descripción..."
                            name="descripcion"
                            {...register('descripcion',{required: true, maxLength: 1000})}

                        />
                            {errors.descripcion?.type ==='required: true,' && <p>El campo descripcion no puede estar vacio</p>}
                    </View>
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Tipo de fiesta</Text>                        
                        <select 
                            defaultValue={registro_evento.tipofiesta} 
                            {...register('tipofiesta')}>
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
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Clasificación</Text>                        
                        <select  
                            defaultValue={registro_evento.clasificacion} 
                            {...register('clasificacion')}>
                            <option value="Sin clasificar">Sin clasificar</option>
                            <option value="Privado libre">Privado libre</option>
                            <option value="Privado pago">Privado pago</option>                            
                            <option value="Público libre">Público libre</option>
                            <option value="Público pago">público pago</option>                     
                        </select>
                    </View>
                    <View style={styles.elemItem}>                     
                        <Text lines='1' style={styles.titulo}>Flyer</Text>                        
                        <input  
                        type="file"
                        name="file"
                        accept="image/jpg"                        
                        {...register('file')}                       
                        onChange={handleFileChange}
                    
                        
                        
                        />
                        {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
                        
                    </View> 
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Facebook</Text> 
                        <input 
                            defaultValue={registro_evento.facebook} 
                        type="text" {...register('facebook')}></input> 
                    </View>
                    <View style={styles.elemItem}>
                        <Text lines='1' style={styles.titulo}>Twitter</Text> 
                        <input 
                        defaultValue={registro_evento.twitter} 
                        type="text" {...register('twitter')}></input> 
                    </View>                                          
                    <View style={{justifyContent: 'flex-end'}}>
                        <Text lines='1' style={styles.titulo2}>Activo</Text> 
                        <input 
                            defaultChecked={registro_evento.activo}  
                            type="checkbox" {...register('activo')} />
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