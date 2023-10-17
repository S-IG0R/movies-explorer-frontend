import './MoviesCardList.css';

export function MoviesCardList({ children }) {
  return (
    <section className="cards">
      <ul className='cards__list'>{children}</ul>
    </section>
  );
}
