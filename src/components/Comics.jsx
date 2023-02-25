import React, { useState, useEffect } from 'react';

function Comics() {
  const comicsUrl = 'http://gateway.marvel.com/v1/public/comics?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

  const [comics, setComics] = useState([]);

  const fetchComics = (comicsUrl) => {
    fetch(comicsUrl)
      .then((response) => response.json())
      .then((data) => {
        setComics(data.data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchComics(comicsUrl);
  }, []);
  return (
    <div className="container">
      <div className="row">
        {comics.map((item) => (
          <div className="col">
            <div className="card mt-4 text-center">
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="#" />
              <h4 className="card-title">{item.title}</h4>
              <p className="card-description">{item.description}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Comics;
