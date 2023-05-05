import {useState} from "react";
import { ScrollView } from "react-native";
import {useForm,Controller} from "react-hook-form";
import {edadValidator} from './validator.js'
import "../css/styleforms.css"
import DatePicker from "./DatePicker";
import { Box, Button } from "@mui/material";

export default function Newevento(){
    const [date, setDate] = useState(new Date())
    const {register,formState:{errors},watch,handleSubmit, control}= useForm({
        defaultValues:{
            titulo:'',            
        }
    });
    const onSubmit= (data)=>{
        console.log(data)
    }
    const incluirTelefono=watch('incluirTelefono')
    return (
        <ScrollView>
            <Box sx={{ p: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>                
                <div>
                    <label>Titulo:  {watch('titulo')} </label>                    
                    <input type="text" {...register('titulo',{
                        required:true,
                        maxLength:5
                    })}></input>
                    {errors.titulo?.type ==='required' && <span>El campo titulo es requerido</span>}
                    {errors.titulo?.type ==='maxLength' && <p>El campo nombre debe de tener menos de 5 caracteres</p>}
                </div>
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
                        required:true
                        })}>
                        
                    </input>
                        {errors.horario_inicio?.type ==='required' && <p>El campo hora de inicio es requerido</p>}
                </div>
                <div>
                    <label>Descripción del evento</label>
                    <textarea
                        type="text" 
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
                    <label>Activo</label>
                    <input type="checkbox" {...register('activo')} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" {...register('email',{
                        pattern:/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
                    })}></input>
                    {errors.email?.type ==='pattern' && <p>El formato del email es incorrecto</p>}
                    {errors.email && <p role="alert">{errors.email?.message}</p>}
                </div>
                <div>
                    <label>Edad</label>
                    <input type="text" {...register('edad',{
                        validate: edadValidator
                    })}></input>
                    {errors.edad && <p>La edad debe estar entre 18 y 65 años</p>}
                </div>
                
                <div>
                    <label>Incluir telefono?</label>
                    <input type="checkbox" {...register('incluirTelefono')} />
                </div>
                {incluirTelefono && (
                    <div>
                        <label>Telefono</label>
                        <input type="text" {...register('telefono')}></input>
                    </div>
                )}
                <div>
                    <label>Fecha de Nacimiento</label>
                    <DatePicker
                        name="fecha_nacimiento"
                        control={control}
                        label="ingrese fecha"
                        format="DD/MM/YYYY"
                        error={errors?.fecha_nacimiento?.message}
                        {...register('fecha_nacimiento')}
                    />
                </div>

                
                <input type="submit" value="Enviar"></input>
            </form>
            </Box>
        </ScrollView>
    )
} 