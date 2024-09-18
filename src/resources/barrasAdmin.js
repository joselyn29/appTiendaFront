// import React, { useState } from 'react';
import styles from '../css/barrasAdmin.module.css';
import React from 'react';
import { useState } from 'react';
import FormProductos from '../formProductos';
import ListarProductos from '../listarProductos';
import axios from 'axios';
import { useAuth } from '../authContext'; //Para botón de cerrar sesión
import { useNavigate } from 'react-router-dom'; //Para botón de cerrar sesión
import logo from '../imagenes/logoTienda.jpg';
import Categorias from './categorias';
import EditarProductos from './EditarProductos';



const BarrasAdmin = () => {
    const [currentComponent, setCurrentComponent] = useState('Todos los productos'); //Contiene el estado de la pagina
    const [categoria, setCategoria] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false); // Estado para la visibilidad de la barra lateral
    const { logout, accessToken } = useAuth();
    const navigate = useNavigate();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0)


    //Función activar y desactivar el Sidebar Devuelve un false o un true
    const toggleSidebar = () => {

        setSidebarVisible(!sidebarVisible)

        console.log(sidebarVisible)
    };

    //MANEJAR EL EDITAR... MANIPULACIÓN DEL ID ENVIADO DESDE LISTAR PRODUCTOS **************************
   



    //MANDANDO ID DE CATEGORÍAS ***********************************************************************
    const estadoCategoria = (cate) => {
        setCategoriaSeleccionada(cate);
        handleItemClick('Categorías');
        // <Categorias categoriaEnv={cate}/>
        mostrarCategoria();
    };
    const mostrarCategoria = () => {
        console.log(categoriaSeleccionada)
    }


    //Cick a caja de categorías
    // const handle =(compCat)=>{
    //     handleClickCategoria(compCat)
    //     handleItemClick('Home Categorias')
    // }
    // //Función que envía la información al componente categoria
    // const handleClickCategoria = (categoriaId) => {
    //     console.log(categoriaId);
    //     <Categorias cat={categoriaId}/>
    // };


    // Al dar click cambia el estado del componente
    const handleItemClick = (component) => {
        setCurrentComponent(component);
        toggleSidebar(false)
    };
    // console.log(vista)
    const renderContent = () => {
        switch (currentComponent) {
            case 'Todos los productos':
                return <ListarProductos />;
            case 'Agregar':
                return <FormProductos />;

            case 'Categorías':
                return <Categorias categoriaEnv={categoriaSeleccionada} />;


            default:
                return <ListarProductos />;
        }
    };


    //OBTENER CATEGORÍAS - ----------------
    React.useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categorias/') // Cambia esta URL si es necesario
            .then(response => {
                setCategoria(response.data);
            })
            .catch(error => console.error(error));
    }, []);


    // FUNCIÓN PARA CERRAR SESIÓN
    const handleLogout = () => {
        logout(); // Llama a la función logout para limpiar tokens
        navigate('/'); // Redirige al login después de cerrar sesión
    };




    return (
        <div className={styles.container}>
            <div className={`${!sidebarVisible ? styles.noSidebar : styles.contenedorBurguerSidebar}`}>
                <div
                    className=
                    {`${!sidebarVisible ? styles.hidden : styles.barraLateral}`}
                // {styles.barraLateral}
                >
                    <div className={styles.administradorCont}>
                        <div className={styles.icon}>
                            <i className="bi bi-person-workspace"></i>
                        </div>
                        <h3>Administrador</h3>
                    </div>
                    <div className={styles.contItems}>
                        <div className="d-flex flex-column mb-3">
                            <div className={styles.itemsL}><div className={styles.contIconItem} onClick={() => handleItemClick('Todos los productos')} ><i className="bi bi-bag-check"></i>Home</div></div>
                            <div className={styles.itemsL}><div className={styles.contIconItem} onClick={() => handleItemClick('Agregar')}><i className="bi bi-box2-heart"></i>Productos</div></div>
                            <div className={styles.itemsL}><div className={styles.contIconItem}><i className="bi bi-clipboard-data"></i>Estadísticas</div></div>
                        </div>
                    </div>
                    <div className={styles.espacio}></div>
                </div>
                <div className={`${!sidebarVisible ? styles.burguerNegro : styles.burguerNoVisible}`} onClick={toggleSidebar}> <i className="bi bi-list"></i></div>


            </div>


            {/* BARRA SUPERIOR Y TODO LADO DERECHO*/}
            <div className={styles.rightSide}>
                <div className={styles.barraSuperior}>
                    <div className={styles.searchLogout}>

                        <div className={styles.espacioBarraSuperior}>

                        </div>


                        {/* IMAGEN LOGO */}
                        <div className={styles.logoTienda}>
                            <img src={logo} alt="Logo" />
                        </div>


                        {/* Formulario de búsqueda */}
                        <div className={styles.search}>
                            <form className={styles.formControl}>
                                <input type='search' placeholder="Buscar..." className={styles.input} />
                                <button type='submit' className={styles.button}>
                                    <i className="bi bi-search"></i>
                                </button>
                            </form>
                            {accessToken && (
                                <button
                                    className={styles.lButton}
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión

                                    <i className="bi bi-box-arrow-right" style={{ padding: '7px', fontSize: '20px' }}></i>
                                </button>
                            )}

                        </div>

                        {/* Botón de logout */}
                        {accessToken && (
                            <button
                                className={styles.logoutButton}
                                onClick={handleLogout}
                            >
                                Cerrar sesión

                                <i className="bi bi-box-arrow-right" style={{ padding: '7px', fontSize: '20px' }}></i>
                            </button>
                        )}


                    </div>

                    <div className={styles.pageTittle}>
                        <h5>{currentComponent}</h5>

                    </div>
                    {(currentComponent === 'Todos los productos' || currentComponent === 'Categorías') && (
                        <div className={styles.categoria}>
                            {/* Sección de categoría en tamaño grande */}
                            {categoria.map(cat => (
                                <div key={cat.id} className={styles.cat} onClick={() => estadoCategoria(cat.id)}>{cat.nombre}</div>
                            ))}




                            {/* Sección de selección categoría en tamaño pequeño
                            <div className={`form-group mb-3 ${styles.categoriaPequeña}`}>
                                {/* <label htmlFor="categoria">Categoría del Producto</label> 
                                <select
                                    className="form-control input-custom"
                                    id="categoria"
                                    value={categoria}
                                    // onChange={(e) => setCategoria(e.target.value)} // Actualiza el estado con el valor seleccionado
                                    required
                                >
                                    <option value="">Categorías</option>
                                    {categoria.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                    ))}
                                </select>
                            </div> */}
                        </div>

                    )}



                </div>

                <div className={styles.dinamicContent}>
                    <main>
                        {renderContent()}
                    </main>
                </div>

            </div>


        </div>
    );
};
export default BarrasAdmin;