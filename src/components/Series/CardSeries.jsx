import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSerie } from '../../services/Series';

function CardSeries() {
  const { serieId } = useParams();
  const [serie, setComic] = useState();

  useEffect(() => {
    getSerie(serieId).then((result) => {
      setComic(result.data.results[0]);
    });
  }, [serieId]);

  if (!serie) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="card text-left card-css shadow my-5">
      <div className="row">
        <div className="col-6">
          <img className="card-img-top img-fluid" src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`} height="300px" alt="#" />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h4 className="card-title">{serie.title}</h4>
            <p className="card-text">{serie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSeries;
