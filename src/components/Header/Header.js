import { Link /*useLocation*/ } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <Logo />
      <ul className="header__menu-list">
        <li className="header__menu-item">
          <Link to="/signup" className="header__register-link">
            Регистрация
          </Link>
        </li>
        <li className="header__menu-item">
          <Link to="/signin" className="header__login-button">Войти</Link>
        </li>
      </ul>
    </header>
  );
}
