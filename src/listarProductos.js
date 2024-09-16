import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './css/listarProductos.module.css';
import CartDrawer from './cartDrawer';
import { CartContext } from './cartContext';

const ListarProductos = ({ maxProductos, sortOption }) => {
  const [productos, setProductos] = useState([]);
  const { addToCart, cart, removeFromCart } = useContext(CartContext);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(response => {
        const productosLimitados = maxProductos ? response.data.slice(0, maxProductos) : response.data;
        setProductos(productosLimitados);
      })
      .catch(error => console.error(error));
  }, [maxProductos]);

  // // Ordenar productos según la opción seleccionada
  // const sortProducts = (productos, sortOption) => {
  //   const sortedProducts = [...productos];
  //   switch (sortOption) {
  //     case 'price-asc':
  //       return sortedProducts.sort((a, b) => a.precio - b.precio);
  //     case 'price-desc':
  //       return sortedProducts.sort((a, b) => b.precio - a.precio);
  //     case 'best-seller':
  //       return sortedProducts.sort((a, b) => b.sold - a.sold); // Asume que tienes una propiedad `sold`
  //     case 'name-asc':
  //       return sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
  //     case 'name-desc':
  //       return sortedProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
  //     case 'newest':
  //       return sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Asume que tienes una propiedad `date`
  //     case 'discount':
  //       return sortedProducts.sort((a, b) => b.discount - a.discount); // Asume que tienes una propiedad `discount`
  //     case 'relevance':
  //       return sortedProducts.sort((a, b) => b.relevance - a.relevance); // Asume que tienes una propiedad `relevance`
  //     default:
  //       return sortedProducts;
  //   }
  // };

  // // Productos ordenados en base a la opción seleccionada
  // const sortedProductos = sortProducts(productos, sortOption);

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartDrawerOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  // Calcular el subtotal del carrito
  const cartSubtotal = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

  const formatPrice = (price) => {
    // Asegurarse de que el precio es un número
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,  // Para eliminar los decimales
      maximumFractionDigits: 0   // Asegurar que no se muestren decimales
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {productos.length > 0 ? (
          productos.map(produ => (
            <div className={`card ${styles.cardProducto}`} key={produ.id}>
              <Link to={`/productos/${produ.id}`}>
                <img src={produ.imagen_url} className={styles.cardImg} alt={produ.nombre} />
              </Link>
              <div className={styles.cardBody}>
                <Link to={`/productos/${produ.id}`} style={{ textDecoration: 'none', color: 'green', fontWeight: 'bold', fontSize: '26px' }}>
                  {produ.nombre}
                </Link>
                <p className={styles.cardPrecio}>{formatPrice(produ.precio)}</p>
                <div className={styles.buttonContainer}>
                  <button onClick={() => handleAddToCart(produ)}>Añadir al Carrito</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={closeCartDrawer}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        subtotal={cartSubtotal} // Pasar el subtotal calculado
      />
    </div>
  );
};

export default ListarProductos;
