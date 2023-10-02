import './SavedMovies.css';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Divider } from '../Divider/Divider';
import cardImage from '../../images/card-image.jpg';

export function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList>
        <MoviesCard
          link={cardImage}
          alt="карточка"
          title="33 слова о дизайне"
          duration="1ч 17м"
        />
        <MoviesCard
          link={cardImage}
          alt="карточка"
          title="33 слова о дизайне"
          duration="1ч 17м"
        />
        <MoviesCard
          link={cardImage}
          alt="карточка"
          title="33 слова о дизайне"
          duration="1ч 17м"
        />
      </MoviesCardList>
      <Divider />
    </>
  );
}
