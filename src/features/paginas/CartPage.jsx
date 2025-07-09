import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';


function CartPage() {
  const { cart, dispatch } = useContext(CartContext);

  const handleIncrease = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const handleDecrease = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', id });
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="cart-bg">
      <div className="cart-container">
        <h1>🛍️ Tu carrito de compras</h1>
        {cart.length === 0 ? (
          <p>El carrito está vacío. <Link to="/">Explorar productos</Link></p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <span>
                    <strong>{item.title}</strong> - ${item.price.toFixed(2)}
                  </span>
                  <div className="cart-item-controls">
                    <button onClick={() => handleDecrease(item.id)} className="quantity-btn">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item)} className="quantity-btn">+</button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="cart-remove-btn"
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
            <button
              onClick={handleClear}
              className="cart-clear-btn"
            >
              Comprar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;