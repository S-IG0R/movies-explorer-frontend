import { Link } from 'react-router-dom';
import { NavTabButton } from '../NavTabButton/NavTabButton';
import './NavTab.css';

export function NavTab() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <NavTabButton title='О проекте' anchor="about"/>
        </li>
        <li className="navigation__list-item">
          <NavTabButton title='Технологии' anchor="tech"/>
        </li>
        <li className="navigation__list-item">
          <NavTabButton title='Студент' anchor="student"/>
        </li>
      </ul>
    </nav>
  );
}
