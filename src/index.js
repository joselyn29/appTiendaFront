import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Archivo de estilos globales
import App from './App'; // Componente principal de la aplicación
import reportWebVitals from './reportWebVitals'; // (Opcional) Métricas de rendimiento

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si no necesitas medir el rendimiento, puedes eliminar esto.
reportWebVitals();
