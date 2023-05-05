import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";


const BasicTimePicker= React.forwardRef(function DatePicker(props, ref) {
  const { error, label, format, name, control } = props;
  const { field } = useController({ name, control });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker 
        
          label={label} 
          {...field}
          textField ={({ error: inputError, ...params }) => {
            return <TextField error={error} helperText={error} {...params} />;
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
});

export default BasicTimePicker;
