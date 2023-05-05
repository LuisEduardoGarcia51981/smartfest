import {useState} from "react";
import {   View,StyleSheet,ScrollView } from "react-native";
import {useForm,Controller} from "react-hook-form";
import {edadValidator} from './validator.js'
import "../css/styleforms.css"
import DatePicker from "./DatePicker";
import { Box, Button } from "@mui/material";
//import BasicTimePicker from "./BasicTimePicker.jsx";

//import ImagePicker from 'react-native-image-picker';

//import * as ImagePicker from 'react-native-image-picker'
//var ImagePicker = require('react-native-image-picker');

import nuevoEvento from '../hooks/newEvento.js';

const styles=StyleSheet.create({
    error:{
        color:'red',
        fontSize:12,
        marginBottom:20,
        marginTop:-5
    },
    
})
function formatoFecha(fecha, formato) {
    const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
        yyyy: fecha.getFullYear()
    }

    return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
}
function buildFormData(formData, data, parentKey) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
  
      formData.append(parentKey, value);
    }
  }
  
  function jsonToFormData(data) {
    const formData = new FormData();
    
    buildFormData(formData, data);
    
    return formData;
  }
  
export default function Newevento(){
    //const [date, setDate] = useState(new Date())
    const {register,formState:{errors},watch,handleSubmit, control}= useForm({
        defaultValues:{
            titulo:'',            
        }
    });


    


    const [respuesta,setRespuesta]=useState(null)
    let response_status=null;
    const onSubmit= (data)=>{   
    
        let fecha = new Date(data.fecha_evento);
        
        fecha=fecha.toISOString().substring(0,10);        
        data.fecha_evento=fecha;
        console.log(data)            

        var form_data = new FormData();
        form_data.append('titulo', data.titulo);
        form_data.append('descripcion', data.descripcion);
        /*form_data.append(
        "file",  
        data.file[0],
         "/C:/Users/54299/OneDrive/Documentos/chanchurri.jpg");*/
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
        console.log(form_data);
        const fetchEventos=async()=>{    
            const response= await globalThis.fetch('http://192.168.100.4:3003/api/evento', {                
                method: "POST",
                body: form_data
            })           
            response_status=response.status;  
            response_status==200 ? alert("Se guardo exitosamente") : alert("algo paso: ");          
            console.log("aca dentro del async: "+response_status)
            const json=await response.json()
            
                setRespuesta(json)
        }   
        fetchEventos();                
        console.log("aca despues: "+response_status)


// CODIGO NUEVO


//FIN CODIGO NUEVO

    }
    //const incluirTelefono=watch('incluirTelefono')
    return (
        <ScrollView>
            <Box sx={{ p: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>                
                <div>
                    <label>Titulo  {watch('horario_inicio')} </label>                    
                    <input type="text" {...register('titulo',{
                        required:true,
                        minLength:5
                    })}></input>
                    {errors.titulo?.type ==='required' && <span style={styles.error}>El campo titulo es requerido</span>}
                    {errors.titulo?.type ==='maxLength' && <p>El campo nombre debe de tener mas de 5 caracteres</p>}
                </div>
                <div class="two_cols" >
                        <div>
                            <label>Fecha del evento</label>
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
                            <label>Hora del evento</label>                           
                            <input type="text" {...register('horario_inicio',{
                                required:true,                               
                            })}></input>                                                
                                
                        </div>                      
                </div>
                <div>
                    <label>Dirección del evento</label>
                    <input type="text" {...register('direccion',{
                                required:true,                               
                            })}></input> 
                </div>
                <div>
                    <label>Descripción del evento</label>
                    <textarea
                        type="text" 
                        rows="5"
                        placeholder="Escribe una descripción..."
                        name="descripcion"
                        {...register('descripcion',{required: true, maxLength: 1000})}

                    />
                        {errors.descripcion?.type ==='required: true,' && <p>El campo descripcion no puede estar vacio</p>}
                </div>
                <div>
                    <label htmlFor="">Tipo de fiesta</label>
                    <select {...register('tipofiesta')}>
                        <option value="sin clasificar">Sin clasificar</option>
                        <option value="casamiento">Casamiento</option>
                        <option value="Despedida de soltero">Despedida de soltero</option>
                        <option value="electronica">electronica</option>
                        <option value="Baile">Baile</option>
                        <option value="Bingo"electronica>Bingo</option>
                        <option value="Babyshower"electronica>Baby Shower</option>

                    </select>
                </div>
                <div>
                    <label htmlFor="">Clasificación</label>
                    <select {...register('clasificacion')}>
                        <option value="sin clasificar">Sin clasificar</option>
                        <option value="público pago">Público pago</option>
                        <option value="privado">privado</option>
                        <option value="público">público</option>
                        <option value="público pago">público pago</option>                     
                    </select>
                </div>
                <div>
                    <label htmlFor="">Flyer</label>
                    <input  type="file" name="file"
                    {...register('file')}
                    />

                </div>
                    
                
                <div class="two_cols">
                    <label>Activo</label>
                    <input type="checkbox" {...register('activo')} />
                </div>            
                <div class="botones">
                    <input type="submit" value="Guardar"></input>
                    <input type="button" value="Cancelar"></input>
                </div>
                
            </form>
            </Box>
        </ScrollView>
    )
} 