import './Login.css';
import { Input } from '../Input/Input';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { PageWithForm } from '../PageWithForm/PageWithForm';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export function Login({ setLoggedIn }) {
  const navigate = useNavigate();

  const onSubmit = (evt) => {
    evt.preventDefault();
    setLoggedIn(true);
    navigate('/movies', { replace: true });
  };

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

  return (
    <PageWithForm
      title="Рады видеть!"
      formName="login-form"
      underButtonText="Ещё не зарегистрированы?"
      link="/signup"
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
        />
        <Input
          name="password"
          type="password"
          label="Пароль"
          value={values.password.value}
          onChange={handleChange}
          required={true}
          validationMessage={values.password.validationMessage}
        />
        <span className="login__error">
          Вы ввели неправильный логин или пароль.
        </span>
      </div>
      <SubmitButton
        title="Войти"
        disabled={values.email.isValid && values.password.isValid}
      />
    </PageWithForm>
  );
}
