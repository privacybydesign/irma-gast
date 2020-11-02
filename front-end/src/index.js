import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {Provider} from 'react-redux';
import store from './store';
import './i18n';

const theme = createMuiTheme({
  typography: {
    h6: {
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
      <Provider store={store()}>
        <App />
      </Provider>
    </MuiThemeProvider>
    {/* The various pages will be displayed by the `Main` component. */}
  </BrowserRouter>,
  document.getElementById("root")
);
