import './Profile.css';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  EMAIL_REGEX,
  NAME_REGEX,
  NAME_HINT,
  EMAIL_HINT,
  RESPONSE_CODES,
} from '../../utils/constants';

export function Profile({
  handleUpdateProfile,
  handleLogout,
  profileMessage,
  setProfileMessage,
  disableInput,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState(false);

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

  const onLogout = () => {
    handleLogout();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateProfile(values.name.value, values.email.value);
  };

  useEffect(() => {
    if (!profileMessage) {
      setIsEdit(false);
      setError(false);
    }
    else {
      setError(true);
    }
  }, [currentUser, profileMessage]);

  useEffect(() => {
    setError(false);
    setProfileMessage(' ');
  }, [values]);

  useEffect(() => {
    setIsEdit(false);
    setError(false);
    setProfileMessage('');
  }, []);

  useEffect(() => {
    if (profileMessage === RESPONSE_CODES.CONFLICT) {
      setErrorMessage('Пользователь с таким email уже существует');
    }
    if (profileMessage === RESPONSE_CODES.BAD_REQUEST) {
      setErrorMessage('При обновлении профиля произошла ошибка.');
    }
    if (profileMessage === RESPONSE_CODES.SERVER_ERROR) {
      setErrorMessage('500 На сервере произошла ошибка.');
    }
    if (profileMessage === RESPONSE_CODES.NOT_FOUND) {
      setErrorMessage('404 Страница по указанному маршруту не найдена.');
    }
    if (!profileMessage) {
      setErrorMessage('');
    }
  }, [profileMessage]);

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
            disabled={!isEdit && !disableInput}
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
            disabled={!isEdit && !disableInput}
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
          {!isEdit && (
            <button
              className={`profile__button-edit ${
                values.email.isValid && values.name.isValid
                  ? ''
                  : 'profile__button-edit_disabled'
              }`}
              type="button"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Редактировать
            </button>
          )}
          {isEdit && (
            <SubmitButton
              title="Сохранить"
              classes={{ root: 'button-submit_type_profile ' }}
              disabled={
                !error &&
                ((values.email.value !== currentUser?.email && values.email.isValid) ||
                 (values.name.value !== currentUser?.name && values.name.isValid))
              }
            />
          )}
        </div>
      </form>
      {!isEdit && (
        <button
          className="profile__button-logout"
          type="button"
          onClick={onLogout}
        >
          Выйти из аккаунта
        </button>
      )}
    </section>
  );
}
