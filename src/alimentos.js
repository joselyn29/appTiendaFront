import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './css/listarProductos.module.css';
import CartDrawer from './cartDrawer';
import { CartContext } from './cartContext';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';

const Alimento = () => {
  const [productos, setProductos] = useState([]);
  const { addToCart, cart, removeFromCart } = useContext(CartContext);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    // Filtrar productos de la categoría "alimentos"
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(response => {
        console.log(response.data);
        const productosAlimentos = response.data.filter(producto => producto.categoria.nombre.toLowerCase() === 'alimentos');
        setProductos(productosAlimentos);
      })
      .catch(error => console.error(error));
  }, []);

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
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div>
      <BarraPrincipal />
      <div className={styles.container}>
        <h2 className={styles.tituloCategoria}>Alimentos</h2>
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
            <p>No hay productos disponibles en la categoría de alimentos.</p>
          )}
        </div>
        <CartDrawer
          isOpen={isCartDrawerOpen}
          onClose={closeCartDrawer}
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          subtotal={cartSubtotal}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Alimento;
