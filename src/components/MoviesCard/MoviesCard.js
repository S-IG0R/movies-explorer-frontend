import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

export function MoviesCard({ handleSaveMovie, movie, handleDeleteMovie }) {
  const location = useLocation().pathname;
  const [isSaved, setIsSaved] = useState(false);

  const onSaveMovie = () => {
    handleSaveMovie(movie);
    setIsSaved(!isSaved);
  };

  const onDeleteMovie = () => {
    handleDeleteMovie(movie);
  };

  return (
    <li className="card">
      <div className="card__container">
        {/* если мы в /movies покажем кнопку сохранить */}
        {location === '/movies' ? (
          <button
            className={`card__button-save ${
              !isSaved && `card__button-save_active`
            }`}
            onClick={onSaveMovie}
          >
            Сохранить
          </button>
        ) : (
          ''
        )}
        {/* если мы в /saved-movies покажем кнопку удалить */}
        {location === '/saved-movies' ? (
          <button onClick={onDeleteMovie} className="card__button-remove" />
        ) : (
          ''
        )}
        <div
          className={`card__label-tip ${isSaved && `card__label-tip_active`}`}
        />
        <a
          className="card__link"
          href={movie.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="card__image"
            src={`https://api.nomoreparties.co${movie.image.url}`}
            alt={movie.title}
          />
        </a>
      </div>
      <div className="card__data-container">
        <p className="card__title">{movie.title}</p>
        <div className="card__duration-container">
          <p className="card__duration-value">
            {movie.duration >= 60
              ? `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м.`
              : `${movie.duration}м`}
          </p>
        </div>
      </div>
    </li>
  );
}
