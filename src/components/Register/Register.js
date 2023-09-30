import './Register.css';
import { Input } from '../Input/Input';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { PageWithForm } from '../PageWithForm/PageWithForm';

export function Register() {
  return (
    <PageWithForm
      title="Добро пожаловать!"
      formName="register-form"
      underButtonText="Уже зарегистрированы?"
      link="/signin"
      linkName="Войти"
    >
      <Input name="name" type="text" label="Имя" />
      <Input name="email" type="text" label="Email" />
      <Input name="password" type="password" label="Пароль" />
      <SubmitButton title="Зарегистрироваться" />
    </PageWithForm>
  );
}
