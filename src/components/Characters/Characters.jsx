import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
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
    setCurrentPage(1); // si escribes y borras el termino de busqueda vuelve a la pagina incial
  };

  // paginacion
  const loadCharacters = async () => {
    const offset = (currentPage - 1) * 20; // 20 characters per page
    if (searchTerm === '') {
      const response = await fetch(
        `http://gateway.marvel.com/v1/public/characters?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9`,
      );
      const { data } = await response.json();
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.total / 20));
    } else {
      const response = await fetch(`http://gateway.marvel.com/v1/public/characters?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9&nameStartsWith=${searchTerm}`);
      const { data } = await response.json();
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.total / 20));
    }
  };

  useEffect(() => {
    loadCharacters(searchTerm);
  }, [currentPage, searchTerm]);

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
      {' '}
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={totalPages}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        initialPage={currentPage - 1}
      />

      <div className="div">
        <button type="button" onClick={topFunction} id="topBtn" title="Go to top">
          <i className="fa-regular fa-circle-up" />
        </button>
      </div>
    </div>
  );
}

export default Characters;
