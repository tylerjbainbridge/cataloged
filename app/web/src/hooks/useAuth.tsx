import { useContext } from 'react';
import { AuthContext } from '../components/Auth';

export const useAuth = () => {
  return useContext(AuthContext);
};
