import './AccountButton.css';
import { Link } from 'react-router-dom';
export function AccountButton() {
  return (
    <Link to="/profile" className="account-button">
      Аккаунт
    </Link>
  );
}
