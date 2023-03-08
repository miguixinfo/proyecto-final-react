import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getComic } from '../../services/Comics';

function CardComics() {
  const { comicId } = useParams();
  const [comic, setComic] = useState();
  const [characters, setCharacter] = useState();
  const [series, setSeries] = useState();

  useEffect(() => {
    getComic(comicId).then((result) => {
      setComic(result.data.results[0]);
      setCharacter(result.data.results[0].characters.items);
      setSeries(result.data.results[0].series);
    });
  }, [comicId]);

  if (!comic) {
    return <div>Cargando...</div>;
  }
  function sacarIdCharacter(url) {
    const splited = url.split('/');
    return splited[splited.length - 1];
  }

  return (
    <div className="card text-left card-css shadow my-5">
      <div className="row">
        <div className="col-6">
          <img className="card-img-top img-fluid" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} height="300px" alt="#" />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h4 className="card-title">{comic.title}</h4>
            <p className="card-text">{comic.description}</p>
            <h4 className="card-title">Personajes</h4>
            {characters.map((item) => (
              <NavLink to={`../characters/${sacarIdCharacter(item.resourceURI)}`}><p>{item.name}</p></NavLink>
            ))}
            <h4 className="card-title">Series</h4>
            <NavLink to={`../series/${sacarIdCharacter(series.resourceURI)}`}><p>{series.name}</p></NavLink>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CardComics;
