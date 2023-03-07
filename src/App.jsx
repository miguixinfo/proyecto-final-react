import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Comics from './components/Comics/Comics';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Series from './components/Series/Series';
import Error from './components/Error';
import Characters from './components/Characters/Characters';
import Footer from './components/Footer';
import CardCharacters from './components/Characters/CardCharacters';
import CardComics from './components/Comics/CardComics';
import CardSeries from './components/Series/CardSeries';
// import CardCharacters, { loader as characterLoader } from './components/CardCharacters';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:comicId" element={<CardComics />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/:serieId" element={<CardSeries />} />
        <Route path="characters" element={<Characters />} />
        <Route path="/characters/:characterId" element={<CardCharacters />} />
        <Route path="*" exact element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
