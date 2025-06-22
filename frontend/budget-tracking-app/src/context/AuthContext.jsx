import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../utils/api';
import { useToast } from '../components/ToastProvider';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (credentials) => {
    try {
      const userData = await loginUser(credentials);
      setUser(userData);
      toast.success('Login successful!');
      navigate('/dashboard/home');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const signup = async (userData) => {
    try {
      await signupUser(userData);
      toast.success('Signup successful! You can now log in.');
      navigate('/auth/login');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    toast.info('You have logged out.');
    navigate('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};