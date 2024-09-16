// searchDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';

const SearchDropdown = ({ searchResults, handleResultClick, styles }) => {
  return (
    <div className={styles.dropdown}>
      {searchResults.length > 0 ? (
        searchResults.map(producto => (
          <div key={producto.id} className={styles.dropdownItem} onClick={handleResultClick}>
            <Link to={`/productos/${producto.id}`} className={styles.dropdownLink}>
              <img 
                src={producto.imagen_url || 'https://via.placeholder.com/50'} 
                alt={producto.nombre} 
                className={styles.productImage}
              />
              <span>{producto.nombre}</span>
            </Link>
          </div>
        ))
      ) : (
        <div className={styles.noResults}>
          <span>Producto no encontrado</span>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
