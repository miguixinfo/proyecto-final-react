import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { getSeries } from '../../services/Series';
import '../../index.css';

function Series() {
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getSeries().then((data) => setSeries(data.data.results));
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const loadSeries = async () => {
    const offset = (currentPage - 1) * 20; // 20 characters per page
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9`,
    );
    const { data } = response.data;
    setSeries(data.results);
    setTotalPages(Math.ceil(data.total / 20));
  };

  useEffect(() => {
    loadSeries();
  }, [currentPage]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const results = !searchTerm
    ? series
    : series.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mb-4">
      <div className="row">
        <input type="text" className="form-control mt-4" placeholder="Busca una serie" value={searchTerm} onChange={handleChange} />
        <div className="d-flex justify-content-center align-items-center">
          <button type="button" className="btn btn-danger btn-lg mt-5 mr-5 p-1" onClick={handlePrevClick} disabled={currentPage === 1}>
            Previous
          </button>
          <button type="button" className="btn btn-danger btn-lg mr-5 ml-5 mt-5 p-1" onClick={handleNextClick} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        {results.map((item) => (
          <div className="col-3 d-flex flex-wrap">
            <NavLink to={`${item.id}`} className="d-flex link-css">
              <div className="card shadow mt-4 text-center">
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} width="300px" height="300px" alt="#" />
                <h4 className="card-title my-3">{item.title}</h4>
              </div>
            </NavLink>
          </div>
        ))}

      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button type="button" className="btn btn-danger btn-lg mt-5 mr-5 p-1" onClick={handlePrevClick} disabled={currentPage === 1}>
          Previous
        </button>
        <button type="button" className="btn btn-danger btn-lg mr-5 ml-5 mt-5 p-1" onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Series;
