import './Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { InfoMessage } from '../InfoMessage/InfoMessage';

export function Movies({
  setSearchQuery,
  moviesToRender,
  setShortMoviesChecked,
  loadMoreCards,
  showPreloader,
  showButtonMore,
  infoMessage,
  handleSubmitSearchForm,
  searchParams
}) {
  const handleClick = () => {
    loadMoreCards();
  };
  return (
    <section className="movies">
      <SearchForm
        name="search-movies"
        setSearchQuery={setSearchQuery}
        setShortMoviesChecked={setShortMoviesChecked}
        handleSubmitSearchForm={handleSubmitSearchForm}
        searchParams={searchParams}
      />
      {showPreloader && <Preloader />}
      {moviesToRender.length === 0 || showPreloader ? (
        ''
      ) : (
        <MoviesCardList>
          {moviesToRender.map((movie) => {
            return (
              <MoviesCard
                link={`https://api.nomoreparties.co${movie.image.url}`}
                alt={movie.nameRU}
                title={movie.nameRU}
                key={movie.id}
                trailerLink={movie.trailerLink}
                duration={
                  movie.duration >= 60
                    ? `${Math.floor(movie.duration / 60)}ч ${
                        movie.duration % 60
                      }м.`
                    : `${movie.duration}м`
                }
              />
            );
          })}
        </MoviesCardList>
      )}
      { infoMessage && !showPreloader && <InfoMessage message={infoMessage} />}
      { showButtonMore && !showPreloader && (
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
