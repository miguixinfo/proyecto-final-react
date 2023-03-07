import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getComic } from '../../services/Comics';

function CardComics() {
  const { comicId } = useParams();
  const [comic, setComic] = useState();

  useEffect(() => {
    getComic(comicId).then((result) => {
      setComic(result.data.results[0]);
    });
  }, [comicId]);

  if (!comic) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{comic.title}</h1>
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} height="300px" alt="#" />
      <p>{comic.description}</p>
    </div>
  );
}

export default CardComics;
