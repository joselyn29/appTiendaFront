// import React from 'react';
// import styles from './css/barraPrincipal.module.css';
// // 

// const BarraPrincipal = () => {
//   return (
//     <header className={`container-fluid ${styles.barraSuperior}`}>
//       <div className={`row ${styles.encabezado}`}>
//         {/* Logo */}
//         <div className="col-4 col-md-2">
//           <img
//             src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1726073299/logoTienda_deyf5y.jpg"
//             alt="Logo"
//             className={styles.logo}
//           />
//         </div>

//         {/* Barra de búsqueda */}
//         <div className="col-6 col-md-6">
//           <div className="input-group">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Buscar producto..."
//             />
//             <button className={`btn ${styles.botonBuscar}`} type="button">
//               <img className="fas fa-search" src='https://res.cloudinary.com/dj1cegfhf/image/upload/v1726014482/icon-search_xxtlj5.png'></img>
//             </button>
//           </div>
//         </div>

//         {/* Teléfonos */}
//         <div className="col-12 col-md-2 d-none d-md-block">
//           <div className={`text-end ${styles.telefonos}`}>
//             <span>Domicilios:</span> <br />
//             <span>3103351575</span>
//           </div>
//         </div>

//         {/* Íconos */}
//         <div className="col-2 text-end">
//           <div className="d-flex justify-content-end align-items-center">
//             <a href="https://wa.me/3103351575" className={`btn ${styles.botonTelefono}`}>
//               {/* <FaWhatsapp size={24} /> */}
//               <span className="d-none d-md-inline"> Teléfonos</span>
//             </a>
//             <button className={`btn ${styles.botonCarrito}`}>
//               {/* <FaShoppingCart size={24} /> */}
//               <span className="badge bg-light text-dark">0</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Menú inferior */}
//       <div className={`row ${styles.menuInferior}`}>
//         <div className="col text-center">
//           <a href="/" className={styles.enlaceMenu}>Tienda virtual</a>
//         </div>
//         <div className="col text-center">
//           <a href="/" className={styles.enlaceMenu}>Ofertas</a>
//         </div>
//         <div className="col text-center">
//           <a href="/" className={styles.enlaceMenu}>Nosotros</a>
//         </div>
//         <div className="col text-center">
//           <a href="/" className={styles.enlaceMenu}>Tips</a>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default BarraPrincipal;
