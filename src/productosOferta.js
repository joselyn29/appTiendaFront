import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './css/productosOferta.module.css';
import { CartContext } from './cartContext';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';
import Paginacion from './paginacion';
import CartDrawer from './cartDrawer';
import SortOptions from './sortOptions';

const ProductosOferta = () => {
  const [sortOption, setSortOption] = useState('relevance');
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const productosPorPagina = 20;
  const { addToCart, cart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/productos-oferta/');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  // Ordenar productos según la opción seleccionada
  const sortProducts = (productos, sortOption) => {
    const sortedProducts = [...productos];
    switch (sortOption) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.precio - b.precio);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.precio - a.precio);
      case 'best-seller':
        return sortedProducts.sort((a, b) => b.sold - a.sold); // Asume que tienes una propiedad `sold`
      case 'name-asc':
        return sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case 'name-desc':
        return sortedProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
      case 'newest':
        return sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Asume que tienes una propiedad `date`
      case 'discount':
        return sortedProducts.sort((a, b) => {
          // Calcular el porcentaje de descuento para cada producto
          const discountA = ((a.precio - a.precio_final) / a.precio) * 100;
          const discountB = ((b.precio - b.precio_final) / b.precio) * 100;
          return discountB - discountA; // Ordenar de mayor a menor descuento
        });
      case 'relevance':
        return sortedProducts.sort((a, b) => b.relevance - a.relevance); // Asume que tienes una propiedad `relevance`
      default:
        return sortedProducts;
    }
  };

  // Productos ordenados en base a la opción seleccionada
  const sortedProductos = sortProducts(productos, sortOption);

  const handleAddToCart = (produ) => {
    const productoConDescuento = {
      ...produ,
      precio: produ.precio_final || produ.precio, // Usa el precio final si existe, sino el precio normal
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

  // Calcular el subtotal del carrito
  const cartSubtotal = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

  // Lógica de paginación
  const totalProductos = sortedProductos.length;
  const totalPages = Math.ceil(totalProductos / productosPorPagina);
  const startIndex = (currentPage - 1) * productosPorPagina;
  const selectedProducts = sortedProductos.slice(startIndex, startIndex + productosPorPagina);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!Array.isArray(productos) || productos.length === 0) {
    return <p>No hay productos en oferta disponibles.</p>;
  }

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return 'Precio no disponible';
    return numericPrice.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    const original = parseFloat(originalPrice);
    const discounted = parseFloat(discountedPrice);
    if (isNaN(original) || isNaN(discounted) || original === 0) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div>
      <BarraPrincipal />
      <div className={styles.ofertaContainer}>
        <h2 className={styles.tituloRelacionado}>Ofertas</h2>
        <div className={styles.cajaOrdenar}>
          <SortOptions sortOptions={sortOption} onSortChange={setSortOption} />
        </div>
        <div className={styles.productGrid}>
          {selectedProducts.map(produ => {
            const originalPrice = produ.precio || 0;
            const discountedPrice = produ.precio_final || 0;
            const discountPercentage = calculateDiscount(originalPrice, discountedPrice);

            return (
              <div className={styles.cardProducto} key={produ.id}>
                <div className={styles.offerTag}>
                  <span>{discountPercentage}% OFF</span>
                </div>
                <Link to={`/productos/${produ.id}`}>
                  <img src={produ.imagen_url} className={styles.cardImg} alt={produ.nombre} />
                </Link>
                <div className={styles.cardBody}>
                  <Link to={`/productos/${produ.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '26px' }}>
                    {produ.nombre}
                  </Link>
                  <div className={styles.priceContainer}>
                    <p className={styles.cardPriceOriginal}>{formatPrice(originalPrice)}</p>
                    <p className={styles.cardPrecio}>{formatPrice(discountedPrice)}</p>
                  </div>
                  <div className={styles.buttonContainer}>
                    <button className={styles.botonOferta} onClick={() => handleAddToCart(produ)}>
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <CartDrawer
          isOpen={isCartDrawerOpen}
          onClose={closeCartDrawer}
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          subtotal={cartSubtotal} // Pasar el subtotal calculado
        />
        <Paginacion totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductosOferta;
