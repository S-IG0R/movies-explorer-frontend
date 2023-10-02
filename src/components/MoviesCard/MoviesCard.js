import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

export function MoviesCard({ link, alt, title, duration }) {
  const location = useLocation().pathname;
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleDeleteCard = (evt) => {
    evt.target.closest('.card').remove();
  };

  return (
    <figure className="card">
      <div className="card__container">
        {/* если мы в /movies покажем кнопку сохранить */}
        {location === '/movies' ? (
          <button
            className={`card__button-save ${
              !isSaved && `card__button-save_active`
            }`}
            onClick={handleSave}
          >
            Сохранить
          </button>
        ) : (
          ''
        )}
        {/* если мы в /saved-movies покажем кнопку удалить */}
        {location === '/saved-movies' ? (
          <button onClick={handleDeleteCard} className="card__button-remove" />
        ) : (
          ''
        )}
        <div
          className={`card__label-tip ${isSaved && `card__label-tip_active`}`}
        />
        <img className="card__image" src={link} alt={alt} />
      </div>
      <div className="card__data-container">
        <figcaption className="card__title">{title}</figcaption>
        <div className="card__duration-container">
          <p className="card__duration-value">{duration}</p>
        </div>
      </div>
    </figure>
  );
}
