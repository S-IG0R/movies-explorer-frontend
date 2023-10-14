import './SavedMovies.css';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Divider } from '../Divider/Divider';
import { InfoMessage } from '../InfoMessage/InfoMessage';
import { useState } from 'react';

export function SavedMovies({
  setSearchQuery,
  setShortMoviesChecked,
  handleSubmitSearchForm,
  moviesToRender,
  handleSaveMovie,
  handleDeleteMovie,
  infoMessage,
  disableInput,
  showPreloader,
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        name="search-saved-movies"
        setSearchQuery={setSearchQuery}
        setShortMoviesChecked={setShortMoviesChecked}
        handleSubmitSearchForm={handleSubmitSearchForm}
        disableInput={disableInput}
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
                key={movie.movieId}
              />
            );
          })}
        </MoviesCardList>
      )}
      {InfoMessage && !showPreloader && (
        <InfoMessage message={infoMessage} />
      )}
      <Divider />
    </section>
  );
}
