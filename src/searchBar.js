import React from 'react';
import { CiSearch } from "react-icons/ci";
import SearchDropdown from './searchDropdown';

const SearchBar = ({ searchTerm, handleInputChange, showDropdown, searchResults, handleResultClick, styles }) => {
  return (
    <div className={styles.relativeContainer}>
      <form className={`d-flex ${styles.searchForm}`} role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className={`${styles.formControl} form-control me-2`}
          type="search"
          placeholder="Buscar"
          aria-label="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className={`btn ${styles.btnBusqueda}`} type="submit">
          <CiSearch size={24} color='white' />
        </button>
      </form>
      {showDropdown && (
        <SearchDropdown
          searchResults={searchResults}
          handleResultClick={handleResultClick}
          styles={styles}
        />
      )}
    </div>

  );
};

export default SearchBar;
