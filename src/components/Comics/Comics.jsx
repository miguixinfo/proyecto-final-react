import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getComics } from '../../services/Comics';
import '../../index.css';

function Comics() {
  const [comics, setComics] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  // Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line max-len
  /* Esta función se utiliza para recuperar datos de una URL específica con el método fetch. Primero hace una solicitud fetch a la URL especificada, luego toma la respuesta y la convierte en un objeto JSON, luego establece la variable Comics con los resultados del objeto JSON y, por último, captura cualquier error que se produzca durante el proceso. */

  useEffect(() => {
    getComics().then((comic) => setComics(comic.data.results));
  }, []);

  // eslint-disable-next-line max-len
  //  La función handleChange se llama cada vez que se produce un cambio en el campo de búsqueda. Esta función toma el valor del campo de búsqueda y actualiza la variable de búsqueda setSearchTerm con el valor. Esto permite realizar búsquedas específicas en la URL cada vez que se produce un cambio en el campo de búsqueda.
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const loadComics = async () => {
    const offset = (currentPage - 1) * 20; // 20 comicsc per page
    if (searchTerm === '') {
      const response = await fetch(
        `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9`,
      );
      const { data } = await response.json();
      setComics(data.results);
      setTotalPages(Math.ceil(data.total / 20));
    } else {
      const response = await fetch(`http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9&titleStartsWith=${searchTerm}`);
      const { data } = await response.json();
      setComics(data.results);
      setTotalPages(Math.ceil(data.total / 20));
    }
  };

  useEffect(() => {
    loadComics();
  }, [currentPage, searchTerm]);

  function handlePrevClick() {
    setCurrentPage(currentPage - 1);
  }

  function handleNextClick() {
    setCurrentPage(currentPage + 1);
  }
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

  // eslint-disable-next-line max-len
  // Esta linea de código está filtrando una lista de cómics en base a un término de búsqueda. Si el término de búsqueda es nulo (searchTerm es falso), el código devolverá la lista completa de cómics, de lo contrario, devolverá la lista filtrada de cómics donde el título de los cómics contengan el término de búsqueda. El término de búsqueda y los títulos de los cómics están en minúsculas para evitar problemas con mayúsculas y minúsculas.
  const results = !searchTerm
    // Esto dice que si no hay nada en results, devuelve la lista completa de comics
    ? comics
    // Aquí dice que si hay algo devuelve los comics filtrados
    : comics.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Esto es lo que retorna:
  return (
    <div className="container mb-4">
      <div className="row">
        {/* eslint-disable-next-line max-len */}
        {/* A esto le damos con value serchterm, y ponemos que cuando cambie su valor se llame a la función handlechange que cambia el valor de la variable searchTerm */}
        <input type="text" placeholder="Busca un comic" className="form-control mt-4" value={searchTerm} onChange={handleChange} />
        {results.map((item) => (
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex flex-wrap">

            <NavLink to={`${item.id}`} className="d-flex link-css">
              <div className="card shadow mt-4 text-center">

                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} width="300px" height="300px" alt="#" />
                <h4 className="card-title my-3">{item.title}</h4>
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

export default Comics;
