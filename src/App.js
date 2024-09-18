import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './cartContext';
import { AuthProvider } from './authContext'; // Proveedor para autenticación
import ProtectedRoute from './protectedRoute'; // Ruta protegida
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'leaflet/dist/leaflet.css';


// Importar todos los componentes
import Home from './home';
import Nosotros from './nosotros';
import Carrito from './carrito';
import Checkout from './finalizarCompra';
import DetalleProducto from './detalleProducto';
import FormProductos from './formProductos';
import Login from './login';
import TerminosCondiciones from './terminosCondiciones';
import ShippingPolicy from './shippingPolicy';
import Contacto from './contacto';
import Ofertas from './ofertasMostrar';
import Alimentos from './alimentos';
import Cosmeticos from './cosmeticosNaturales';
import Esencias from './esenciasFlorales';
import Homeopaticos from './homeopaticos';
import Fitoterapeuticos from './fitoterapeuticos';
import Medicamentos from './medicamentos';
import SuplementosDietarios from './suplementosDietarios';
import Aromaterapia from './aromaterapia';

function App() {
  return (
    <AuthProvider> {/* Proveedor de autenticación para el admin */}
      <CartProvider> {/* Proveedor del carrito de compras */}
        <Router>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path='/nosotros' element={<Nosotros/>} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productos/:id" element={<DetalleProducto />} />
            <Route path="/carrito/checkout" element={<Checkout />} />
            <Route path="/terminos-condiciones" element={<TerminosCondiciones/>}/>
            <Route path="/shipping-policy" element={<ShippingPolicy/>} />
            <Route path="/contacto" element={<Contacto/>} />
            <Route path="/ofertas" element={<Ofertas/>} />
            <Route path="/alimentos" element={<Alimentos/>} />
            <Route path="/cosmeticos-naturales" element={<Cosmeticos/>} />
            <Route path="/esencias-florales" element={<Esencias/>} />
            <Route path="/homeopaticos" element={<Homeopaticos/>} />
            <Route path="/fitoterapeuticos" element={<Fitoterapeuticos/>} />
            <Route path="/medicamentos" element={<Medicamentos/>} />
            <Route path="/suplementos-dietarios" element={<SuplementosDietarios/>} />
            <Route path="/aromaterapia" element={<Aromaterapia/>} />

            {/* Rutas Protegidas para el Admin */}
            <Route path="/add" element={
              <ProtectedRoute> {/* Solo accesible para el administrador */}
                <FormProductos />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
