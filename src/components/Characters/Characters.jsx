import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getCharacters } from '../../services/Characters';
import '../../index.css';

function Characters() {
  const charactersUrl = 'http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getCharacters().then((personajes) => setCharacters(personajes.data.results));
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? characters
    : characters.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mb-4">
      <div className="row">
        <input type="text" placeholder="Busca un Personaje" className="form-control mt-4" value={searchTerm} onChange={handleChange} />
        {results.map((item) => (
          <div className="col-3 d-flex flex-wrap">
            <NavLink to={`${item.id}`} className="d-flex link-css">
              <div className="card shadow mt-4 text-center">
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} width="300px" height="300px" alt="#" />
                <h4 className="card-title my-3">{item.name}</h4>
              </div>
            </NavLink>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Characters;
