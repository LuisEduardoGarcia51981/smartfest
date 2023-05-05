import React from "react";
import {StyleSheet, View , Button,TouchableOpacity,Text} from "react-native";
import {Formik, useField} from 'formik'
import StyledTextInput from "./StyledTextInput";
import StyledText from './StyledText.jsx'
import { loginValidationSchema } from "../validationSchemas/login";

const initialValue={
    email:'',
    password:''
}
const styles=StyleSheet.create({
    error:{
        color:'red',
        fontSize:10,
        marginBottom:20,
        marginTop:-5
    },
    form:{
        margin:12,
    },
    form_group: {        
        marginBottom:10,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:5,
        borderColor:'rgb(153, 153, 153)',  
        width: 10000                 
      },
      datePicker: {
        width: '10000'
      }
})
const FormikInputValue=({name,...props})=>{
    const [field,meta,helpers]=useField(name) //devuelve array de 3 posiciones
    return (
        <>
            <StyledTextInput 
                error={meta.error}
                placeholder="email" 
                value={field.value}
                onChangeText={value=>helpers.setValue(value)}
                {...props}
            />
            {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
        </>
    )
   
}
/*
const validate =values=>{
    const errors={}
    if (!values.email){
        errors.email='Email es Require'
    }else if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.
    test(values.email)){
        errors.email='Invalid Email adress'
    }
    console.log(errors);
    return errors
}*/

export default function Newevento(){
    return (
    //<Formik validate={validate} initialValues={initialValue} onSubmit=
    <Formik validationSchema={loginValidationSchema} initialValues={initialValue} onSubmit=
    {values=>console.log(values)}>
        {/*se hace una render children o render prop:*/}
        {({handleSubmit})=>{
            return (
            <View style={styles.form}> 

                    <label htmlFor="Titulo">Titulo</label>
                    <FormikInputValue 
                        placeholder="Titulo" 
                        name='titulo'                    
                    />

                    <div >
                        <label htmlFor="fecha_evento">Fecha del evento</label>
                        
                    </div>
                    
                    <label htmlFor="horario_inicio">Hora de inicio</label>
                    <FormikInputValue 
                        placeholder="00:00:00" 
                        name='horario_inicio'                    
                    />
              <label htmlFor="descripcion">Descripción</label>
                  <FormikInputValue                         
                        name='descripcion'  
                        multiline
                        numberOfLines={3}                   
                    />     

                    
                   
                    
                    <FormikInputValue 
                        placeholder="email" 
                        name='email'                    
                    />
                    <FormikInputValue 
                        placeholder="password" 
                        name='password'
                        secureTextEntry
                    />
                <Button onPress={handleSubmit} title='Log In'/>
            </View>
            )
        }}
    </Formik>
    )
} 