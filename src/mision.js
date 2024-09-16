import React from 'react';
import styles from './css/mision.module.css'; // Importa los estilos modulares

const ContentSection = ({ title, children }) => (
  <div className={styles.content}>
    <h2 className={styles.tituloMisionVision}>{title}</h2>
    <p className={styles.textoMisionVision}>{children}</p>
  </div>
);

const Mision = () => (
  <div className={styles.misionContainer}>
    <ContentSection title="Misión">
      En Multinaturista y deportivo El Obrero, nos dedicamos a promover el bienestar integral de nuestros clientes mediante la oferta de productos naturales de alta calidad. Nos comprometemos a brindar un servicio personalizado y a fomentar un estilo de vida saludable a través de soluciones naturales que respeten el medio ambiente.
    </ContentSection>
    <ContentSection title="Visión">
      Ser la tienda líder en el sector de productos naturales en Bello, reconocida por nuestra dedicación a la salud y el bienestar de la comunidad. Aspiramos a expandir nuestra influencia, convirtiéndonos en un referente de confianza en productos naturistas, con un enfoque en la sostenibilidad y el compromiso social.
    </ContentSection>
  </div>
);

export default Mision;
