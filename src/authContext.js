import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
  const [error, setError] = useState(null);

  const inactivityTime = 20 * 60 * 1000; 

  useEffect(() => {
    const handleInactivity = () => {
      logout(); 
    };

    let timer = setTimeout(handleInactivity, inactivityTime);

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleInactivity, inactivityTime);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [inactivityTime]);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.detail || 'Credenciales inválidas'}`);
      }

      const data = await response.json();
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const logout = () => {
    setAccessToken('');
    setRefreshToken('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, error, isAuthenticated: !!accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
