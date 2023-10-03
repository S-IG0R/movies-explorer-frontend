import './HeaderNavigation.css';
import { NavLink } from 'react-router-dom';

export function HeaderNavigation() {
  return (
    <ul className="navigation-bar">
      <li className="navigation-bar__list-item">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `${
              isActive
                ? 'navigation-bar__link navigation-bar__link_active'
                : 'navigation-bar__link'
            }`
          }
        >
          Фильмы
        </NavLink>
      </li>
      <li className="navigation-bar__list-item">
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            `${
              isActive
                ? 'navigation-bar__link navigation-bar__link_active'
                : 'navigation-bar__link'
            }`
          }
        >
          Сохранённые фильмы
        </NavLink>
      </li>
    </ul>
  );
}
