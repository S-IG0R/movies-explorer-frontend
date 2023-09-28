import './Movies';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export function Movies() {
  return (
    <main>
      <section className="movies">
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList />
      </section>
    </main>
  );
}
