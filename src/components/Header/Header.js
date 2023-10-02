import { Logo } from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HeaderNavigation } from '../HeaderNavigation/HeaderNavigation';
import { AccountButton } from '../AccountButton/AccountButton';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { BurgerButton } from '../BurgerButton/BurgerButton';
import './Header.css';

export function Header({ loggedIn }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  return (
    <header className="header">
      <Logo />
      {!loggedIn && (
        <ul className="header__menu-list">
          <li className="header__menu-item">
            <Link to="/signup" className="header__register-link">
              Регистрация
            </Link>
          </li>
          <li className="header__menu-item">
            <Link to="/signin" className="header__login-button">
              Войти
            </Link>
          </li>
        </ul>
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
