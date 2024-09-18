//Estado del componente y effect efectos secundarios como obtención de datos
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './barraPrincipal'
import Swal from 'sweetalert2'
import styles from './css/listar.module.css'
import vacio from './imagenes/caja-vacia.png'
// import BarrasAdmin from './resources/barrasAdmin';


//Componente de React
const ListarProductos = () => {
  // productos es una variable de estado useState
  //setProductos es una funcion para actualizar la variable del useState
  const [productos, setProductos] = useState([]); //lo que hay dentro del useState es un array vacío que se llenará con los datos obtenidos... ELa variable productos econtiene el useState en el cual está contenido el array mencionado enteriormente
  //Cada que se llene el array el estado cambia, por lo que el componente se actualiza para mostrar el nuevo estado
  const [categorias, setCategorias] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);
  // *******************************************

  //obtencion de datos con el usseEffect
  //realiza una acción después de que el componente se haya montado
  useEffect(() => {
    // Obtener productos
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => console.error(error));

    // Obtener categorías
    axios.get('http://127.0.0.1:8000/api/categorias/')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => console.error(error));


  }, []);

  // Crear un mapa de id de categoría a nombre de categoría
  const categoriaMap = categorias.reduce((acc, categoria) => {
    acc[categoria.id] = categoria.nombre;
    return acc;
  }, {});


  //************************************************************************ */
  // FUNCIÓN DE EDITAR *******************************************************
  // Función que me permite abrir el formulario 
  const handleEdit = (producto) => {
    setEditingProduct(producto)
  }

  const handleCloseEdit = () => {
    setEditingProduct(null);
  }

  const handleEditSubmit = (e) =>{
    e.preventDefault();
    
    const updateProducto = {
      ...editingProduct,
      nombre: e.target.nombre.value,
      descripcion: e.target.descripcion.value,
    }
    console.log(updateProducto)
  }


  //**************************************************************************** */ 
  //Función que actualiza el estado  
  const desactivarProducto = async (id_producto) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Si desactivas el producto desaparecerá del catalogo de los productos para los usuarios.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        // Realizar la solicitud para cambiar el estado del producto
        await axios.put(`http://127.0.0.1:8000/api/productos/${id_producto}/`, {
          estado: 'Inactivo'  // Enviar el estado 'inactivo' para cambiarlo en el servidor
        });

        Swal.fire(
          'Desactivado!',
          'El producto ha sido desactivado.',
          'success'
        );

        // Actualizar el estado local de los productos
        setProductos(productos.map(produ =>
          produ.id === id_producto ? { ...produ, estado: 'inactivo' } : produ
        ));

      } catch (error) {
        Swal.fire(
          'Error!',
          'No se pudo desactivar el producto.',
          'error'
        );
        console.error(error);
      }
    }
  };


  // Función para formatear el precio
  const formatPrice = (price) => {
    return price.toLocaleString(); // Esto añadirá comas según la configuración local
  };

  const formatPriceDes = (price) => {
    return price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Reemplaza los separadores de miles con puntos
  };


  // ***********************************************************

  //Renderizando el componente 
  return ( // Lo que se renderiza después de todo
    <div className={`${styles.tableContainer}`}>
  
        <table>
          <thead>
            <tr className={styles.tr}>
              <th>Prototipo</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Descuento</th>
              <th className={styles.stock}>Stock (Unidades)</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(produ => (
              <tr key={produ.id}>
                <td></td>
                <td>{produ.nombre}</td>
                <td>{categoriaMap[produ.categoria]}</td>
                <td>${formatPrice(produ.precio)}</td>
                <td>{produ.precio_final ? `$${formatPriceDes(produ.precio_final)}` : `Sin descuento`}</td>
                <td className={styles.stock}>{produ.stock}</td>
                <td>{produ.estado}</td>
                <td>
                  <button title="Desactivar" onClick={() => desactivarProducto(produ.id)}><i className="bi bi-dash-square"></i></button>
                  <button title='Editar información' onClick={() => handleEdit(produ)}><i className="bi bi-pencil-square"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      

      {/* MODEL PARA EDITAR */}

      {editingProduct && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Editar Producto</h3>
            <form onSubmit={handleEditSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">{editingProduct.nombre}</label>
                <input
                  type="text"
                  id="titulo"
                  name="nombre"
                  defaultValue={editingProduct.nombre}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  defaultValue={editingProduct.descripcion}
                  required
                  className={styles.textarea}
                  name="descripcion"
                />
              </div>
              <button type="submit" className={styles.btnSubmit}>Actualizar</button>
              <button type="button" onClick={handleCloseEdit} className={styles.btnClose}>Cerrar</button>
            </form>
          </div>
        </div>
      )}





    </div>)
};

export default ListarProductos; //puede ser utilizado o importado en otros archivos
