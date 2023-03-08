const URL = 'http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';

const urlCharacters = 'http://gateway.marvel.com/v1/public/characters';
const urlKey = '?&ts=1&apikey=ad6ea905acb56b4f31146d812a2568a1&hash=e666c45f929cb194ce2111c743dc3ff9';
const urlComics = 'http://gateway.marvel.com/v1/public/comics';

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