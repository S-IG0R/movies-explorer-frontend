import './AccountButton.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export function AccountButton() {
  return (
    <Link to={ROUTES.PROFILE} className="account-button">
      Аккаунт
    </Link>
  );
}
