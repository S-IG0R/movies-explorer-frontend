import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Logo.css';
import { ROUTES } from '../../utils/constants';

export function Logo() {
  return (
    <Link to={ROUTES.main}>
      <img className="logo" alt="Логотип" src={logo} />
    </Link>
  );
}