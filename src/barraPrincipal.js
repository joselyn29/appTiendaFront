import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './cartContext';
import SearchBar from './searchBar';
import CartIcon from './cartIcon';
import styles from './css/barraPrincipal.module.css';

const BarraPrincipal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch(searchTerm);
      }
    }, 500);

    console.log("Resultados de la búsqueda:", searchResults);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = async (term) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/productos/?search=${term}`);
      setSearchResults(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error buscando el producto: ', error);
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setShowDropdown(false);
    }
  };

  const handleResultClick = () => {
    setShowDropdown(false);
  };

  return (
    <header className={styles.contenedoBarra}>
      <div className={`container-fluid ${styles.barraSuperior}`}></div>
      <div className={`row ${styles.encabezado}`}>
        {/* Logo */}
        <div className="col-4 col-md-2">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1726073299/logoTienda_deyf5y.jpg"
              alt="Logo"
              className={styles.logo}
            />
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="col-6 col-md-6">
          <div className={styles.barraBusqueda}>
            <SearchBar
              searchTerm={searchTerm}
              handleInputChange={handleInputChange}
              showDropdown={showDropdown}
              searchResults={searchResults}
              handleResultClick={handleResultClick}
              styles={styles}
            />
          </div>
        </div>

        {/* Íconos */}
        <div className="col-3 text-start">
          <div className="d-flex justify-content-start align-items-center">
            <Link to="/contacto" className={`btn ${styles.botonTelefono}`}>
              <span className="d-none d-md-inline"> Contactanos</span>
            </Link>
            <div>
              <CartIcon totalItems={totalItems} className={styles.botonCarrito} />
            </div>
          </div>

        </div>
      </div>

      {/* Menú inferior */}
      <div className={`row ${styles.menuInferior}`}>
    
        <div className="col text-center">
          <Link to="/alimentos" className={styles.enlaceMenu}>Tienda virtual</Link>
        </div>
        <div className="col text-center">
          <Link to="/ofertas" className={styles.enlaceMenu}>Ofertas</Link>
        </div>
        <div className="col text-center">
          <Link to="/nosotros" className={styles.enlaceMenu}>Nosotros</Link>
        </div>
        <div className="col text-center">
          <Link to="/tips" className={styles.enlaceMenu}>Tips</Link>
        </div>
        <div className="col text-center">
          <Link to="/contacto" className={styles.enlaceMenu}>Contactanos</Link>
        </div>
      </div>
    </header>
  );
};

export default BarraPrincipal;
