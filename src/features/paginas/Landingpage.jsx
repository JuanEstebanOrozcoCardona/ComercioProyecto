import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './LandingPage.css';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error al cargar productos:', err));
  }, []);

  const handleAdd = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  

  return (
    <div className="landing-container">
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
              <button
                onClick={() => handleAdd(product)}
                className="add-cart-btn"
              >
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