import React from 'react';
import { Link } from 'react-router-dom';
import logo from './imagenes/logoTienda.jpg';
import './css/barraPrincipal.css'; // Asegúrate de tener aquí tus estilos personalizados
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';




const BarraPrincipal = () => {
    //Usado para cerrar la sesión 
    const { logout, accessToken } = useAuth();
    const navigate = useNavigate();


    //Función cerrar sesión
    const handleLogout = () => {
        logout(); // Llama a la función logout para limpiar tokens
        navigate('/'); // Redirige al login después de cerrar sesión
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light p-0 ">
            <div className="bg-green espacio"></div>

            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} className="logoTienda img-fluid" alt="Logo" />
                </Link>
                <div className='cont-items'>
                    <div className="d-flex flex-grow-1 align-items-center buscador-container">
                        <form className="d-flex flex-grow-1 mx-3" role="search">
                            <input
                                className="form-control me-2 barra-busqueda"
                                type="search"
                                placeholder="Buscar productos..."
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success btn-buscar" type="submit">Buscar</button>
                        </form>
                        <div className="d-flex align-items-center">
                            <div className="btn-group">
                                <button className="btn btn-warning">Envíos</button>
                                <Link to="/" className="btn btn-outline-primary ms-3">Productos</Link>
                            </div>
                            <Link to="/add" className="btn btn-outline-primary ms-3">Agregar Producto</Link>
                        </div>
                    </div>

                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Home">Tienda virtual</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Ofertas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Nosotros">Nosotros</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Tips">Tips</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Contacto">Contacto</Link>
                            </li>
                        </ul>
                        {accessToken && (
                            <button 
                            className='btn btn-outline-danger' 
                            onClick={handleLogout} 
                            style={{margin:'10px'}}
                            
                            >Cerrar sesion</button>
                        )}

                    </div>
                </div>

            </div>
        </nav>
    );
};

export default BarraPrincipal;
