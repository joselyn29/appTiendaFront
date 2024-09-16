import React, { useState, useEffect } from 'react';
import styles from './css/ofertas.module.css';
import ListarProductos from './listarProductos';

const Kit = () => {
  return (
    <div className={styles.kitOfertas}>
      <div className={styles.alingCenter}>
        <h2>Kits y ofertas</h2>
        <ListarProductos maxProductos={3} />
      </div>
    </div>
  );
};

export default Kit;
