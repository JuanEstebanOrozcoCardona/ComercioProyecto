import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {

    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;