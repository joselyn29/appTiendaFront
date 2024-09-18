import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BarrasAdmin from './barrasAdmin';
const EditarProductos = () => {
  const [producto, setProducto] = useState(null);

  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:8000/api/productos/${id}/`)
  //     .then(response => setProducto(response.data))
  //     .catch(error => console.error(error));
  // }, [id]);

  // if (!producto) return <p className="text-center">Cargando...</p>;

  return (
    <div> EDITAR
      {/* <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0">Detalles del Producto</h2>
              </div>
              <div className="card-body">
                <h3 className="card-title">{producto.nombre}</h3>
                <p className="card-text"><strong>Precio:</strong> ${producto.precio}</p>
                <div className="mb-3">
                  <img 
                    src={producto.imagen_url} 
                    alt={producto.nombre} 
                    style={{width: '500px'}}
                    className="img-fluid"
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary">Añadir al Carrito</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default EditarProductos;
