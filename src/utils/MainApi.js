const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL
    : 'http://localhost:3001';

const token = localStorage.getItem('jwt') ?? '';

// регистрация
export const registration = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password, email }),
  }).then(getResponse);
};

// логин
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(getResponse);
};

// проверка токена
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};

// редактирование профиля
export const updateProfile = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  }).then(getResponse);
};

// создание нового фильма
export const addMovieToSave = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image.url,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.image.formats.thumbnail.url,
      movieId: movie.movieId,
    }),
  });
};

const getResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`произошла ошибка: ${res.status}`);
};
