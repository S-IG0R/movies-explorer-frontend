import './Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import cardImage from '../../images/card-image.jpg';

export function Movies() {
  return (
    <main>
      <section className="movies">
        <SearchForm />
        {/* <Preloader /> */}
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
        <div className="movies__button-container">
          <button className="movies__load-button">Ещё</button>
        </div>
      </section>
    </main>
  );
}
