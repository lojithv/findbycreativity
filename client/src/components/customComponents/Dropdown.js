import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

const Menutheme = createTheme({
  overrides: {
    // Style sheet name ⚛️
    Menu: {
      // Name of the rule
      paper: {
        // Some CSS
         backgroundColor: '#525252'
      },
    },
  },
});

function OverridesCss() {
  return (
    <ThemeProvider theme={Menutheme}>
      <Menu></Menu>
    </ThemeProvider>
  );
}

export default OverridesCss;