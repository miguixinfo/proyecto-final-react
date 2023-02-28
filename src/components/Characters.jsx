import React, { useState, useEffect } from 'react';

function Characters() {
  const charactersUrl = 'http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

  const [characters, setCharacters] = useState([]);

  const fetchCharacters = (charactersUrl) => {
    fetch(charactersUrl)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCharacters(charactersUrl);
  }, []);
  return (
    <div className="container">
      <div className="row">
        {characters.map((item) => (
          <div className="col">
            <div className="card mt-4 text-center">
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} width="280px" height="300px" alt="#" />
              <h4 className="card-title">{item.name}</h4>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Characters;
