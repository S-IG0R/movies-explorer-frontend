import './Register.css';
import { Input } from '../Input/Input';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { PageWithForm } from '../PageWithForm/PageWithForm';
import { useForm } from '../../hooks/useForm';

import { ROUTES, EMAIL_REGEX, NAME_REGEX, RESPONSE_CODES } from '../../utils/constants';
import { useEffect, useState } from 'react';

export function Register({
  handleRegistration,
  registrationMessage,
  setRegistrationMessage,
  disableInput,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const { values, handleChange } = useForm({
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
    password: {
      isValid: '',
      validationMessage: '',
      value: '',
    },
  });

  const onSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(
      values.name.value,
      values.email.value,
      values.password.value
    );
  };

  useEffect(() => {
    setRegistrationMessage('');
  }, [values]);

  useEffect(() => {
    if (registrationMessage === RESPONSE_CODES.CONFLICT) {
      setErrorMessage('Пользователь с таким email уже существует');
    }
    if (registrationMessage === RESPONSE_CODES.BAD_REQUEST) {
      setErrorMessage('При регистрации пользователя произошла ошибка');
    }
    if (registrationMessage === RESPONSE_CODES.SERVER_ERROR) {
      setErrorMessage('500 На сервере произошла ошибка');
    }
    if (registrationMessage === RESPONSE_CODES.NOT_FOUND) {
      setErrorMessage('404 Страница по указанному маршруту не найдена');
    }
    if (!registrationMessage) {
      setErrorMessage('');
    }
  }, [registrationMessage]);

  return (
    <PageWithForm
      title="Добро пожаловать!"
      formName="register-form"
      underButtonText="Уже зарегистрированы?"
      link={ROUTES.LOGIN}
      linkName="Войти"
      onSubmit={onSubmit}
    >
      <div className="register__container">
        <Input
          name="name"
          type="text"
          label="Имя"
          value={values.name.value}
          onChange={handleChange}
          required={true}
          validationMessage={values.name.validationMessage}
          placeholder="Иван Петров"
          pattern={NAME_REGEX}
          disabled={disableInput}
        />
        <Input
          name="email"
          type="email"
          label="E-mail"
          value={values.email.value}
          onChange={handleChange}
          required={true}
          validationMessage={values.email.validationMessage}
          placeholder="example@example.com"
          pattern={EMAIL_REGEX}
          disabled={disableInput}
        />
        <Input
          name="password"
          type="password"
          label="Пароль"
          value={values.password.value}
          onChange={handleChange}
          required={true}
          validationMessage={values.password.validationMessage}
          minLength="8"
          maxLength="30"
          placeholder="Мин. длина 8 символов"
          disabled={disableInput}
        />
        {registrationMessage && (
          <span className="register__error">{errorMessage}</span>
        )}
      </div>
      <SubmitButton
        title="Зарегистрироваться"
        disabled={
          values.name.isValid && values.email.isValid && values.password.isValid
        }
      />
    </PageWithForm>
  );
}
