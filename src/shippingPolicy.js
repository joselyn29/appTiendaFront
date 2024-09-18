import React from 'react';
import styles from './css/shippingPolicy.module.css';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';

const ShippingPolicy = () => {
  return (
    <div>
      <BarraPrincipal />
      <div className="container-fluid">
        <div className={styles.containerCustom}>
          {/* Menú de navegación en la izquierda */}
          <nav id="navbar-example3" className={`h-100 flex-column align-items-stretch pe-4 ${styles.navbarCustom}`}>
            <nav className="nav nav-pills flex-column">
              <a className={`nav-link ${styles.navLinkCustom}`} href="#politica-envios">Política de Envíos</a>
              <a className={`nav-link ${styles.navLinkCustom}`} href="#politica-datos-personales">Política de Datos Personales</a>
              <a className={`nav-link ${styles.navLinkCustom}`} href="#politica-cookies">Política de Cookies</a>
            </nav>
          </nav>

          {/* Contenido con scroll en la derecha */}
          <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className={styles.scrollContent} tabIndex="0">
            <section id="politica-envios" className={styles.policySection}>
              <h1 className={styles.title}>Política de Envíos</h1>
              <h3 className={styles.subtitle}>1. Ámbito de Envío</h3>
              <p>Realizamos envíos a toda el área metropolitana en un plazo de 1 a 5 días hábiles. Para zonas rurales o de difícil acceso, el tiempo de entrega puede extenderse hasta 7 días hábiles.</p>
              <p>Ofrecemos la posibilidad de realizar envíos urgentes con un costo adicional. Todos nuestros envíos son realizados a través de empresas de transporte reconocidas, lo que garantiza la seguridad y puntualidad de las entregas.</p>
              
              <h3 className={styles.subtitle}>2. Costo de Envío</h3>
              <p>El costo del envío tiene una tarifa estándar de $5.000 COP para áreas urbanas. En zonas rurales o de difícil acceso, el costo puede variar. Ofrecemos tarifas especiales en pedidos mayores a $100.000 COP.</p>
              <p>En caso de que el paquete sufra algún daño durante el transporte, asumimos la responsabilidad de reemplazar o reembolsar el valor del producto, siempre que se reporte en un plazo de 48 horas después de la recepción.</p>

              <h3 className={styles.subtitle}>3. Tiempo de Entrega</h3>
              <p>El tiempo de entrega varía según la ubicación y las condiciones logísticas. Durante temporadas altas como Navidad o eventos especiales, los tiempos de entrega podrían extenderse debido al volumen de pedidos.</p>
              
              <h3 className={styles.subtitle}>4. Problemas con el Envío</h3>
              <p>Si experimenta algún inconveniente con su envío, como retrasos o paquetes extraviados, le pedimos que nos contacte de inmediato. Nuestro equipo de atención al cliente se encargará de brindarle una solución lo antes posible.</p>
            </section>

            <section id="politica-datos-personales" className={styles.policySection}>
              <h1 className={styles.title}>Política de Tratamiento de Datos Personales</h1>
              <h3 className={styles.subtitle}>1. Autorización</h3>
              <p>Al proporcionar su información personal, nos autoriza a utilizarla exclusivamente para fines administrativos, comerciales y de atención al cliente. Garantizamos que sus datos están protegidos bajo estrictos estándares de seguridad.</p>
              
              <h3 className={styles.subtitle}>2. Derechos del Titular</h3>
              <p>Como titular de sus datos, usted tiene derecho a conocer, actualizar y rectificar su información personal. También puede solicitar la eliminación de sus datos en cualquier momento, siempre y cuando no existan obligaciones legales que lo impidan.</p>

              <h3 className={styles.subtitle}>3. Modificaciones</h3>
              <p>Nos reservamos el derecho de modificar esta política en cualquier momento para cumplir con cambios normativos. Cualquier cambio será notificado a través de nuestra página web.</p>
            </section>

            <section id="politica-cookies" className={styles.policySection}>
              <h1 className={styles.title}>Política de Cookies</h1>
              <h3 className={styles.subtitle}>1. ¿Qué son las Cookies?</h3>
              <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio. Nos permiten ofrecerle una experiencia personalizada y mejorar el rendimiento del sitio.</p>
              
              <h3 className={styles.subtitle}>2. ¿Cómo Usamos las Cookies?</h3>
              <p>Utilizamos cookies para personalizar el contenido, analizar el tráfico web y mejorar su experiencia de navegación. Puede deshabilitar las cookies en cualquier momento ajustando la configuración de su navegador.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;