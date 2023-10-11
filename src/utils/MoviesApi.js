import { BASE_URL_MOVIES } from "./constants";

export const getAllMovies = () => {
  return fetch(BASE_URL_MOVIES, sendGetRequest).then(getResponse);
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