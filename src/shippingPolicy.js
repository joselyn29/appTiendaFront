//shippingPolicy.js
import React from 'react';
import styles from './css/shippingPolicy.module.css';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';

const ShippingPolicy = () => {
  return (
    <div>
      <BarraPrincipal />
      <section id="politica-envios" className={styles.shippingPolicy}>
        <h1 className={styles.titulo}>Política de Envíos</h1>
        <p className={styles.texto}>Ofrecemos envíos seguros a nivel local. A continuación, se detalla nuestra política de envíos.</p>

        <h2 className={styles.subtitulo}>1. Ámbito de Envío</h2>
        <p className={styles.texto}>Realizamos envíos a toda el area metropolitana en un plazo de 1 a 5 días hábiles.</p>

        <h2 className={styles.subtitulo}>2. Costo de Envío</h2>
        <p className={styles.texto}>El costo del envío cuenta con una cuota estandar de $5.000COP.</p>

        <h2 className={styles.subtitulo}>3. Tiempo de Entrega</h2>
        <p className={styles.texto}>El tiempo de entrega puede variar dependiendo de la ubicación y las condiciones del transporte.</p>

        <h2 className={styles.subtitulo}>4. Problemas con el Envío</h2>
        <p className={styles.texto}>Si experimenta problemas con su envío, contáctenos de inmediato para resolver la situación.</p>
      </section>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
