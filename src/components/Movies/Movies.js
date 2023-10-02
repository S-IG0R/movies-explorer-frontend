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
        <MoviesCard
          link={cardImage}
          alt="карточка с фильмом"
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
      {/* <NothingFound /> */}
      <div className="movies__button-container">
        <button className="movies__load-button">Ещё</button>
      </div>
    </section>
  );
}
