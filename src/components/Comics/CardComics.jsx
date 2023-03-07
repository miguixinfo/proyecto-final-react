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
    <div className="card text-left card-css shadow my-5">
      <div className="row">
        <div className="col-6">
          <img className="card-img-top img-fluid" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} height="300px" alt="#" />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h4 className="card-title">{comic.title}</h4>
            <p className="card-text">{comic.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardComics;
