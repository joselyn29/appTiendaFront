import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //rutas y rutas que manejará toda la aplicaión 
// import PruebaImg from './pruebaImg.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider } from './authContext'; // Proveedor para autenticación
import 'bootstrap/dist/css/bootstrap.min.css';


import ProtectedRoute from './protectedRoute'; // Ruta protegida

//Componentes utilizados
import Login from './login';
import BarrasAdmin from './resources/barrasAdmin.js';
import FormProductos from './formProductos';
import EditarProductos from './resources/EditarProductos.js';



const App = () => {
    return (
        <AuthProvider> {/* Proveedor de autenticación para el admin */}
            {/* <CartProvider> Proveedor del carrito de compras */}

                <Router>
                    <Routes>
                        {/* <Route path="/pruebaImg" element={<PruebaImg />} /> */}
                        {/* <Route path="/Admin" element={<BarrasAdmin />} /> */}

                        <Route path="/" element={<Login />} />
                        <Route path="/Admin" element={
                            <ProtectedRoute> {/* Solo accesible para el administrador */}
                                <BarrasAdmin />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/add" element={
                            <ProtectedRoute> {/* Solo accesible para el administrador */}
                                <FormProductos />
                            </ProtectedRoute>
                        } />
                        <Route path="/productos/:id" element={
                            <ProtectedRoute> {/* Solo accesible para el administrador */}
                                <EditarProductos />
                            </ProtectedRoute>
                        } />
                         
                    </Routes>
                </Router>
            {/* </CartProvider> */}
        </AuthProvider>
    );
};

export default App;
