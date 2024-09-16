import React from 'react';
import BarraPrincipal from './barraPrincipal';
import { FaWhatsapp } from "react-icons/fa";
import UbicacionMapa from './ubicacion';
import Footer from './footer';
import styles from './css/contacto.module.css';

const Contacto = () => {
  const whatsappNumber = "+573103351575"; // Número de WhatsApp
  const whatsappMessage = "Hola, tengo una consulta."; // Mensaje predeterminado

  return (
    <div>
      <BarraPrincipal />
      <div className={`container mt-4 ${styles.container}`}>
        <h1 className={`${styles.colorTitulo} text-center mb-5`}>Contacto</h1>

        <div className="row">

          {/* Columna Izquierda - Información de Contacto y Tabla Informativa */}
          <div className="col-md-12 col-lg-4 mb-4">
            <div className={styles.card}>
              <h2 className={styles.colorTitulo}>Información de Contacto</h2>
              <p><strong>Sede principal:</strong> Cra. 53 # 33 - 19 San Jose Obrero - Bello</p>
              <p>
                <strong>WhatsApp: </strong>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappLink}
                >
                  <FaWhatsapp size={24} color='green' /> 3103351575
                </a>
              </p>
            </div>

            {/* Tabla Informativa debajo de Información de Contacto */}
            <div className={styles.card}>
              <h3 className={styles.colorTitulo}>Información de la Tienda</h3>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Horario</strong></td>
                    <td>Lun. a Sáb. 11:00 am a 6:00 pm. <br />Dom. 11:00 am a 4:00 pm.</td>
                  </tr>
                  <tr>
                    <td><strong>Tienda Online</strong></td>
                    <td>Abierta 24h.</td>
                  </tr>
                  <tr>
                    <td><strong>Envíos Seguros</strong></td>
                    <td>Compra segura y diferentes medios de pago.</td>
                  </tr>
                  <tr>
                    <td><strong>Devoluciones Fáciles</strong></td>
                    <td>Si no te encanta, lo devuelves. ¡Así de simple!</td>
                  </tr>
                  <tr>
                    <td><strong>Productos de Calidad</strong></td>
                    <td>Calidad superior, garantizada. ¡Vive la excelencia en cada compra!</td>
                  </tr>
                  <tr>
                    <td><strong>Asesoría</strong></td>
                    <td>Recibe asesoría especializada en nuestros productos.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Columna Derecha - Mapa */}
          <div className="col-md-12 col-lg-8 mb-4">
            <div className={styles.card}>
              <h3 className={styles.colorTitulo}>Nuestra Ubicación</h3>
              <div className={styles.mapContainer}>
                <UbicacionMapa /> {/* Aquí se mostrará el mapa */}
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contacto;
