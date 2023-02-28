import React, { useState, useEffect } from 'react';

function Comics() {
  const comicsUrl = 'http://gateway.marvel.com/v1/public/comics?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

  const [comics, setComics] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const fetchComics = (comicsUrl) => {
    fetch(comicsUrl)
      .then((response) => response.json())
      .then((data) => {
        setComics(data.data.results);
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? comics
    : comics.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    fetchComics(comicsUrl);
  }, []);
  return (
    <div className="container">
      <div className="row">
        <input type="text" placeholder="Busca un comic" className="form-control mt-4" value={searchTerm} onChange={handleChange} />
        {results.map((item) => (
          <div className="col">
            <div className="card mt-4 text-center">
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} width="280px" height="300px" alt="#" />
              <h4 className="card-title">{item.title}</h4>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Comics;
