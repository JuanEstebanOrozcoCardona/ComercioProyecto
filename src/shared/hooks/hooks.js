import { useContext } from 'react';
import { CartContext } from '../../features/context/CartContext';
import { useAuth } from './useAuth';

export const useNavbarData = () => {
  const { cart } = useContext(CartContext);
  const { currentUser, logout } = useAuth();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const isAdmin = currentUser?.role === 'admin';

  return {
    totalItems,
    currentUser,
    isAdmin,
    handleLogout: logout,
  };
};