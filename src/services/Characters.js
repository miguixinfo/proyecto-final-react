const URL = 'http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

const urlCharacters = 'http://gateway.marvel.com/v1/public/characters';
const urlKey = '?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

export async function getCharacters() {
  const respuesta = await fetch(`${URL}`);
  const personas = await respuesta.json();
  return personas;
}

export async function getCharacter(id) {
  const respuesta = await fetch(`${urlCharacters}/${id}${urlKey}`);
  const person = await respuesta.json();
  return person;
}
export async function getComics(url) {
  const respuesta = await fetch(`${url}${urlKey}`);
  const comics = await respuesta.json();
  return comics;
}

export async function getCharacterPag(offset) {
  const response = await fetch(
    `http://gateway.marvel.com/v1/public/characters?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9`,
  );
  const { data } = await response.json();
  return data;
}
export async function getCharacterBusqueda(offset, searchTerm) {
  const response = await fetch(`http://gateway.marvel.com/v1/public/characters?limit=20&offset=${offset}&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9&nameStartsWith=${searchTerm}`);
  const { data } = await response.json();
  return data;
}
