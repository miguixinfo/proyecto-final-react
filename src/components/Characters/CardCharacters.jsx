import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacter } from '../../services/Characters';

function CardCharacters() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState();

  useEffect(() => {
    getCharacter(characterId).then((result) => {
      setCharacter(result.data.results[0]);
    });
  }, [characterId]);

  if (!character) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} height="300px" alt="#" />
      <p>{character.description}</p>
    </div>
  );
}

export default CardCharacters;
