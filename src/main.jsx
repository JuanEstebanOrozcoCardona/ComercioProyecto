import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './features/context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
  </StrictMode>
);
