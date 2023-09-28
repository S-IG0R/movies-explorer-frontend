import { useState } from 'react';
import './MoviesCard.css';
export function MoviesCard({ link, alt, title, time }) {

  const [isSaved, setIsSaved] = useState(false)

  function handleCardClick() {
    setIsSaved(!isSaved)
  }

  return (
    <figure className="card">
      <button className="card__button" onClick={handleCardClick}>
        <div className={`card__label ${!isSaved && `card__label_active`}`}>
          Сохранить
        </div>
        <div className={`card__label-tip ${isSaved && `card__label-tip_active`}`} />
        <img className="card__image" src={link} alt={alt} />
      </button>
      <div className="card__data-container">
        <figcaption className="card__title">{title}</figcaption>
        <div className="card__time-container">
          <p className="card__time-value">{time}</p>
        </div>
      </div>
    </figure>
  );
}
