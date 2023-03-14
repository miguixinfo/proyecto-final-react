const URL = 'http://gateway.marvel.com/v1/public/series?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

const urlCharacters = 'http://gateway.marvel.com/v1/public/series';
const urlKey = '?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';
export async function getSeries() {
  const respuesta = await fetch(`${URL}`);
  const series = await respuesta.json();
  return series;
}

export async function getSerie(id) {
  const respuesta = await fetch(`${urlCharacters}/${id}${urlKey}`);
  const serie = await respuesta.json();
  return serie;
}

export async function getSeriePag(offset) {
  const response = await fetch(
    `http://gateway.marvel.com/v1/public/series?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9`,
  );
  const { data } = await response.json();
  return data;
}
export async function getSerieBusqueda(offset, searchTerm) {
  const response = await fetch(`http://gateway.marvel.com/v1/public/series?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9&titleStartsWith=${searchTerm}`);
  const { data } = await response.json();
  return data;
}
