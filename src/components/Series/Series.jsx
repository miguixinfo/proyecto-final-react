import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getSeries } from '../../services/Series';

function Peliculas() {
  const seriesUrl = 'http://gateway.marvel.com/v1/public/series?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getSeries().then((data) => setSeries(data.data.results));
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? series
    : series.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mb-4">
      <div className="row">
        <input type="text" className="form-control mt-4" placeholder="Busca una serie" value={searchTerm} onChange={handleChange} />
        {results.map((item) => (
          <div className="col-3 d-flex flex-wrap">
            <NavLink to={`${item.id}`}>
              <div className="card mt-4 text-center">
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} width="300px" height="300px" alt="#" />
                <h4 className="card-title">{item.title}</h4>
              </div>
            </NavLink>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Peliculas;