import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../lib/axios';
import { User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  username: string;
}

export function useAuth() {
  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post('/auth/login', credentials);
      localStorage.setItem('token', data.token);
      return data.user;
    },
  });

  const register = useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data } = await api.post('/auth/register', credentials);
      localStorage.setItem('token', data.token);
      return data.user;
    },
  });

  const profile = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/auth/profile');
      return data;
    },
    enabled: !!localStorage.getItem('token'),
  });

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return {
    login,
    register,
    profile,
    logout,
  };
}