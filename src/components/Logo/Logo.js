import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Logo.css';

export function Logo() {
  return (
    <Link to="/">
      <img className="logo" alt="Логотип" src={logo} />
    </Link>
  );
}