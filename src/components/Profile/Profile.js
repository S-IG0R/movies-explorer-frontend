import './Profile.css';
import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  EMAIL_REGEX,
  NAME_REGEX,
  NAME_HINT,
  EMAIL_HINT,
} from '../../utils/constants';

export function Profile({
  handleUpdateProfile,
  handleLogout,
  profileMessage,
  setProfileMessage,
  disableInput
}) {
  const [errorMessage, setErrorMessage] = useState('');

  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: {
      isValid: '',
      validationMessage: '',
      value: '',
    },
    email: {
      isValid: '',
      validationMessage: '',
      value: '',
    },
  });

  useEffect(() => {
    setValues({
      name: {
        value: currentUser?.name ?? '',
      },
      email: {
        value: currentUser?.email ?? '',
      },
    });
  }, [currentUser]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateProfile(values.name.value, values.email.value);
  };

  const onLogout = () => {
    handleLogout();
  };

  useEffect(() => {
    if (profileMessage === 409) {
      setErrorMessage('Пользователь с таким email уже существует');
    }
    if (profileMessage === 400) {
      setErrorMessage('При обновлении профиля произошла ошибка.');
    }
    if (profileMessage === 500) {
      setErrorMessage('500 На сервере произошла ошибка.');
    }
    if (profileMessage === 404) {
      setErrorMessage('404 Страница по указанному маршруту не найдена.');
    }
    if (!profileMessage) {
      setErrorMessage('');
    }
  }, [profileMessage]);

  useEffect(() => {
    setProfileMessage('');
  }, [values]);

  return (
    <section className="profile">
      <h1 className="profile__name">{`Привет, ${currentUser?.name}!`}</h1>
      <form
        className="profile__form"
        name="profile-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="profile__input-label">
          Имя
          <input
            className={`profile__input ${
              values.name.validationMessage && 'profile__input_error'
            }`}
            type="text"
            name="name"
            value={values.name.value}
            onChange={handleChange}
            title={NAME_HINT}
            pattern={NAME_REGEX}
            placeholder="Иван Петров"
            disabled={disableInput}
            required
          />
          <span className="profile__input-error">
            {values.name.validationMessage}
          </span>
        </label>
        <label className="profile__input-label">
          E-mail
          <input
            className={`profile__input ${
              values.email.validationMessage && 'profile__input_error'
            }`}
            type="email"
            name="email"
            value={values.email.value}
            onChange={handleChange}
            title={EMAIL_HINT}
            placeholder="example@example.com"
            pattern={EMAIL_REGEX}
            disabled={disableInput}
            required
          />
          <span className="profile__input-error">
            {values.email.validationMessage}
          </span>
        </label>
        <div className="profile__button-container">
          {profileMessage && (
            <span className="profile__error">{errorMessage}</span>
          )}
          <button
            className={`profile__button-edit ${
              values.email.isValid && values.name.isValid
                ? ''
                : 'profile__button-edit_disabled'
            }`}
            type="submit"
            disabled={
              values.email.isValid || values.name.isValid ? false : true
            }
          >
            Редактировать
          </button>
        </div>
      </form>
      <button
        className="profile__button-logout"
        type="button"
        onClick={onLogout}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}
