import React from "react";
import { createMuiTheme, ThemeProvider as ThemeProviderBase } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#006b64",
    },
    secondary: {
      main: "#004b46",
    },
  },
});

export const ThemeProvider = ({ children }) => (
  <ThemeProviderBase theme={theme}>
    {children}
  </ThemeProviderBase>
);
