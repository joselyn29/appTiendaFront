import React from 'react';
import styles from './css/categorias.module.css';

const Categorias = () => {
  const categorias = [
    { src: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823266/alimentos_pbapbd.png", alt: 'Alimentos' },
    { src: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823310/cosmeticos_zbzrsj.png", alt: 'Cosméticos' },
    { src: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823338/esencias_ugxisw.png", alt: 'Esencias' },
    { src: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823382/homeopaticos_mvua0b.png", alt: 'Homeopáticos' },
    { src: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823410/fitoterapeuticos_beseou.png", alt: 'Fitoterapéuticos' },
    { src: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823432/medicamentos_j3h6g9.png", alt: 'Medicamentos' },
    { src: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823463/suplementos_zi0exq.png", alt: 'Suplementos' },
    { src: "https://res.cloudinary.com/dj1cegfhf/image/upload/v1725823486/aromaterapia_tewbkt.png", alt: 'Aromaterapia' }
  ];

  return (
    <div className={styles.principalCategorias}>
      <h2 className={styles.tituloCategoria}>Categorías</h2>
      <div className={styles.categoriasGrid}>
        {categorias.map((categoria, index) => (
          <img key={index} src={categoria.src} alt={categoria.alt} className={`${styles.categoriaImg} img-fluid`} />
        ))}
      </div>
    </div>
  );
};

export default Categorias;
