import React, { useState } from 'react';
import { useAuth } from './authContext';
import Formulario from './admin';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      // Aquí podrías redirigir si es necesario
    } catch (err) {
      console.error('Error de autenticación:', err);
    }
  };

  return (
    <div>
      <BarraPrincipal />
      <Formulario
        username={username}
        password={password}
        error={error}
        handleSubmit={handleSubmit}
        setUsername={setUsername} 
        setPassword={setPassword}
      />
      <Footer />
    </div>
  );
};

export default Login;
