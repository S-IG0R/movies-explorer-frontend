const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getAllMovies = () => {
  return fetch(BASE_URL, sendGetRequest).then(getResponse);
};

const sendGetRequest = () => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

const getResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Произошла ошибка: ${res.status}`);
}