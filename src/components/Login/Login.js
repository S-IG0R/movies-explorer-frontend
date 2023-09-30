import './Login.css';
import { Input } from '../Input/Input';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { PageWithForm } from '../PageWithForm/PageWithForm';
import { useNavigate } from 'react-router-dom';

export function Login({ setLoggedIn }) {
  
  const navigate = useNavigate();

  const onSubmit = (evt) => {
      evt.preventDefault();
      setLoggedIn(true);
      navigate('/movies', { replace: true });
  };

  return (
    <PageWithForm
      title="Рады видеть!"
      formName="login-form"
      underButtonText="Ещё не зарегистрированы?"
      link="/signup"
      linkName="Регистрация"
      onSubmit={onSubmit}
    >
      <Input name="email" type="text" label="Email" />
      <Input name="password" type="password" label="Пароль" />
      <SubmitButton title="Войти" />
    </PageWithForm>
  );
}
