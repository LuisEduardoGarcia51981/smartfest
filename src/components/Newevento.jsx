import {useContext} from "react";
import { StyleSheet,ScrollView } from "react-native";
import {useForm,Controller} from "react-hook-form";
import {edadValidator} from './validator.js'
import "../css/styleforms.css"
import DatePicker from "./DatePicker";
import { Box, Button } from "@mui/material";
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
  /*
 const validate =values=>{
    const errors={}
    let cadfacebook=values.facebook

    if (cadfacebook.trim() !=''){
        if (/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/.
        test(values.facebook)){
            errors.facebook='Dirección de facebook invalida'
        }
    }
    return errors
}*/
export default function Newevento(){  
    
   
    const {register,formState:{errors},watch,handleSubmit, control}= useForm({
        defaultValues:{
            titulo:'',            
        }
    });
    const {setVermodal}=useContext(Contexto)
    const {setTextomodal}=useContext(Contexto)
    const {setPath_return}=useContext(Contexto)

    const navigation = useNavigation();  
    const cancelarAction=()=>{
        navigation.navigate("Dashboard")   
           
    }
    const resetAction=()=>{        
           
    }
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
    return (                
            <ScrollView>                
                <Box sx={{ p: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>                
                    <div>
                        <label>Nombre del evento</label>                    
                        <input type="text" {...register('titulo',{
                            required:true,
                            minLength:1
                        })}></input>
                        {errors.titulo?.type ==='required' && <span style={styles.error}>El campo titulo es requerido</span>}
                        {errors.titulo?.type ==='minLength' && <p>El campo nombre debe de tener mas de 1 caracter</p>}
                    </div>
                    <div className="two_cols" >
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
                    </div>
                    <div>
                        <label htmlFor="">Clasificación</label>
                        <select {...register('clasificacion')}>
                            <option value="Sin clasificar">Sin clasificar</option>
                            <option value="Privado libre">Privado libre</option>
                            <option value="Privado pago">Privado pago</option>                            
                            <option value="Público libre">Público libre</option>
                            <option value="Público pago">público pago</option>                     
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Flyer</label>
                        <input  type="file" name="file"
                        {...register('file')}
                        />
                    </div>  
                    <div>
                        <label>Facebook</label>
                        <input type="text" {...register('facebook')}></input> 
                    </div>
                    <div>
                        <label>Twitter</label>
                        <input type="text" {...register('twitter')}></input> 
                    </div>                                          
                    <div className="two_cols">
                        <label>Activo</label>
                        <input type="checkbox" {...register('activo')} />
                    </div>            
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