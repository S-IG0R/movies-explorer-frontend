import './Profile.css';
import React, { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export function Profile({ setLoggedIn, handleUpdateProfile, handleLogout }) {
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
            minLength="2"
            maxLength="30"
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
            required
          />
          <span className="profile__input-error">
            {values.email.validationMessage}
          </span>
        </label>
        <div className="profile__button-container">
          <span className="profile__error">
            При обновлении профиля произошла ошибка.
          </span>
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
