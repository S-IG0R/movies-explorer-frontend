export const ROUTES = {
  main: '/',
  movies: '/movies',
  profile: '/profile',
  savedMovies: '/saved-movies',
  register: '/signup',
  login: '/signin',
  notFound: '*',
};

export const EMAIL_REGEX = '[a-z0-9_\\-.]+@+[.?a-z0-9\\-]+\\.{1}[a-z]{2,}';
export const EMAIL_HINT =
  'Почта должен быть следующего вида example@example.com';
export const NAME_REGEX = '[\\-a-zA-Zа-яёА-ЯЁ ]{2,30}';
export const NAME_HINT =
  'Имя может содержать кириллицу, латиницу, пробел и дефис';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL
    : 'http://localhost:3001';

export const BASE_URL_MOVIES = 'https://api.nomoreparties.co/beatfilm-movies';
