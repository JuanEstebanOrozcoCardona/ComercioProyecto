import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from '../context/CartContext';


function LandingPage() {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error al cargar productos:', err));
  }, []);

  const handleAdd = (product) => {
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
      Swal.fire({
        icon: 'warning',
        title: 'Debes iniciar sesión',
        text: 'Para agregar productos al carrito, primero debes iniciar sesión.',
        showConfirmButton: true,
        confirmButtonText: 'Ir a Iniciar Sesión',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } else {
      dispatch({ type: 'ADD_TO_CART', product });
      Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: `${product.title} ha sido añadido a tu carrito.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="landing-page">
      <h1 className="landing-title">Catálogo de Productos</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button onClick={() => handleAdd(product)} className="add-cart-btn">
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
