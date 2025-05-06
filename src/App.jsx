import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ExchangeRates from './pages/ExchangeRates';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange" element={<ExchangeRates />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;