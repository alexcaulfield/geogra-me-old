import React from 'react';
import './App.css';
import LandingPage from './ui/landing_page'
import { ThemeProvider, theme } from '@chakra-ui/core';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <LandingPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
