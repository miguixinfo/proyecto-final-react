import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getSerie } from '../../services/Series';

function CardSeries() {
  const { serieId } = useParams();
  const [serie, setSerie] = useState();
  const [comics, setComics] = useState();
  const [characters, setCharacter] = useState();

  useEffect(() => {
    getSerie(serieId).then((result) => {
      setSerie(result.data.results[0]);
      setComics(result.data.results[0].comics.items);
      setCharacter(result.data.results[0].characters.items);
    });
  }, [serieId]);

  if (!serie) {
    return <div>Cargando...</div>;
  }

  function sacarIdCharacter(url) {
    const splited = url.split('/');
    return splited[splited.length - 1];
  }
  return (
    <div className="card text-left card--css shadow my-5">
      <div className="row">
        <div className="col-6">
          <img className="card-img-top img-fluid" src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`} height="300px" alt="#" />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h4 className="card-title">{serie.title}</h4>
            <p className="card-text">{serie.description}</p>
            <div className="row">
              <div className="col-6">
                <h4 className="card-title">Personajes</h4>
                {characters.map((item) => (
                  <NavLink to={`../characters/${sacarIdCharacter(item.resourceURI)}`} className="d-flex link-cards"><p>{item.name}</p></NavLink>
                ))}
              </div>
              <div className="col-6">
                <h4 className="card-title">Comics</h4>
                {comics.map((item) => (
                  <NavLink to={`../comics/${sacarIdCharacter(item.resourceURI)}`} className="d-flex link-cards"><p>{item.name}</p></NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSeries;
