import React from 'react';
import styles from './css/terminos.module.css';
import BarraPrincipal from './barraPrincipal';
import Footer from './footer';

const TerminosCondiciones = () => {
  return (
    <div>
      <BarraPrincipal />
      <section id="terminos-condiciones" className={styles.termsConditions}>
        <h1>Términos y Condiciones</h1>
        <p>Bienvenido a nuestra tienda en línea. A continuación, se detallan los términos y condiciones para el uso de nuestro sitio web. Por favor, léalos detenidamente. Si no está de acuerdo con estos términos, le pedimos que no utilice nuestro sitio.</p>

        <h2>Aceptación de Términos y Condiciones</h2>
        <p>Al acceder y utilizar este sitio web, usted acepta estos términos y condiciones en su totalidad.</p>

        <h2>Restricciones de Uso</h2>
        <p>Este sitio web y su contenido son propiedad de Multinaturista y Deportivo "El Obrero". Usted no puede usar el contenido del sitio sin nuestra autorización expresa.</p>

        <h2>Visualización del Producto</h2>
        <p>No podemos garantizar que los productos que veas en el sitio sean exactamente como los recibas, ya que la visualización puede variar según la resolución de su pantalla.</p>

        <h2>Política de Precios</h2>
        <p>Los precios están sujetos a cambios sin previo aviso. Los precios que se muestran en el sitio web son los vigentes al momento de la compra.</p>

        <h2>Formas de Comunicación</h2>
        <p>Para cualquier consulta, puede contactarnos a través de los medios disponibles en la sección de contacto.</p>

        <h2>Reversión del Pago, Retracto y Cambios</h2>
        <p>Para conocer nuestras políticas de reversión del pago, retracto y cambios, consulte la sección correspondiente en nuestra política de devoluciones.</p>

        <h2>Políticas de Garantía</h2>
        <p>La garantía de nuestros productos está sujeta a las condiciones especificadas en la sección de garantía de este documento.</p>

        <h2>Política de Retracto</h2>
        <p>Usted tiene derecho a retractarse de su compra en los términos y condiciones establecidos en la sección de política de retracto.</p>
      </section>
      <Footer/>
    </div>
  );
};

export default TerminosCondiciones;
