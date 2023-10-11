import './App.css';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

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
import { ROUTES } from '../../utils/constants';

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
  const [numberCardToAdd, setNumberCardToAdd] = useState(null);
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
      (location === ROUTES.register || location === ROUTES.login)
    ) {
      navigate(ROUTES.main, { replace: true });
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
          navigate(ROUTES.movies, { replace: true });
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
    localStorage.removeItem('searchParams');
    setInitialMovies([]);
    setMoviesFiltered([]);
    setMoviesToRender([]);
    setSavedMovies([]);
    setSearchQuerySavedMov('');
    setRenderSaveMov([]);
    setSearchQuery('');
    setShortMoviesChecked(false);
    setShortMoviesSavedMov(false);
    setLoggedIn(false);
    setTooltipMessage(`До скорой встречи ${currentUser?.name}!`);
    setCurrentUser(null);
    setDisableInput(false);
    navigate(ROUTES.main, { replace: true });
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
        if (err.status === 401) {
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
        if (err.status === 401) {
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
          if (err.status === 401) {
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
          if (err.status === 401) {
            setTooltipMessage(`Проблема авторизации ${err.status}`);
          }
        });
    }
  };

  // ============================================================ //

  // загружаем данные с локального хранилища при перезагрузке страницы
  useEffect(() => {
    const json = localStorage.getItem('searchParams');
    if (json) {
      const searchParams = JSON.parse(json);
      setMoviesFiltered(searchParams.movies);
      setMessage(searchParams.movies);
      setSearchParams({
        shortMovies: searchParams.shortMovies,
        query: searchParams.searchQuery,
      });
    }
  }, []);

  // если поиск ничего не нашел, покажем надпись об этом
  const setMessage = (movies) => {
    if (movies.length === 0) {
      setInfoMessage('Ничего не найдено');
    } else {
      setInfoMessage('');
    }
  };

  // сохраним результат если он не пустой в локальное хранилище
  const saveResultToLocalStorage = (isShortMovies, searchQuery, movies) => {
    const shortMovies = String(isShortMovies);
    const data = JSON.stringify({
      shortMovies,
      searchQuery,
      movies,
    });
    localStorage.setItem('searchParams', data);
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
            setInfoMessage(
              'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз найдено'
            );
          }
        })
        .finally(() => {
          setShowPreloader(false);
          setDisableInput(false);
        });
    } else {
      setInitialMovies(JSON.parse(moviesFromLocalStorage));
    }
  };

  // сабмит поиска по сохр. фильмам
  const handleSubmitSearchSavedMovies = (searchQuery) => {
    setSearchQuerySavedMov(searchQuery);
  };

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
            film.duration <= 40
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

    if (moviesFiltered.length === 0) {
      setInfoMessageSavedMov('Ничего не найдено');
    } else {
      setInfoMessageSavedMov('');
    }
    
    setRenderSaveMov(moviesFiltered);
  }, [searchQuerySavedMov, shortMoviesSavedMov, savedMovies]);

  // фильтрация начальных карточек
  useEffect(() => {
    if (initialMovies.length === 0 && !searchQuery) return;
    const moviesFiltered = filterMovies(
      initialMovies,
      searchQuery,
      shortMoviesChecked
    );
    // если фильмы нашлись сохраним их и положим в стейт
    if (moviesFiltered.length !== 0) {
      setMoviesFiltered(moviesFiltered);
    } else {
      setMoviesFiltered([]);
    }
    saveResultToLocalStorage(shortMoviesChecked, searchQuery, moviesFiltered);
    setMessage(moviesFiltered);
  }, [searchQuery, initialMovies, shortMoviesChecked]);

  // узнаем ширину окна
  useEffect(() => {
    if (moviesFiltered.length === 0) return;

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
  }, [moviesFiltered]);

  // после определения ширины окна узнаем сколько карточек нужно рендерить
  useEffect(() => {
    const renderMovies = (cardsNumber) => {
      // вырезаем необходимый по размеру кусок массива
      // добавим в него поле isSaved. Если в сохраненных фильмах и
      // в текущем фильме id совпали значит он сохранен
      const moviesToRender = moviesFiltered
        .slice(0, cardsNumber)
        .map((movie) => ({
          ...movie,
          isMovieSaved: savedMovies.some((currentMovie) => {
            return currentMovie.movieId === movie.id;
          }),
        }));

      // отправляем новый массив на рендеринг
      setMoviesToRender(moviesToRender);

      /* если карточек в отфильтрованном массиве больше чем,
        в скопированном куске, значит покажем кнопку "добавить еще"*/
      if (moviesFiltered.length > moviesToRender.length) {
        setShowButtonMore(true);
      } else {
        setShowButtonMore(false);
      }
    };

    /* в зависимости от ширины экрана устанавливаем количество 
    карточек для рендеринга и количество добавляемое кнопкой*/
    if (windowSize >= 1200) {
      setNumberCardToAdd(3);
      renderMovies(12);
    } else if (windowSize >= 768 && windowSize <= 1199) {
      setNumberCardToAdd(2);
      renderMovies(8);
    } else {
      setNumberCardToAdd(1);
      renderMovies(5);
    }
  }, [windowSize, moviesFiltered, savedMovies]);

  // добавляем карточки по клику на кнопку*
  const loadMoreCards = () => {
    // узнаем с какого элемента начать копирование
    const startCopy = moviesToRender.length;
    // узнаем сколько элементов нужно скопировать
    const endCopy = startCopy + numberCardToAdd;
    // копируем элементы из отфильтрованного массива
    const moviesAdded = moviesFiltered.slice(startCopy, endCopy);
    // объединяем с теми что были ранее и передаем в ренедеринг
    const newMoviesList = moviesToRender.concat(moviesAdded);
    // отправляем на рендеринг
    setMoviesToRender(newMoviesList);
    /* если длина массива отфильтрованных фильмов по запросу
     равна длине массива добавляемых карточек убираем кнопку добавить */
    if (moviesFiltered.length === newMoviesList.length) {
      setShowButtonMore(false);
    }
  };

  if (!isAppInited) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {/* отображаем хедер в случае следующих путей */}
        {(location === ROUTES.main ||
          location === ROUTES.savedMovies ||
          location === ROUTES.movies ||
          location === ROUTES.profile) && <Header loggedIn={loggedIn} />}
        <main className="content">
          <Routes>
            <Route path={ROUTES.main} element={<Main />} />
            <Route
              path={ROUTES.movies}
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
              path={ROUTES.savedMovies}
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
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.profile}
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
              path={ROUTES.register}
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
              path={ROUTES.login}
              element={
                <Login
                  handleLogin={handleLogin}
                  loginMessage={loginMessage}
                  setLoginMessage={setLoginMessage}
                  disableInput={disableInput}
                />
              }
            />
            <Route path={ROUTES.notFound} element={<PageNotFound />} />
          </Routes>
          {tooltipMessage && (
            <InfoTooltip
              tooltipMessage={tooltipMessage}
              setTooltipMessage={setTooltipMessage}
            />
          )}
        </main>
        {/* отображаем футер в случае следующих путей */}
        {(location === ROUTES.main ||
          location === ROUTES.movies ||
          location === ROUTES.savedMovies) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
