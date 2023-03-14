import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getComics, getComicPag, getComicBusqueda } from '../../services/Comics';
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

  // eslint-disable-next-line max-len
  //  Esta función toma en cuenta la página actual (currentPage) y la cadena de búsqueda (searchTerm) y carga un máximo de 20 cómics por página.

  const loadComics = async () => {
    // eslint-disable-next-line max-len
    // Primero, la función calcula el valor offset, que es la cantidad de cómics que deben omitirse para la página actual.
    const offset = (currentPage - 1) * 20; // 20 comicsc por page
    // Si el término de búsqueda está vacío usa este fetch que muestra todos los comics
    if (searchTerm === '') {
      getComicPag(offset).then((result) => {
        // con setcomics guardo en comics result.data.results, y me sitúo ahí, y de esa forma saco
        // la información del comic para ponerla en el card. Esto lo repito con series y characters
        setComics(result.results);
        // eslint-disable-next-line max-len
        // Esto es para saber el total de páginas dividiendo el total de los comics entre 20 que son los que vamos a mostrar en cada página
        setTotalPages(Math.ceil(result.total / 20));
      });
    } else {
      // eslint-disable-next-line max-len
      // Este es para que cuando en la barra de búsqueda queremos buscar según como empiece el nombre del comic
      getComicBusqueda(offset, searchTerm).then((result) => {
        // con setcomics guardo en comics result.data.results, y me sitúo ahí, y de esa forma saco
        // la información del comic para ponerla en el card. Esto lo repito con series y characters
        setComics(result.results);
        // eslint-disable-next-line max-len
        // Esto es para saber el total de páginas dividiendo el total de los comics entre 20 que son los que vamos a mostrar en cada página
        setTotalPages(Math.ceil(result.total / 20));
      });
    }
  };

  // eslint-disable-next-line max-len
  /* Estas funciones son para que cuando dlickemos en el botón de next o de previous te añada o te reste uno al currentPage, esto nos sirve para la paginación, porque mostramos de 20 en 20 y depende de la página en la que estemos muestra unos personajes u otros. */
  useEffect(() => {
    loadComics();
  }, [currentPage, searchTerm]);

  function handlePrevClick() {
    setCurrentPage(currentPage - 1);
  }

  function handleNextClick() {
    setCurrentPage(currentPage + 1);
  }

  // eslint-disable-next-line max-len
  /* Esto es para que si deslizas más de 20 px aparece un botón que si clickas te lleva arriba del todo de la página en la que estés */
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

  // eslint-disable-next-line max-len
  // Funcion para poner dos (o mas) funciones a la vez en el onClick de Next, cuando pinches en next, te vuelve arriba del todo también.
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
        {/* Esto es para recorrer el array de comics */}
        {results.map((item) => (
          <div className="col-3 d-flex flex-wrap">
            {/* Esto te lleva a la ruta comics/:comicsId, y te carga el card de ese
            comic que está en el cardComics.jsx, además ese item id lo guarda y con
            el use params lo volvemos a reutilizar en el cardCharacters */}
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
          {/* Cuando la página sea la primera el boton previous se desactiva */}
          <button type="button" className="btn text-light btn-block paginacion--btn my-5" onClick={hacerTodoPrevious} disabled={currentPage === 1}>
            Previous
          </button>
          {/* Cuando la página sea la útima el boton next se desactiva */}
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
