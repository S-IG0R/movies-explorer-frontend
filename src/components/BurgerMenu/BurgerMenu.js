import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import './BurgerMenu.css';

export function BurgerMenu({ isBurgerMenuOpen, setIsBurgerMenuOpen }) {

  // если ширина экрана больше указанной закрываем меню бургер
  useEffect(() => {
    const handleChangeWidth = (evt) => {
      if (evt.target.outerWidth >= 1023) {
        handleClickClose();
      }
    };
    if (isBurgerMenuOpen) {
      window.addEventListener('resize', handleChangeWidth);
    }
    return () => {
      window.removeEventListener('resize', handleChangeWidth);
    };
  }, [isBurgerMenuOpen]);

  const handleClickClose = () => {
    setIsBurgerMenuOpen(false);
  };
  return (
    <nav className={`burger-menu ${isBurgerMenuOpen && 'burger-menu_active'}`}>
      <button className="burger-menu__button-close" type='button' onClick={handleClickClose} />
      <ul className="burger-menu__link-list">
        <li className="burger-menu__link-list-item">
          <NavLink
            onClick={handleClickClose}
            className={({ isActive }) =>
              `${
                isActive
                  ? 'burger-menu__link burger-menu__link_active'
                  : 'burger-menu__link'
              }`
            }
            to={ROUTES.main}
          >
            Главная
          </NavLink>
        </li>
        <li className="burger-menu__link-list-item">
          <NavLink
            onClick={handleClickClose}
            className={({ isActive }) =>
              `${
                isActive
                  ? 'burger-menu__link burger-menu__link_active'
                  : 'burger-menu__link'
              }`
            }
            to={ROUTES.movies}
          >
            Фильмы
          </NavLink>
        </li>
        <li className="burger-menu__link-list-item">
          <NavLink
            onClick={handleClickClose}
            className={({ isActive }) =>
              `${
                isActive
                  ? 'burger-menu__link burger-menu__link_active'
                  : 'burger-menu__link'
              }`
            }
            to={ROUTES.savedMovies}
          >
            Сохранённые фильмы
          </NavLink>
        </li>
        <li className="burger-menu__link-list-item">
          <Link
            onClick={handleClickClose}
            className="burger-menu__profile-button"
            to={ROUTES.profile}
          >
            Аккаунт
          </Link>
        </li>
      </ul>
    </nav>
  );
}
