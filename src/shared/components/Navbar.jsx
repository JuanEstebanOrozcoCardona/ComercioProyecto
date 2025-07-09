import { Link } from 'react-router-dom';
import { useNavbarData } from '../hooks/hooks';


function Navbar() {
  const { totalItems, currentUser, handleLogout } = useNavbarData();

  return (
    <nav className="main-navbar">
      <h2 className="navbar-title">VellumProyect</h2>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Inicio</Link>
        <Link to="/productos" className="navbar-link">Productos</Link>
        <Link to="/cart" className="navbar-link">
          Carrito 🛒 ({totalItems})
        </Link>
        {currentUser && (
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        )}
      </div>
      <div className="navbar-auth">
        {currentUser ? (
          <>
            <span className="navbar-link">Hola, {currentUser.nombre}</span>
            <button onClick={handleLogout} className="navbar-link">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
            <Link to="/registro" className="navbar-link">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;