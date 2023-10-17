import './Login.css';
import { Input } from '../Input/Input';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { PageWithForm } from '../PageWithForm/PageWithForm';
import { useForm } from '../../hooks/useForm';

import { ROUTES, EMAIL_REGEX, RESPONSE_CODES } from '../../utils/constants';
import { useEffect, useState } from 'react';

export function Login({
  handleLogin,
  loginMessage,
  setLoginMessage,
  disableInput,
}) {
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange } = useForm({
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

  useEffect(() => {
    setLoginMessage('');
  }, [values]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(values.email.value, values.password.value);
  };

  useEffect(() => {
    if (loginMessage === RESPONSE_CODES.UNAUTHORIZED) {
      setErrorMessage('Вы ввели неправильный логин или пароль.');
    }
    if (loginMessage === RESPONSE_CODES.BAD_REQUEST) {
      setErrorMessage('Переданы некорректные данные');
    }
    if (loginMessage === RESPONSE_CODES.SERVER_ERROR) {
      setErrorMessage('500 На сервере произошла ошибка');
    }
    if (loginMessage === RESPONSE_CODES.NOT_FOUND) {
      setErrorMessage('404 Страница по указанному маршруту не найдена');
    }
    if (!loginMessage) setErrorMessage('');
  }, [loginMessage]);

  return (
    <PageWithForm
      title="Рады видеть!"
      formName="login-form"
      underButtonText="Ещё не зарегистрированы?"
      link={ROUTES.REGISTER}
      linkName="Регистрация"
      onSubmit={onSubmit}
    >
      <div className="login__container">
        <Input
          name="email"
          type="email"
          label="E-mail"
          value={values.email.value}
          onChange={handleChange}
          required={true}
          validationMessage={values.email.validationMessage}
          minLength="2"
          maxLength="30"
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
        {loginMessage && <span className="login__error">{errorMessage}</span>}
      </div>
      <SubmitButton
        title="Войти"
        disabled={values.email.isValid && values.password.isValid}
      />
    </PageWithForm>
  );
}
