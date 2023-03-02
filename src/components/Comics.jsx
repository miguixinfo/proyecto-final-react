import React, { useState, useEffect } from 'react';

function Comics() {
  const comicsUrl = 'http://gateway.marvel.com/v1/public/comics?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

  const [comics, setComics] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  // eslint-disable-next-line max-len
  /* Esta función se utiliza para recuperar datos de una URL específica con el método fetch. Primero hace una solicitud fetch a la URL especificada, luego toma la respuesta y la convierte en un objeto JSON, luego establece la variable Comics con los resultados del objeto JSON y, por último, captura cualquier error que se produzca durante el proceso. */
  const fetchComics = (comicsUrl) => {
    fetch(comicsUrl)
    // Convierte la respuesta en un json
      .then((response) => response.json())
      .then((data) => {
        // Aquí cambia el estado de comics con los resultados del json
        setComics(data.data.results);
      })
      .catch((error) => console.log(error));
  };

  // eslint-disable-next-line max-len
  //  La función handleChange se llama cada vez que se produce un cambio en el campo de búsqueda. Esta función toma el valor del campo de búsqueda y actualiza la variable de búsqueda setSearchTerm con el valor. Esto permite realizar búsquedas específicas en la URL cada vez que se produce un cambio en el campo de búsqueda.
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // eslint-disable-next-line max-len
  // Esta linea de código está filtrando una lista de cómics en base a un término de búsqueda. Si el término de búsqueda es nulo (searchTerm es falso), el código devolverá la lista completa de cómics, de lo contrario, devolverá la lista filtrada de cómics donde el título de los cómics contengan el término de búsqueda. El término de búsqueda y los títulos de los cómics están en minúsculas para evitar problemas con mayúsculas y minúsculas.
  const results = !searchTerm
  // Esto dice que si no hay nada en results, devuelve la lista completa de comics
    ? comics
    // Aquí dice que si hay algo devuelve los comics filtrados
    : comics.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Con esto se hacen las consultas
  useEffect(() => {
    fetchComics(comicsUrl);
  }, []);
  // Esto es lo que retorna:
  return (
    <div className="container mb-4">
      <div className="row">
        {/* eslint-disable-next-line max-len */}
        {/* A esto le damos con value serchterm, y ponemos que cuando cambie su valor se llame a la función handlechange que cambia el valor de la variable searchTerm */}
        <input type="text" placeholder="Busca un comic" className="form-control mt-4" value={searchTerm} onChange={handleChange} />
        {results.map((item) => (
          <div className="col-3 d-flex flex-wrap">
            <div className="card mt-4 text-center">
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} width="300px" height="300px" alt="#" />
              <h4 className="card-title">{item.title}</h4>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Comics;
