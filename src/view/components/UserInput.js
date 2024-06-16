import {FormControl, FormHelperText, Input, InputAdornment, TextField} from "@mui/material";

export const UserInput = ({name, suffix, handleChange, ...props}) =>
  <FormControl variant="standard" sx={{m: 1, mt: 3, width: "100%", margin: 0, marginTop: 0}} {...props} >
    <Input
      autoComplete="off"
      endAdornment={<InputAdornment position="end"><span>{suffix}</span></InputAdornment>}
      onChange={handleChange}
    />
    <FormHelperText>{name}</FormHelperText>
  </FormControl>