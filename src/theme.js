import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { lightBlue } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: 'Noto Sans KR',
    allVariants: {
      color: "#1D1C1D"
    }
  }
});