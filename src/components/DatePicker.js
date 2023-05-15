import  React,{useState} from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import 'dayjs/locale/es';
import dayjs, { Dayjs } from 'dayjs';



const DatePicker = React.forwardRef(function DatePicker(props, ref) {
  const {  name,control,format,error,  fecha_evento } = props;
  const { field } = useController({ name, control });  
          
  return (
    //</LocalizationProvider><LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={'en-gb'}>         
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <MuiDatePicker          

        className="estilo_datepicker"                
        defaultValue={fecha_evento}
        inputFormat={format}    
       // value={selectedDate}
        //onChange={(date) => setSelectedDate(date)}             
        {...field}
        textField ={({ error: inputError, ...params }) => {
          return <TextField error={error} helperText={error} {...params} />;
        }}
      />
      
    </LocalizationProvider>
  );
});

export default DatePicker;
