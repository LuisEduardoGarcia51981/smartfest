import * as yup from 'yup'
export const loginValidationSchema= yup.object().shape({
    email:yup
        .string()
        .email()
        .required('Email es obligatorio'),
    password:yup
        .string()
        .min(5,'Muy corto')
        .max(15,'Muy largo')
        .required('El password es obligatorio')

})