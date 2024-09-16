import React from 'react';
import styles from './css/footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={`${styles.footerSection} footer-logo`}>
          <img src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1726073299/logoTienda_deyf5y.jpg" alt="Multinaturista El Obrero" className={styles.footerLogo} />
        </div>
        <div className={`${styles.footerSection} ${styles.footerInfo}`}>
          <h5>Información</h5>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link href="#">Tips</Link></li>
            <li><Link to="/terminos-condiciones">Términos y condiciones</Link></li>
            <li><Link to="/privacy-policy">Política Datos Personales</Link></li>
            <li><Link to="/shipping-policy">Política de envíos</Link></li>
            <li><Link to="/login">Administrador</Link></li>
          </ul>
        </div>
        <div className={`${styles.footerSection} ${styles.footerCategories}`}>
          <h5>Categorías</h5>
          <ul>
            <li><Link href="#">Alimentos</Link></li>
            <li><Link href="#">Aromaterapia</Link></li>
            <li><Link href="#">Cosméticos naturales</Link></li>
            <li><Link href="#">Esencias florales</Link></li>
            <li><Link href="#">Fitoterapéuticos</Link></li>
            <li><Link href="#">Homeopáticos</Link></li>
            <li><Link href="#">Kit</Link></li>
            <li><Link href="#">Medicamentos</Link></li>
            <li><Link href="#">Suplementos dietarios</Link></li>
          </ul>
        </div>
        <div className={`${styles.footerSection} ${styles.footerContact}`}>
          <h5>Contacto</h5>
          <p><strong>Oficina principal:</strong><br />Cra. 53 # 33-19. Barrio San jose Obrero - Bello</p>
          <p><strong>Teléfono:</strong><br /><img src='https://res.cloudinary.com/dj1cegfhf/image/upload/v1725740887/wppIcon_y8ssuz.png' className={`${styles.wppIcon} img-fluid`} alt="IconoWpp" /> 3103351575</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
