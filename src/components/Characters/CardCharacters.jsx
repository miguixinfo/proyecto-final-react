import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getCharacter } from '../../services/Characters';
import '../../index.css';

function CardCharacters() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState();
  const [comics, setComics] = useState();

  useEffect(() => {
    getCharacter(characterId).then((result) => {
      setCharacter(result.data.results[0]);
      setComics(result.data.results[0].comics.items);
    });
  }, [characterId]);

  if (!character) {
    return <div>Cargando...</div>;
  }

  function sacarIdComic(url) {
    const splited = url.split('/');
    return splited[splited.length - 1];
  }

  return (
    <div className="card text-left card-css shadow my-5">
      <div className="row">
        <div className="col-6">
          <img className="card-img-top img-fluid" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} height="300px" alt="#" />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h4 className="card-title">{character.name}</h4>
            <p className="card-text">{character.description}</p>
            <h4 className="card-title">Comics en los que aparecce el personaje.</h4>
            {comics.map((item) => (
              <NavLink to={`../comics/${sacarIdComic(item.resourceURI)}`}><p>{item.name}</p></NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCharacters;
