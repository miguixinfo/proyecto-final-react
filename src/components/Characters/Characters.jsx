import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { getCharacters } from '../../services/Characters';
import '../../index.css';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getCharacters().then((personajes) => setCharacters(personajes.data.results));
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // paginacion
  const loadCharacters = async () => {
    const offset = (currentPage - 1) * 20; // 20 characters per page
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9`,
    );
    const { data } = response.data;
    setCharacters(data.results);
    setTotalPages(Math.ceil(data.total / 20));
  };

  useEffect(() => {
    loadCharacters();
  }, [currentPage]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const results = !searchTerm
    ? characters
    : characters.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mb-4">
      <div className="row">
        <input type="text" placeholder="Busca un Personaje" className="form-control mt-4" value={searchTerm} onChange={handleChange} />
        <div className="d-flex justify-content-center align-items-center">
          <button type="button" className="btn btn-danger btn-lg mt-5 mr-5 p-1" onClick={handlePrevClick} disabled={currentPage === 1}>
            Previous
          </button>
          <button type="button" className="btn btn-danger btn-lg mr-5 ml-5 mt-5 p-1" onClick={handleNextClick} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
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
      <div className="d-flex justify-content-center align-items-center">
        <button type="button" className="btn btn-danger btn-lg mt-5 mr-5 p-1" onClick={handlePrevClick} disabled={currentPage === 1}>
          Previous
        </button>
        <button type="button" className="btn btn-danger btn-lg mr-5 ml-5 mt-5 p-1" onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Characters;
