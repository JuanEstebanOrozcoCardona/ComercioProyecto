import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './features/paginas/HomePage';
import LandingPage from './features/paginas/LandingPage';
import CartPage from './features/paginas/CartPage';
import Navbar from './shared/components/navbar';
import { CartProvider } from './features/context/CartContext';
import Footer from './shared/components/Footer';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <div style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<LandingPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
        <Footer/>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;