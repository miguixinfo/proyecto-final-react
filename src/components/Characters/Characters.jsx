import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getCharacters, getCharacterBusqueda, getCharacterPag } from '../../services/Characters';
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
    setCurrentPage(1); // si escribes y borras el termino de busqueda vuelve a la pagina incial
  };

  // paginacion
  const loadCharacters = async () => {
    const offset = (currentPage - 1) * 20; // 20 characters per page
    if (searchTerm === '') {
      getCharacterPag(offset).then((result) => {
        setCharacters(result.results);
        setTotalPages(Math.ceil(result.total / 20));
      });
    } else {
      getCharacterBusqueda(offset, searchTerm).then((result) => {
        setCharacters(result.results);
        setTotalPages(Math.ceil(result.total / 20));
      });
    }
  };

  useEffect(() => {
    loadCharacters(searchTerm);
  }, [currentPage, searchTerm]);

  function handlePrevClick() {
    setCurrentPage(currentPage - 1);
  }

  function handleNextClick() {
    setCurrentPage(currentPage + 1);
  }
  const results = !searchTerm
    ? characters
    : characters.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const topButton = document.getElementById('topBtn');

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.style.display = 'block';
    } else {
      topButton.style.display = 'none';
    }
  }

  // Cuando el usuario baja 20px en el document, se muestra el boton 'topBtn'
  window.onscroll = function f() { scrollFunction(); };

  // Funcion scroll al inicio del documento
  function topFunction() {
    document.documentElement.scrollTop = 0;
  }

  // Funcion para poner dos (o mas) funciones a la vez en el onClick de Next
  function hacerTodoNext() {
    handleNextClick();
    topFunction();
  }

  // Funcion (igual a la anterior) pero para Previous
  function hacerTodoPrevious() {
    handlePrevClick();
    topFunction();
  }
  return (
    <div className="container mb-4">
      <div className="row">
        <input type="text" placeholder="Busca un Personaje" className="form-control mt-4" value={searchTerm} onChange={handleChange} />
        {results.map((item) => (
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex flex-wrap justify-content-center">
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
        <div className="btn-group">
          <button type="button" className="btn text-light btn-block paginacion--btn my-5" onClick={hacerTodoPrevious} disabled={currentPage === 1}>
            Previous
          </button>
          <button type="button" className="btn text-light btn-block paginacion--btn my-5" onClick={hacerTodoNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <div className="div">
        <button type="button" onClick={topFunction} id="topBtn" title="Go to top">
          <i className="fa-regular fa-circle-up" />
        </button>
      </div>
    </div>
  );
}

export default Characters;
