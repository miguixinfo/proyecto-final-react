import React, { useState, useEffect } from 'react';
import { getCharacters } from '../services/Characters';

function Characters() {
  const charactersUrl = 'http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getCharacters((data) => setCharacters(data.data.results));
  }, []);

  const fetchCharacters = (charactersUrl) => {
    fetch(charactersUrl)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.data.results);
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? characters
    : characters.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    fetchCharacters(charactersUrl);
  }, []);
  return (
    <div className="container mb-4">
      <div className="row">
        <input type="text" placeholder="Busca un Personaje" className="form-control mt-4" value={searchTerm} onChange={handleChange} />
        {results.map((item) => (
          <div className="col-3 d-flex flex-wrap">
            <div className="card mt-4 text-center">
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} height="300px" alt="#" />
              <h4 className="card-title">{item.name}</h4>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Characters;
