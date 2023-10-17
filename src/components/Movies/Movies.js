import './Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { InfoMessage } from '../InfoMessage/InfoMessage';
import { useEffect, useState } from 'react';

export function Movies({
  moviesToRender,
  loadMoreCards,
  showPreloader,
  showButtonMore,
  infoMessage,
  handleSubmitSearchForm,
  handleSaveMovie,
  handleDeleteMovie,
  setShortMoviesChecked,
  disableInput,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState('');

  const handleClick = () => {
    loadMoreCards();
  };

  useEffect(() => {
    if (localStorage.getItem('searchQuery')) {
      setSearchQuery(localStorage.getItem('searchQuery'));
    }
    if (localStorage.getItem('shortMovies')) {
      setShortMoviesCheckbox(localStorage.getItem('shortMovies'));
    }
  }, []);

  return (
    <section className="movies">
      <SearchForm
        name="search-movies"
        handleSubmitSearchForm={handleSubmitSearchForm}
        setShortMoviesChecked={setShortMoviesChecked}
        disableInput={disableInput}
        searchQuery={searchQuery}
        shortMoviesCheckbox={shortMoviesCheckbox}
      />
      {showPreloader && <Preloader />}
      {moviesToRender.length === 0 || showPreloader ? (
        ''
      ) : (
        <MoviesCardList>
          {moviesToRender.map((movie) => {
            return (
              <MoviesCard
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                movie={movie}
                key={movie.id}
              />
            );
          })}
        </MoviesCardList>
      )}
      {infoMessage && !showPreloader && <InfoMessage message={infoMessage} />}
      {showButtonMore && !showPreloader && (
        <div className="movies__button-container">
          <button
            className="movies__load-button"
            type="button"
            onClick={handleClick}
          >
            Ещё
          </button>
        </div>
      )}
    </section>
  );
}
