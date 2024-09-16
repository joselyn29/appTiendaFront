//Estado del componente y effect efectos secundarios como obtención de datos
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './barraPrincipal'
import Swal from 'sweetalert2'
import styles from './css/listar.module.css'


//Componente de React
const ListarProductos = () => {
  // productos es una variable de estado useState
  //setProductos es una funcion para actualizar la variable del useState
  const [productos, setProductos] = useState([]); //lo que hay dentro del useState es un array vacío que se llenará con los datos obtenidos... ELa variable productos econtiene el useState en el cual está contenido el array mencionado enteriormente
  //Cada que se llene el array el estado cambia, por lo que el componente se actualiza para mostrar el nuevo estado

  // *******************************************

  //obtencion de datos con el usseEffect
  //realiza una acción después de que el componente se haya montado
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/productos/') //solicitud GET para traer los datos

      .then(response => setProductos(response.data), console.log(productos)) //Si da exito, los datos estarpian contenidos en response.data
      .catch(error => console.error(error)); //si da error se puede manejar aqui 
  }, []); // el [] asegura que solo se sejecute una sola vez el componente




  //********************************************** */ 
  //Función que elimina un producto y actualiza el estado  
  const eliminarProducto = async (id_producto) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la eliminación, realiza la solicitud de eliminación
        axios.delete(`http://127.0.0.1:8000/api/productos/${id_producto}/`)
          .then(() => {
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );
            setProductos(productos.filter(produ => produ.id !== id_producto));

            // Redirigir o actualizar el estado después de eliminar, si es necesario
          })
          .catch(error => {
            Swal.fire(
              'Error!',
              'No se pudo eliminar el producto.',
              'error'
            );
            console.error(error);
          });
      }
    });
  };





  // ***********************************************************

  //Renderizando el componente 
  return ( // Lo que se renderiza después de todo
    <div className={styles.cajaListaDeProductos}>
      <table>


        <tbody>

          <tr >
            <th>Prototipo</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
          {productos.map(produ => (
            <tr key={produ.id}>
              <td></td>
              <td>{produ.nombre}</td>
              <td>{produ.categoria && produ.categoria.nombre ? produ.categoria.nombre : 'Sin categoría'}</td>
              <td>{produ.precio}</td>
              <td>{produ.stock}</td>
              <td>
                <button style={{ fontSize: '25px', backgroundColor: 'transparent' }} ><i class="bi bi-dash-square"></i></button>
                <button style={{ fontSize: '25px', backgroundColor: 'transparent' }}><i class="bi bi-pencil-square"></i></button>
              </td>
            </tr>))}
        </tbody>



      </table>
    </div>
  )
};

export default ListarProductos; //puede ser utilizado o importado en otros archivos
