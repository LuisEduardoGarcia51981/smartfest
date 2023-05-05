import * as React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import 'dayjs/locale/es';





const DatePicker = React.forwardRef(function DatePicker(props, ref) {
  const { error, label, format, name, control } = props;
  const { field } = useController({ name, control });

  return (
    //</LocalizationProvider><LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={'en-gb'}>         
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <MuiDatePicker          

        className="estilo_datepicker"
        label={label}
        inputFormat={format}
        {...field}
        textField ={({ error: inputError, ...params }) => {
          return <TextField error={error} helperText={error} {...params} />;
        }}
      />
    </LocalizationProvider>
  );
});

export default DatePicker;
