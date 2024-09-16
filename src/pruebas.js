import React, { useState } from 'react';

const ProductList = () => {
  // Inicializa el estado con un array de productos ficticios
  const [productos, setProductos] = useState([
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
    { id: 3, name: 'Producto 3' }
  ]);

  // Función para eliminar un producto por su ID
  const eliminarProducto = (id_producto) => {
    setProductos(productos.filter(produ => produ.id !== id_producto));
    console.log("eliminado ", id_producto)
  };

  return (
    <div>
      <ul>
        {productos.map(produ => (
          <li key={produ.id}>
            {produ.name}
            <button onClick={() => eliminarProducto(produ.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
