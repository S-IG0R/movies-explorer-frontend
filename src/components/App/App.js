import './App.css';
import { Routes, Route, /*useNavigate,*/ useLocation } from 'react-router-dom';
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
  // const navigate = useNavigate();
  const location = useLocation().pathname;
  const [loggedIn, setLoggedIn] = useState(true);
  let [windowSize, setWindowSize] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortMoviesChecked, setShortMoviesChecked] = useState('');
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [numberCardToAdd, setNumberCardToAdd] = useState(null);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showButtonMore, setShowButtonMore] = useState(null);
  const [infoMessage, setInfoMessage] = useState('');

  // console.log('shortMoviesChecked', shortMoviesChecked);
  // console.log('moviesFiltered', moviesFiltered);
  // console.log('windowSize', windowSize);

  // если логин false переходим на главную страницу
  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate('/', { replace: true });
  //   }
  // }, [loggedIn]);

  // фильтруем запрос по введенной фразе 2 - этап
  useEffect(() => {
    if (initialMovies.length === 0 && !searchQuery) return;
    const queryLowerCase = searchQuery.toLowerCase();
    const moviesFiltered = initialMovies.filter((film) => {
      // приведем все названия к нижнему регистру
      const nameRuLowerCase = film.nameRU.toLowerCase();
      const nameEnLowerCase = film.nameEN.toLowerCase();
      return shortMoviesChecked === true
        ? // если в них найдется ключевая фраза то вернем новый массив
          (nameEnLowerCase.includes(queryLowerCase) ||
            nameRuLowerCase.includes(queryLowerCase)) &&
            film.duration <= 40
        : nameEnLowerCase.includes(queryLowerCase) ||
            nameRuLowerCase.includes(queryLowerCase);
    });

    // если поиск ничего не нашел, покажем надпись об этом
    if (moviesFiltered.length === 0) {
      setInfoMessage('Ничего не найдено');
    } else {
      setInfoMessage('');
    }

    setMoviesFiltered(moviesFiltered);
  }, [initialMovies, shortMoviesChecked]);

  // если инпут поиска валидный делаем запрос фильмов из апи - 1 этап
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

  // узнаем ширину окна 3 -этап
  useEffect(() => {
    if (moviesFiltered.length === 0) return;

    setWindowSize(window.innerWidth);

    // ***при резайзе окна обновляем переменную ширины экрана***
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
    const renderMoviesInitially = (endCopy) => {
      // вырезаем необходимый по размеру кусок массива
      const moviesToRender = moviesFiltered.slice(0, endCopy);
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
      renderMoviesInitially(12);
    } else if (windowSize >= 768 && windowSize <= 1279) {
      setNumberCardToAdd(2);
      renderMoviesInitially(8);
    } else {
      setNumberCardToAdd(1);
      renderMoviesInitially(5);
    }
  }, [windowSize, moviesFiltered]);

  // ****добавляем карточки по клику на кнопку****
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
              />
            }
          />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route
            path="/profile"
            element={<Profile setLoggedIn={setLoggedIn} />}
          />
          <Route path="/signup" element={<Register />} />
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
