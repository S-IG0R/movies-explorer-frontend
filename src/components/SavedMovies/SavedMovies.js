import './SavedMovies.css';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Divider } from '../Divider/Divider';
import { InfoMessage } from '../InfoMessage/InfoMessage'; 

export function SavedMovies({
  setSearchQuery,
  setShortMoviesChecked,
  handleSubmitSearchForm,
  moviesToRender,
  handleSaveMovie,
  handleDeleteMovie,
  infoMessage,
  disableInput
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        name="search-saved-movies"
        setSearchQuery={setSearchQuery}
        setShortMoviesChecked={setShortMoviesChecked}
        handleSubmitSearchForm={handleSubmitSearchForm}
        searchParams={{}}
        disableInput={disableInput}
      />
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
      {moviesToRender.length === 0 && <InfoMessage message={infoMessage} />}
      <Divider />
    </section>
  );
}
