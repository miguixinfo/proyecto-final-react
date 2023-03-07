const URL = 'http://gateway.marvel.com/v1/public/comics?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

const urlCharacters = 'http://gateway.marvel.com/v1/public/comics';
const urlKey = '?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';
export async function getComics() {
  const respuesta = await fetch(`${URL}`);
  const comics = await respuesta.json();
  return comics;
}

export async function getComic(id) {
  const respuesta = await fetch(`${urlCharacters}/${id}${urlKey}`);
  const comic = await respuesta.json();
  return comic;
}
