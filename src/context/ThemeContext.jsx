// src/context/ThemeContext.js
import React, { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
