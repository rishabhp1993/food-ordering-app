import { createMuiTheme } from "@material-ui/core/styles";

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#253338",
      main: "#253338",
      dark: "#253338",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ddd",
      main: "#ddd",
      dark: "#ddd",
      contrastText: "#000",
    },
  },
});

export default outerTheme;
