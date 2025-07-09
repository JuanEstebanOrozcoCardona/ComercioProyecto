import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // 1. Si no hay ningún usuario logueado, no puede acceder a ninguna ruta protegida.
    //    Lo redirigimos a la página de inicio de sesión.
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== 'admin') {
    // 2. Si el usuario está logueado pero su rol NO es 'admin',
    //    lo redirigimos a la página principal. No tiene permiso.
    return <Navigate to="/" replace />;
  }

  // 3. Si el usuario está logueado y es 'admin', le damos acceso.
  //    <Outlet /> renderizará el componente hijo de la ruta (en este caso, DashboardPage).
  return <Outlet />;
};

export default ProtectedRoute;