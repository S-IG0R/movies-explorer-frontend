import './SavedMovies.css';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Divider } from '../Divider/Divider';

export function SavedMovies() {
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList>
        
      </MoviesCardList>
      <Divider />
    </section>
  );
}
