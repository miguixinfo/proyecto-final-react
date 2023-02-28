import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Comics from './components/Comics';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Series from './components/Series';
import Error from './components/Error';
import Characters from './components/Characters';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/series" element={<Series />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
