import { NavLink, Link } from 'react-router-dom';
import './BurgerMenu.css';

export function BurgerMenu({ isBurgerMenuOpen, setIsBurgerMenuOpen }) {
  const handleClickClose = () => {
    setIsBurgerMenuOpen(false);
  };
  return (
    <nav className={`burger-menu ${isBurgerMenuOpen && 'burger-menu_active'}`}>
      <button className="burger__button-close" onClick={handleClickClose} />
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
            to="/"
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
            to="/movies"
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
            to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
        </li>
        <li className="burger-menu__link-list-item">
          <Link
            onClick={handleClickClose}
            className="burger-menu__profile-button"
            to="/profile"
          >
            Аккаунт
          </Link>
        </li>
      </ul>
    </nav>
  );
}
