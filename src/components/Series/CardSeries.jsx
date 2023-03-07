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
    <div>
      <h1>{serie.title}</h1>
      <img src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`} height="300px" alt="#" />
      <p>{serie.description}</p>
    </div>
  );
}

export default CardSeries;
