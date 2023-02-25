import { useState, useEffect } from 'react';

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
