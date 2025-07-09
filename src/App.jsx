import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './features/paginas/HomePage';
import LandingPage from './features/paginas/LandingPage';
import CartPage from './features/paginas/CartPage';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import Login from './features/auth/components/Login';
import Registro from './features/auth/components/Registro';
import ProtectedRoute from './shared/components/ProtectedRoute';
import DashboardPage from './features/dashboard/components/DashboardPage';
import './shared/styles/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<LandingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;