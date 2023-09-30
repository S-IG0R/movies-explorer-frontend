import './SavedMovies.css';
import { useLocation } from 'react-router-dom';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Divider } from '../Divider/Divider';
import cardImage from '../../images/card-image.jpg';

export function SavedMovies() {
  const { pathname } = useLocation();
  return (
    <>
      <SearchForm />
      <MoviesCardList>
        <MoviesCard
          link={cardImage}
          alt="карточка"
          title="33 слова о дизайне"
          time="1ч 17м"
        />
        <MoviesCard
          link={cardImage}
          alt="карточка"
          title="33 слова о дизайне"
          time="1ч 17м"
        />
        <MoviesCard
          link={cardImage}
          alt="карточка"
          title="33 слова о дизайне"
          time="1ч 17м"
        />
      </MoviesCardList>
      <Divider />
    </>
  );
}
