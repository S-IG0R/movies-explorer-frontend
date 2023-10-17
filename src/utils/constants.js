export const ROUTES = {
  MAIN: '/',
  MOVIES: '/movies',
  PROFILE: '/profile',
  SAVED_MOVIES: '/saved-movies',
  REGISTER: '/signup',
  LOGIN: '/signin',
  NOT_FOUND: '*',
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

export const SHORT_FILM_DURATION = 40;

export const CARDS_NUM_TO_ADD = {
  WIDTH_1200: 3,
  WIDTH_768PX: 2,
  WIDTH_480PX: 1,
};

export const DISPLAY_WIDTH = {
  WIDTH_1200: 1200,
  WIDTH_1199: 1199,
  WIDTH_768: 768,
  WIDTH_767: 767,
};

export const CARDS_TO_RENDER = {
  WIDTH_1200: 12,
  WIDTH_768PX: 8,
  WIDTH_480PX: 5,
};

export const RESPONSE_CODES = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  CONFLICT: 409
}

export const INFO_MESSAGE = {
  SERVER_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз найдено',
  NOTHING_FOUND: 'Ничего не найдено'
}