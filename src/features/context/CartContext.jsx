import { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.product;
      const productInCartIndex = state.findIndex(item => item.id === product.id);

      if (productInCartIndex >= 0) {
        // Si el producto ya está, incrementa la cantidad
        const newState = [...state];
        newState[productInCartIndex] = {
          ...newState[productInCartIndex],
          quantity: newState[productInCartIndex].quantity + 1
        };
        return newState;
      }
      
      // Si el producto no está, lo añade con cantidad 1
      return [...state, { ...product, quantity: 1 }];
    }
    case 'DECREASE_QUANTITY': {
        const productId = action.id;
        const productInCartIndex = state.findIndex(item => item.id === productId);

        if (productInCartIndex >= 0) {
            const newState = [...state];
            if (newState[productInCartIndex].quantity > 1) {
                newState[productInCartIndex] = { ...newState[productInCartIndex], quantity: newState[productInCartIndex].quantity - 1 };
                return newState;
            }
            return newState.filter(item => item.id !== productId);
        }
        return state;
    }
    case 'REMOVE_FROM_CART':
      return state.filter(p => p.id !== action.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}