import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Comics from './components/Comics';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Peliculas from './components/Peliculas';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/peliculas" element={<Peliculas />} />
      </Routes>
    </>
  );
}

export default App;
