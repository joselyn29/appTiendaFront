import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating';
import styles from './css/detalleProducto.module.css';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';
import { useCart } from './cartContext';
import { getProductosRelacionados } from './api';
import ProductosRecomendados from './productosRecomendados';
import QuantitySelector from './quantity';

const DetalleProducto = () => {
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/productos/${id}/`)
      .then(response => {
        setProducto(response.data);
        setRating(response.data.calificacion_promedio);
        return getProductosRelacionados(id);
      })
      .then(response => {
        console.log('Productos relacionados:', response); // Asegúrate de que esto muestra los datos correctos
        setProductosRelacionados(response); // Establece el estado con los datos obtenidos
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Enviar calificación a la API
    axios.post(`http://127.0.0.1:8000/api/productos/${id}/calificar/`, {
      calificacion: newRating
    }).then(response => {
      console.log('Calificación añadida:', response.data);
      setProducto(prevProducto => ({
        ...prevProducto,
        calificacion_promedio: response.data.calificacion_promedio
      }));
    }).catch(error => {
      console.error('Error al enviar la calificación:', error);
    });
  };

  const handleAddToCart = () => {
    if (producto && cantidad > 0) {
      const productWithQuantity = { ...producto, quantity: cantidad };
      addToCart(productWithQuantity);

      Swal.fire({
        icon: 'success',
        title: '¡Añadido al carrito!',
        text: `Has añadido ${cantidad} ${producto.nombre} al carrito.`,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, selecciona una cantidad válida.',
      });
    }
  };

  const formatPrice = (price) => {
    // Asegurarse de que el precio es un número
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const formatRating = (rating) => {
    const numericRating = parseFloat(rating);
    if (isNaN(numericRating)) {
      return 'No disponible'; // Si la calificación no es válida o es null
    }
    return numericRating.toFixed(1); // Devuelve la calificación formateada con un decimal
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <div>
      <BarraPrincipal />
      <div className={styles.detalleProductoContainer}>
        {/* Columna de la imagen */}
        <div className={styles.columnaImagen}>
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className={styles.imgProducto}
          />
        </div>

        {/* Columna de la información del producto */}
        <div className={styles.columnaInfo}>
          <h2 className={styles.productTitle}>{producto.nombre}</h2>
          <p className={styles.descripcion}>{producto.descripcion}</p>
          <h3 className={`text-success fw-bold ${styles.precio}`}>{formatPrice(producto.precio)}</h3>

          {/* Mostrar la categoría */}
          {producto.categoria && (
            <p className={styles.categoria}>Categoría: {producto.categoria.nombre}</p>
          )}

          {/* Calificación */}
          <div className={styles.ratingContainer}>
            <Rating 
              onClick={handleRatingChange}
              ratingValue={rating} /* Deja la calificación actual */
              size={26} /* Tamaño de las estrellas */
              fillColor="orange" /* Color de las estrellas llenas */
              emptyColor="gray" /* Color de las estrellas vacías */
            />
            <span className={styles.ratingText}>{formatRating(producto.calificacion_promedio)}</span>
          </div>

          {/* Selección de cantidad */}
          <div className={styles.quantitySelector}>
            <QuantitySelector cantidad={cantidad} setCantidad={setCantidad} />
          </div>
          <div>
            <button
              className={styles.addCartBtn}
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
      {/* Mostrar productos relacionados */}
      <div className={styles.productosRelacionados}>
        <ProductosRecomendados productos={productosRelacionados} />
      </div>
      <Footer />
    </div>
  );
};


export default DetalleProducto;
