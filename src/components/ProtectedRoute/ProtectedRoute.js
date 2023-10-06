import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ children, loggedIn }) => {
  return loggedIn 
    ? children ?? <Outlet /> 
    : <Navigate to='/signin' replace />;
};