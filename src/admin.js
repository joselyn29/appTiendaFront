import React, { useState } from 'react';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';
import styles from './css/login.module.css';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Intentando iniciar sesión');
      await login(username, password);
      console.log('Login exitoso');
      if (!error) {
        console.log('Redirigiendo a /add');
        navigate('/add');
      } else {
        console.log('Error de autenticación:', error);
      }
    } catch (err) {
      console.error('Error de autenticación:', err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Acceder</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className={styles.formLabel}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.formControl}
            id="username"
            aria-describedby="usernameHelp"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className={styles.formLabel}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formControl}
            id="password"
            required
          />
        </div>
        <button type="submit" className={styles.btnPrimary}>Acceso</button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default Admin;
