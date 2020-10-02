import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
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
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
    {/* The various pages will be displayed by the `Main` component. */}
  </BrowserRouter>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <BrowserRouter>
//     {/* <MuiThemeProvider theme={theme}> */}
//     <App />
//     {/* </MuiThemeProvider> */}
//   </BrowserRouter>,
//   document.getElementById("root")
// );
