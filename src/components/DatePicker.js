import  React from "react";
import { Controller } from 'react-hook-form';
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import 'dayjs/locale/es';

const DatePicker = React.forwardRef(function DatePicker(props, ref) {
  const {  name,control,format,error,  fecha_evento } = props; 
  return (  
  <Controller
      name={name}
      control={control}
      defaultValue={fecha_evento}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <MuiDatePicker
            className="estilo_datepicker"
            inputFormat={format}
            value={field.value || null}
            onChange={(date) => field.onChange(date)}
            textField={({ error: inputError, ...params }) => (
              <TextField error={error} helperText={error} {...params} />
            )}
          />
        </LocalizationProvider>
      )}
  />
  );
}); 
export default DatePicker;