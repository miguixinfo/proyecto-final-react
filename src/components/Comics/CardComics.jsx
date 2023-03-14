import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getComic } from '../../services/Comics';

function CardComics() {
  // Esto carga el comicId que habíamos pasado en el NavLink de comics.jsx
  const { comicId } = useParams();
  const [comic, setComic] = useState();
  const [characters, setCharacter] = useState();
  const [series, setSeries] = useState();

  useEffect(() => {
    // Con esta función que tenemos en comics.jsx, le pasamos el comicId.
    getComic(comicId).then((result) => {
      // con setcomics guardo en comics result.data.results, y me sitúo ahí, y de esa forma saco
      // la información del comic para ponerla en el card. Esto lo repito con series y characters
      setComic(result.data.results[0]);
      setCharacter(result.data.results[0].characters.items);
      setSeries(result.data.results[0].series);
    });
  }, [comicId]);

  // Si no encuentra comic pone eso
  if (!comic) {
    return <div>Cargando...</div>;
  }
  // Con esto en la ruta que le pasemos, la trocea, y como el último trozo es la
  // id del character (por eso ponemos el -1), la guardamos para el navlink
  function sacarIdCharacter(url) {
    const splited = url.split('/');
    return splited[splited.length - 1];
  }

  // Aquí simplemente se retorna el comic con sus datos:
  return (
    <div className="card text-left card--css shadow my-5">
      <div className="row">
        <div className="col-6">
          <img className="card-img-top img-fluid" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} height="300px" alt="#" />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h4 className="card-title">{comic.title}</h4>
            <p className="card-text">{comic.description}</p>
            <div className="row">
              <div className="col-6">
                <h4 className="card-title">Personajes</h4>
                {characters.map((item) => (
                  <NavLink to={`../characters/${sacarIdCharacter(item.resourceURI)}`} className="d-flex link-cards"><p>{item.name}</p></NavLink>
                ))}
              </div>
              <div className="col-6">
                <h4 className="card-title">Series</h4>
                <NavLink to={`../series/${sacarIdCharacter(series.resourceURI)}`} className="d-flex link-cards"><p>{series.name}</p></NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardComics;
