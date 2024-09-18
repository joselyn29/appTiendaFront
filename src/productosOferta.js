import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styles from './css/productosOferta.module.css';
import { CartContext } from './cartContext';
import CartDrawer from './cartDrawer';
import ProductCard from './productCard';

const ProductosOferta = ({ productos: productosProp = [], limit, isHome }) => {
  const [productos, setProductos] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { addToCart, cart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/productos-oferta/');
        setProductos(response.data); // Verifica que los productos se están obteniendo correctamente
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleAddToCart = (producto) => {
    const productoConDescuento = {
      ...producto,
      precio: producto.precio_final || producto.precio,
    };
    addToCart(productoConDescuento);
    setIsCartDrawerOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const cartSubtotal = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

  // Si limit está definido, corta los productos mostrados, si no, muestra todos
  const displayedProductos = limit
  ? (productosProp && productosProp.length > 0 ? productosProp.slice(0, limit) : productos.slice(0, limit))
  : (productosProp && productosProp.length > 0 ? productosProp : productos);


  if (!productos.length) {
    return <p>No hay productos en oferta disponibles.</p>;
  }

  return (
    <div className={isHome ? styles.productRow : styles.productGrid}>
      {displayedProductos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          handleAddToCart={handleAddToCart}
        />
      ))}

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={closeCartDrawer}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        subtotal={cartSubtotal}
      />
    </div>
  );
};

export default ProductosOferta;
