import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BarraPrincipal from './barraPrincipal';
import { useAuth } from './authContext';

const FormProductos = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const { logout, accessToken } = useAuth();
    const navigate = useNavigate();

    //Función que se ejecuta cuando el formulario es enviado
    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        //previene el comportamiento normal de formulario ( sin recargar la pagina y es necesario en aplicaciones de una sola pagina) 

        axios.post('http://127.0.0.1:8000/api/productos/', { nombre, precio }) //se hace solicitud post a la api y manda los datos 
            .then(response => { //exito
                console.log(response.data);
                //Vacía los campos nuevamente
                setNombre(''); 
                setPrecio('');
            })
            .catch(error => console.error(error)); //error
    };

    const handleLogout = () => {
      logout(); // Llama a la función logout para limpiar tokens
      navigate('/login'); // Redirige al login después de cerrar sesión
    };

    //renderizado del fomurlario
    return (
       // onSubmit={handleSubmit}
       <div>
        <BarraPrincipal/>
        <form onSubmit={handleSubmit}>
            <h2>Formulario</h2>
             {/* Ejecuta la funcion handleSubmit al ser enviado */}
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} /*Actualiza el estado cada vez que el usuario cambia el campo de entrada */
                placeholder="Nombre"
                required
            />
            <textarea
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Precio"
                required
            />
            <button type="submit">Agregar Producto</button>
        </form>
        {accessToken && (
            <button className='btn btn-outline-danger' onClick={handleLogout}>Cerrar sesion</button>
        )}
        
       </div>
       
    );
};

export default FormProductos;
