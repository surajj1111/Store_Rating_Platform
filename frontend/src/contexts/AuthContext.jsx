import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('srp_token'));

  useEffect(() => {
    const storedUser = localStorage.getItem('srp_user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login = (session) => {
    setUser(session.user);
    setToken(session.token);
    localStorage.setItem('srp_token', session.token);
    localStorage.setItem('srp_user', JSON.stringify(session.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('srp_token');
    localStorage.removeItem('srp_user');
  };

  const updateUser = (data) => {
    setUser(data);
    localStorage.setItem('srp_user', JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export { AuthProvider, useAuth };