import './App.css';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';

import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { InfoTooltip } from '../InfoTooltip/InfoTooltip';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  ROUTES,
  SHORT_FILM_DURATION,
  CARDS_NUM_TO_ADD,
  DISPLAY_WIDTH,
  CARDS_TO_RENDER,
  RESPONSE_CODES,
  INFO_MESSAGE
} from '../../utils/constants';

import { getAllMovies } from '../../utils/MoviesApi';
import {
  checkToken,
  login,
  registration,
  updateProfile,
  addMovieToSave,
  deleteSaveMovie,
  getSavedMovies,
} from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  let [windowSize, setWindowSize] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuerySavedMov, setSearchQuerySavedMov] = useState('');
  const [shortMoviesChecked, setShortMoviesChecked] = useState(false);
  const [shortMoviesSavedMov, setShortMoviesSavedMov] = useState(false);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [numberCardToAdd, setNumberCardToAdd] = useState(0);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showButtonMore, setShowButtonMore] = useState(null);
  const [infoMessage, setInfoMessage] = useState('');
  const [infoMessageSavedMov, setInfoMessageSavedMov] = useState('');
  const [searchParams, setSearchParams] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [renderSaveMov, setRenderSaveMov] = useState([]);
  const [isAppInited, setAppIsInited] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [disableInput, setDisableInput] = useState(false);

  const initUser = useCallback(async () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const userInfo = await checkToken(token);
        setCurrentUser(userInfo);
        setLoggedIn(true);
      } catch (err) {
        console.log(err);
      }
    }
    setAppIsInited(true);
  }, []);

  useEffect(() => {
    initUser();
  }, [initUser]);

  useEffect(() => {
    if (!loggedIn) return;
    const token = localStorage.getItem('jwt');
    if (token) {
      checkToken(token)
        .then((userInfo) => {
          setCurrentUser(userInfo);
          setLoggedIn(true);
        })
        .catch((err) => {
          setTooltipMessage(`Ошибка проверки токена. Статус ${err.status}`);
        });

      getSavedMovies()
        .then((savedMovies) => {
          setSavedMovies(savedMovies);
          setRenderSaveMov(savedMovies);
        })
        .catch((err) => {
          setTooltipMessage(`Ошибка загрузки фильмов. Статус ${err.status}`);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (
      loggedIn &&
      (location === ROUTES.REGISTER || location === ROUTES.LOGIN)
    ) {
      navigate(ROUTES.MAIN, { replace: true });
    }
  }, [loggedIn, location]);

  const handleRegistration = (name, email, password) => {
    setDisableInput(true);
    registration(name, email, password)
      .then((data) => {
        if (data) {
          handleLogin(email, password);
          setTooltipMessage(`Вы успешно зарегистрировались`);
          setRegistrationMessage('');
        }
      })
      .catch((err) => {
        setRegistrationMessage(err.status);
      })
      .finally(() => {
        setDisableInput(false);
      });
  };

  const handleLogin = (email, password) => {
    setDisableInput(true);
    login(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          navigate(ROUTES.MOVIES, { replace: true });
          if (localStorage.getItem('jwt') !== res.token) {
            localStorage.setItem('jwt', res.token);
          }
          setLoginMessage('');
        }
      })
      .catch((err) => {
        setLoginMessage(err.status);
      })
      .finally(() => {
        setDisableInput(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('shortMovies');
    localStorage.removeItem('foundMovies');
    setWindowSize(null);
    setSearchQuery('');
    setSearchQuerySavedMov('');
    setShortMoviesChecked(false);
    setShortMoviesSavedMov(false);
    setMoviesFiltered([]);
    setInitialMovies([]);
    setNumberCardToAdd(null);
    setMoviesToRender([]);
    setShowPreloader(false);
    setShowButtonMore(null);
    setInfoMessage('');
    setInfoMessageSavedMov('');
    setSearchParams({});
    setRegistrationMessage('');
    setLoginMessage('');
    setProfileMessage('');
    setSavedMovies([]);
    setLoggedIn(false);
    setRenderSaveMov([]);
    setTooltipMessage('');
    setDisableInput(false);
    setTooltipMessage(`До скорой встречи ${currentUser?.name}!`);
    setCurrentUser(null);
    navigate(ROUTES.MAIN, { replace: true });
  };

  const handleUpdateProfile = (name, email) => {
    setDisableInput(true);
    updateProfile(name, email)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setProfileMessage('');
        setTooltipMessage('Данные успешно обновлены');
      })
      .catch((err) => {
        if (err.status === RESPONSE_CODES.UNAUTHORIZED) {
          setTooltipMessage(`Проблема авторизации. Статус ${err.status}`);
        } else {
          setProfileMessage(err.status);
        }
      })
      .finally(() => {
        setDisableInput(false);
      });
  };

  const handleSaveMovie = (movie) => {
    addMovieToSave(movie)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch((err) => {
        if (err.status === RESPONSE_CODES.UNAUTHORIZED) {
          setTooltipMessage(`Проблема авторизации ${err.status}`);
        }
      });
  };

  const handleDeleteMovie = (movie) => {
    // если карточка пришла из movies
    if (!movie._id) {
      const movieToDelete = savedMovies.find((mov) => {
        return mov.movieId === movie.id;
      });
      deleteSaveMovie(movieToDelete._id)
        .then(() => {
          setSavedMovies(
            savedMovies.filter((mov) => {
              return mov._id !== movieToDelete._id;
            })
          );
        })
        .catch((err) => {
          if (err.status === RESPONSE_CODES.UNAUTHORIZED) {
            setTooltipMessage(`Проблема авторизации ${err.status}`);
          }
        });
    } else {
      // если карточка пришла из saved-movies
      deleteSaveMovie(movie._id)
        .then(() => {
          setSavedMovies(
            savedMovies.filter((mov) => {
              return mov._id !== movie._id;
            })
          );
        })
        .catch((err) => {
          if (err.status === RESPONSE_CODES.UNAUTHORIZED) {
            setTooltipMessage(`Проблема авторизации ${err.status}`);
          }
        });
    }
  };

  // ============================================================ //

  // если поиск ничего не нашел, покажем надпись об этом
  const setMessage = (movies) => {
    if (movies.length === 0) {
      setInfoMessage(INFO_MESSAGE.NOTHING_FOUND);
    } else {
      setInfoMessage('');
    }
  };

  // самбит поиска по всем фильмам
  const handleSubmitSearchForm = (searchQuery) => {
    setSearchQuery(searchQuery);
    const moviesFromLocalStorage = localStorage.getItem('movies');
    if (!moviesFromLocalStorage) {
      setDisableInput(true);
      setShowPreloader(true);
      getAllMovies()
        .then((allMovies) => {
          setInitialMovies(allMovies);
          localStorage.setItem('movies', JSON.stringify(allMovies));
        })
        .catch((err) => {
          if (err) {
            setInfoMessage(INFO_MESSAGE.SERVER_ERROR);
          }
        })
        .finally(() => {
          setShowPreloader(false);
          setDisableInput(false);
        });
    } else {
      setShowPreloader(true);
      setInitialMovies(JSON.parse(moviesFromLocalStorage));
    }
  };

  // сабмит поиска по сохр. фильмам
  const handleSubmitSearchSavedMovies = (searchQuery) => {
    setSearchQuerySavedMov(searchQuery);
    setShowPreloader(true);
  };

  // унифицированная функция фильтрации фильмов
  const filterMovies = (allMovies, searchQuery, shortFilmsSelected) => {
    // переведем поисковую фразу в нижний регистр
    const queryLowerCase = searchQuery.toLowerCase();
    const filtered = allMovies.filter((film) => {
      // приведем все названия фильмов к нижнему регистру
      const nameRuLowerCase = film.nameRU.toLowerCase();
      const nameEnLowerCase = film.nameEN.toLowerCase();
      // если найдется ключевая фраза то вернем новый массив
      return shortFilmsSelected === true
        ? (nameEnLowerCase.includes(queryLowerCase) ||
            nameRuLowerCase.includes(queryLowerCase)) &&
            film.duration <= SHORT_FILM_DURATION
        : nameEnLowerCase.includes(queryLowerCase) ||
            nameRuLowerCase.includes(queryLowerCase);
    });
    return filtered;
  };

  // фильтрация сохраненных фильмов
  useEffect(() => {
    const moviesFiltered = filterMovies(
      savedMovies,
      searchQuerySavedMov,
      shortMoviesSavedMov
    );

    if (
      (searchQuerySavedMov || shortMoviesSavedMov) &&
      moviesFiltered.length === 0
    ) {
      setInfoMessageSavedMov(INFO_MESSAGE.NOTHING_FOUND);
    } else {
      setInfoMessageSavedMov('');
    }
    setShowPreloader(false);
    setRenderSaveMov(moviesFiltered);
  }, [searchQuerySavedMov, shortMoviesSavedMov, savedMovies, showPreloader]);

  // загружаем данные с локального хранилища при перезагрузке страницы
  useEffect(() => {
    // const json = localStorage.getItem('searchParams');
    // if (json) {
    //   const searchParams = JSON.parse(json);
    //   setMoviesFiltered(searchParams.movies);
    //   setMessage(searchParams.movies);
    //   setSearchParams({
    //     shortMovies: searchParams.shortMovies,
    //     query: searchParams.searchQuery,
    //   });
    // }
    if (localStorage.getItem('foundMovies')) {
      const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
      setMoviesFiltered(foundMovies);
    }
  }, []);

  // сохраним результат в локальное хранилище
  const saveResultToLocalStorage = (isShortMovies, searchQuery, movies) => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('shortMovies', String(isShortMovies));
    localStorage.setItem('foundMovies', JSON.stringify(movies));
  };

  // фильтрация начальных карточек
  useMemo(() => {
    // if (initialMovies.length === 0 && !searchQuery) return;
    if (!searchQuery) return;
    const moviesFiltered = filterMovies(
      initialMovies,
      searchQuery,
      shortMoviesChecked
    );
    // если фильмы нашлись сохраним их и положим в стейт
    // if (moviesFiltered.length !== 0) {
    //   setMoviesFiltered(moviesFiltered);
    // } else {
    //   setMoviesFiltered([]);
    // }

    setMoviesFiltered(moviesFiltered);
    setShowPreloader(false);
    saveResultToLocalStorage(shortMoviesChecked, searchQuery, moviesFiltered);
    setMessage(moviesFiltered);
  }, [searchQuery, initialMovies, shortMoviesChecked]);

  // узнаем ширину окна
  useEffect(() => {
    // if (moviesFiltered.length === 0) return;

    setWindowSize(window.innerWidth);

    // при резайзе окна обновляем переменную ширины экрана
    const handleChangeWidth = (evt) => {
      const handleTimer = () => {
        setWindowSize(evt.target.outerWidth);
      };
      setTimeout(handleTimer, '500');
    };

    window.addEventListener('resize', handleChangeWidth);

    return () => {
      window.removeEventListener('resize', handleChangeWidth);
    };
  }, []);

  // после определения ширины окна узнаем сколько карточек нужно рендерить
  useEffect(() => {
    const renderMovies = (cardsNumber) => {
      // определим сколько карточек загружать
      const numMoviesDependsToWidth =
        windowSize >= DISPLAY_WIDTH.WIDTH_1200
          ? CARDS_TO_RENDER.WIDTH_1200
          : windowSize >= DISPLAY_WIDTH.WIDTH_768 &&
            windowSize <= DISPLAY_WIDTH.WIDTH_1199
          ? CARDS_TO_RENDER.WIDTH_768PX
          : CARDS_TO_RENDER.WIDTH_480PX;

      // вырезаем необходимый по размеру кусок массива
      // добавим в него поле isMovieSaved. Если в сохраненных фильмах и
      // в текущем фильме id совпали значит он сохранен
      const moviesToRender = moviesFiltered
        .slice(0, numMoviesDependsToWidth + numberCardToAdd)
        .map((movie) => ({
          ...movie,
          isMovieSaved: savedMovies.some((currentMovie) => {
            return currentMovie.movieId === movie.id;
          }),
        }));

      /* если карточек в отфильтрованном массиве больше чем,
        в скопированном куске, значит покажем кнопку "добавить еще"*/
      moviesFiltered.length > moviesToRender.length
        ? setShowButtonMore(true)
        : setShowButtonMore(false);

      // отправляем новый массив на рендеринг
      setMoviesToRender(moviesToRender);
    };

    renderMovies();
    /* в зависимости от ширины экрана устанавливаем количество
    карточек для рендеринга и количество добавляемое кнопкой*/
    // if (windowSize >= 1200) {
    //   setNumberCardToAdd(3);
    //   renderMovies(12);
    // } else if (windowSize >= 768 && windowSize <= 1199) {
    //   setNumberCardToAdd(2);
    //   renderMovies(8);
    // } else {
    //   setNumberCardToAdd(1);
    //   renderMovies(5);
    // }
  }, [windowSize, moviesFiltered, numberCardToAdd, savedMovies]);

  // добавляем карточки по клику на кнопку*
  const loadMoreCards = () => {
    if (windowSize >= DISPLAY_WIDTH.WIDTH_1200) {
      setNumberCardToAdd(numberCardToAdd + CARDS_NUM_TO_ADD.WIDTH_1200);
    } else if (
      windowSize >= DISPLAY_WIDTH.WIDTH_768 &&
      windowSize <= DISPLAY_WIDTH.WIDTH_1199
    ) {
      setNumberCardToAdd(numberCardToAdd + CARDS_NUM_TO_ADD.WIDTH_768PX);
    } else {
      setNumberCardToAdd(numberCardToAdd + CARDS_NUM_TO_ADD.WIDTH_480PX);
    }
    // // узнаем с какого элемента начать копирование
    // const startCopy = moviesToRender.length;
    // // узнаем сколько элементов нужно скопировать
    // const endCopy = startCopy + (windowSize >= 1200 ? 3 : windowSize <= 1199 && windowSize >= 768 ? 2 : 1);
    // // копируем элементы из отфильтрованного массива
    // const moviesAdded = moviesFiltered.slice(startCopy, endCopy);
    // // добавляем лайк и проверяем сохранен ли фильм
    // const checkSaved = moviesAdded.map((movie) => ({
    //   ...movie,
    //   isMovieSaved: savedMovies.some((currentMovie) => {
    //     return currentMovie.movieId === movie.id;
    //   }),
    // }));
    // // объединяем с теми что были ранее и передаем в ренедеринг
    // const newMoviesList = moviesToRender.concat(checkSaved);

    // // отправляем на рендеринг
    // setMoviesToRender(newMoviesList);
    /* если длина массива отфильтрованных фильмов по запросу
     равна длине массива добавляемых карточек убираем кнопку добавить */
    // if (moviesFiltered.length === newMoviesList.length) {
    //   setShowButtonMore(false);
    // }
  };

  if (!isAppInited) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {/* отображаем хедер в случае следующих путей */}
        {(location === ROUTES.MAIN ||
          location === ROUTES.SAVED_MOVIES ||
          location === ROUTES.MOVIES ||
          location === ROUTES.PROFILE) && <Header loggedIn={loggedIn} />}
        <main className="content">
          <Routes>
            <Route path={ROUTES.MAIN} element={<Main />} />
            <Route
              path={ROUTES.MOVIES}
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    moviesToRender={moviesToRender}
                    loadMoreCards={loadMoreCards}
                    showPreloader={showPreloader}
                    showButtonMore={showButtonMore}
                    infoMessage={infoMessage}
                    handleSubmitSearchForm={handleSubmitSearchForm}
                    searchParams={searchParams}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    setShortMoviesChecked={setShortMoviesChecked}
                    disableInput={disableInput}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.SAVED_MOVIES}
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    handleSubmitSearchForm={handleSubmitSearchSavedMovies}
                    setShortMoviesChecked={setShortMoviesSavedMov}
                    moviesToRender={renderSaveMov}
                    infoMessage={infoMessageSavedMov}
                    disableInput={disableInput}
                    showPreloader={showPreloader}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    handleLogout={handleLogout}
                    handleUpdateProfile={handleUpdateProfile}
                    profileMessage={profileMessage}
                    setProfileMessage={setProfileMessage}
                    disableInput={disableInput}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.REGISTER}
              element={
                <Register
                  handleRegistration={handleRegistration}
                  registrationMessage={registrationMessage}
                  setRegistrationMessage={setRegistrationMessage}
                  disableInput={disableInput}
                />
              }
            />
            <Route
              path={ROUTES.LOGIN}
              element={
                <Login
                  handleLogin={handleLogin}
                  loginMessage={loginMessage}
                  setLoginMessage={setLoginMessage}
                  disableInput={disableInput}
                />
              }
            />
            <Route path={ROUTES.NOT_FOUND} element={<PageNotFound />} />
          </Routes>
          {tooltipMessage && (
            <InfoTooltip
              tooltipMessage={tooltipMessage}
              setTooltipMessage={setTooltipMessage}
            />
          )}
        </main>
        {/* отображаем футер в случае следующих путей */}
        {(location === ROUTES.MAIN ||
          location === ROUTES.MOVIES ||
          location === ROUTES.SAVED_MOVIES) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
