import styles from '../css/categorias.module.css';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import vacio from '../imagenes/caja-vacia.png'


const Categorias = ({ categoriaEnv }) => {
    const [categoria, setCategoria] = useState([]); //info de la categoria 
    const [productos, setProductos] = useState([]); //productos almacenados que tengan categoriax

    //Obener la info de la categoria 
    React.useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/categorias/${categoriaEnv}`) // Cambia esta URL si es necesario
            .then(response => {
                setCategoria(response.data);
            })
            .catch(error => console.error(error));
    }, [categoriaEnv]);

    // Obtener los productos de la categoría
    React.useEffect(() => {
        if (categoriaEnv) {
            axios.get(`http://127.0.0.1:8000/api/productos`)
                .then(response => {
                    // Filtrar los productos cuyo producto.categoria.id coincida con categoriaEnv
                    const productosFiltrados = response.data.filter(producto => producto.categoria && producto.categoria.id === categoriaEnv);
                    setProductos(productosFiltrados);
                })
                .catch(error => console.error(error));
        }
    }, [categoriaEnv]); // Se agrega el array de dependencias


    return (
        <div className={styles.cajaCategorias}>
            <h1>{categoria.nombre ? categoria.nombre : 'Sin categoría'}</h1>

            {productos.length > 0 ? (
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
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td></td>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria && producto.categoria.nombre ? producto.categoria.nombre : 'Sin categoría'}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <button style={{ fontSize: '25px', backgroundColor: 'transparent' }}><i className="bi bi-dash-square"></i></button>
                                <button style={{ fontSize: '25px', backgroundColor: 'transparent' }}><i className="bi bi-pencil-square"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <div className={`${styles.sinResultados}`} >
                    <img src={vacio} alt='Sin resultados'></img>
                    <strong>No hay productos asociados a esta categoría.</strong>
                </div>
            )}



        </div>
    );
};
export default Categorias;
