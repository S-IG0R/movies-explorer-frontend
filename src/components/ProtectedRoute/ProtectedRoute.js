import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export const ProtectedRoute = ({ loggedIn, children }) => {
  return loggedIn ? children ?? <Outlet /> : <Navigate to={ROUTES.MAIN} replace />;
};
