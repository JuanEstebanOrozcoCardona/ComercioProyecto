import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../features/context/CartContext';
import './navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="main-navbar">
      <h2 className="navbar-title">VellumProyect</h2>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Inicio</Link>
        <Link to="/productos" className="navbar-link">Productos</Link>
        <Link to="/cart" className="navbar-link">
          Carrito 🛒 ({cart.length})
        </Link>
      </div>
      <span className="navbar-jewel" title="Joyas decorativas">💍💎✨</span>
    </nav>
  );
}

export default Navbar;