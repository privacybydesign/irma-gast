import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    caption: {
      fontWeight: 700,
      fontSize: 16,
    },
    fontFamily: [
      "Montserrat",
      "Karla",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },

  palette: {
    primary: {
      light: "#fff",
      main: "#004C92",
      dark: "#000",
    },
    secondary: {
      main: "#D44454",
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
