import './App.css';

import { registration } from '../../utils/MainApi';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { PageNotFound } from '../PageNotFound/PageNotFound';

import { getAllMovies } from '../../utils/MoviesApi';

import { useState, useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [loggedIn, setLoggedIn] = useState(true);
  let [windowSize, setWindowSize] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortMoviesChecked, setShortMoviesChecked] = useState(false);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [numberCardToAdd, setNumberCardToAdd] = useState(null);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showButtonMore, setShowButtonMore] = useState(null);
  const [infoMessage, setInfoMessage] = useState('');
  const [searchParams, setSearchParams] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState('');

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

  // по сабмиту получаем все фильмы
  const handleSubmitSearchForm = () => {
    setShowPreloader(true);
    getAllMovies()
      .then((allMovies) => {
        setInitialMovies(allMovies);
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
      });
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

  // фильтруем запрос по введенной фразе
  // useEffect(() => {
  //   if (initialMovies.length === 0 && !searchQuery) return;
  //   const queryLowerCase = searchQuery.toLowerCase();
  //   const filtered = initialMovies.filter((film) => {
  //     // приведем все названия к нижнему регистру
  //     const nameRuLowerCase = film.nameRU.toLowerCase();
  //     const nameEnLowerCase = film.nameEN.toLowerCase();
  //     // если найдется ключевая фраза то вернем новый массив
  //     return shortMoviesChecked === true
  //       ? (nameEnLowerCase.includes(queryLowerCase) ||
  //           nameRuLowerCase.includes(queryLowerCase)) &&
  //           film.duration <= 40
  //       : nameEnLowerCase.includes(queryLowerCase) ||
  //           nameRuLowerCase.includes(queryLowerCase);
  //   });

  //   checkSearchResult(filtered);
  //   saveResultToLocalStorage(filtered);
  //   setMoviesFiltered(filtered);
  // }, [shortMoviesChecked, initialMovies, searchQuery]);

  /*
  // если инпут поиска не пустой делаем запрос фильмов из апи - 1 этап
  useEffect(() => {
    if (!searchQuery) return;
    setShowPreloader(true);
    getAllMovies()
      .then((initialMovies) => {
        // запишем в стейт все фильмы
        setInitialMovies(initialMovies);
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
      });
  }, [searchQuery]);
*/

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
      const moviesToRender = moviesFiltered.slice(0, cardsNumber);

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
    if (windowSize >= 1280) {
      setNumberCardToAdd(3);
      renderMovies(12);
    } else if (windowSize >= 768 && windowSize <= 1279) {
      setNumberCardToAdd(2);
      renderMovies(8);
    } else {
      setNumberCardToAdd(1);
      renderMovies(5);
    }
  }, [windowSize, moviesFiltered]);

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


  // ============================================================ //

  const handleRegistration = (name, email, password) => {
    registration(name, email, password)
    .then((data) => {
      if(data) {
        navigate('/signin', { replace: true });
      }
    })
    .catch((err) => {
      console.log(err);
      setRegistrationMessage(err)
    })
  };

  return (
    <div className="page">
      {/* отображаем хедер в случае следующих путей */}
      {(location === '/' ||
        location === '/saved-movies' ||
        location === '/movies' ||
        location === '/profile') && <Header loggedIn={loggedIn} />}
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <Movies
                setSearchQuery={setSearchQuery}
                moviesToRender={moviesToRender}
                setShortMoviesChecked={setShortMoviesChecked}
                loadMoreCards={loadMoreCards}
                showPreloader={showPreloader}
                showButtonMore={showButtonMore}
                infoMessage={infoMessage}
                handleSubmitSearchForm={handleSubmitSearchForm}
                searchParams={searchParams}
              />
            }
          />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route
            path="/profile"
            element={<Profile setLoggedIn={setLoggedIn} />}
          />
          <Route path="/signup" element={<Register handleRegistration={handleRegistration}/>} />
          <Route path="/signin" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      {/* отображаем футер в случае следующих путей */}
      {(location === '/' ||
        location === '/movies' ||
        location === '/saved-movies') && <Footer />}
    </div>
  );
}

export default App;
