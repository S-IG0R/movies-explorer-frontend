import { Logo } from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HeaderNavigation } from '../HeaderNavigation/HeaderNavigation';
import { AccountButton } from '../AccountButton/AccountButton';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { BurgerButton } from '../BurgerButton/BurgerButton';
import { ROUTES } from '../../utils/constants';
import './Header.css';

export function Header({ loggedIn }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  return (
    <header className="header">
      <Logo />
      {!loggedIn && (
        <nav className="header__menu">
          <ul className='header__menu-list'>
            <li className="header__menu-item">
              <Link to={ROUTES.register} className="header__register-link">
                Регистрация
              </Link>
            </li>
            <li className="header__menu-item">
              <Link to={ROUTES.login} className="header__login-button">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {loggedIn && (
        <>
          <HeaderNavigation />
          <AccountButton />
          <BurgerButton setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
          <BurgerMenu
            isBurgerMenuOpen={isBurgerMenuOpen}
            setIsBurgerMenuOpen={setIsBurgerMenuOpen}
          />
        </>
      )}
    </header>
  );
}
