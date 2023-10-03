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

import { useState /*useEffect*/ } from 'react';

function App() {
  // const navigate = useNavigate();
  const location = useLocation().pathname;
  const [loggedIn, setLoggedIn] = useState(true);

  // useEffect(() => {
  //   const displayWidth = window.innerWidth;
  //   if (displayWidth > 1280) {
  //     console.log('загрузит 12 карточке');
  //   } else if (displayWidth <= 1280 && displayWidth >= 1023) {
  //     console.log('загрузит 12 карточке');
  //   } else if (displayWidth <= 1024 && displayWidth >= 767) {
  //     console.log('загрузит 8 карточке');
  //   } else {
  //     console.log('загрузит 5 карточке');
  //   }
  // }, []);

  // если логин false переходим на главную страницу
  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate('/', { replace: true });
  //   }
  // }, [loggedIn]);

  // useEffect(() => {
  //   const handleChangeWidth = (evt) => {
  //     if (evt.target.outerWidth >= 767.98) {
  //       setIsOpenMenu(false);
  //     }
  //   };
  //   if (isOpenMenu) {
  //     window.addEventListener('resize', handleChangeWidth);
  //   }
  //   return () => {
  //     window.removeEventListener('resize', handleChangeWidth);
  //   };
  // }, []);
  return (
    <div className="page">
      {/* отображаем хедер в случае следующих путей */}
      {(location === '/' ||
        location === '/movies' ||
        location === '/saved-movies' ||
        location === '/profile') && <Header loggedIn={loggedIn} />}
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
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
