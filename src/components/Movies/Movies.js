import './Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { NothingFound } from '../NothingFound/NothingFound';
import cardImage from '../../images/card-image.jpg';

export function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList>
        {/* <Preloader /> */}
        <ul className='movies__card-list'>
          <li className='movies__card-item'>
            <MoviesCard
              link={cardImage}
              alt="карточка с фильмом"
              title="33 слова о дизайне"
              duration="1ч 17м"
            />
          </li>
        </ul>
      </MoviesCardList>
      {/* <NothingFound /> */}
      <div className="movies__button-container">
        <button className="movies__load-button" type='button'>Ещё</button>
      </div>
    </section>
  );
}
