import React, { useState, useRef } from 'react';
import axios from 'axios';
import './barraPrincipal';
import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom';
import styles from './css/addProductos.module.css'

const FormProductos = () => {
    // Estados para almacenar los datos del formulario y el archivo
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('Sin descripción');
    const [stock, setStock] = useState(1);
    const [ur_imagen, setUrl_imagen] = useState('');
    const [file, setFile] = useState(null);
    const [publicId, setPublicId] = useState(''); // Guarda el public_id de la imagen
    const [isUploading, setIsUploading] = useState(false); // Estado para rastrear si la imagen está cargando
    const [categorias, setCategorias] = useState([]); // Estado para las categorías
    const [categoria, setCategoria] = useState('');
    const fileInputRef = useRef(null); // Ref para el input de archivo
    // Cargar categorías al montar el componente
    React.useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categorias/') // Cambia esta URL si es necesario
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    // Manejador de envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        if (isUploading) {
            let timerInterval;
            Swal.fire({
                title: "¡Por favor espera mientras se carga la imagen!",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("Intentaste enviar el formulario sin subir la imagen");
                }
            });
            return; // Evita el envío del formulario
        }

        // Envia los datos del formulario al backend
        axios.post('http://127.0.0.1:8000/api/productos/', {
            nombre,
            precio,
            descripcion,
            stock,
            imagen_url: ur_imagen,
            categoria
        })
            .then(response => {
                // Maneja la respuesta exitosa del servidor
                console.log(response.data);
                console.log(publicId);
                // Reinicia los campos del formulario y el archivo
                setNombre('');
                setPrecio('');
                setDescripcion('Sin descripción');
                setStock(0);
                setUrl_imagen('');
                setFile(null);
                setCategoria('');
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Limpia el valor del input file
                }
            })
            .catch(error => console.error(error)); // Maneja errores en el envío
    };

    const handleImageDelete = () => {
        setUrl_imagen("");
        setFile(null); // Limpia el archivo en el estado
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Limpia el input file
        }
    };

    // Manejador para cargar la imagen a Cloudinary
    const handleImageUpload = async (e) => {
        try {
            setIsUploading(true); // Comienza la carga de la imagen
            const file = e.target.files[0]; // Obtiene el archivo seleccionado
            if (!file) {
                console.log('No file selected');
                return;
            }

            const data = new FormData(); // Crea un objeto FormData para enviar el archivo
            data.append("file", file); // Agrega el archivo al FormData
            data.append("upload_preset", "imagen_productos"); // Agrega el preset de subida de Cloudinary

            const response = await axios.post("https://api.cloudinary.com/v1_1/dwsoxf7zi/image/upload", data);

            // Maneja la respuesta de Cloudinary
            console.log(response.data);
            setPublicId(response.data.public_id);
            setUrl_imagen(response.data.secure_url); // Guarda la URL de la imagen en el estado
        } catch (error) {
            // Maneja diferentes tipos de errores
            if (error.response) {
                console.log('Error:', error.response.data);
                console.log('Status:', error.response.status);
            } else if (error.request) {
                console.log('Request Error:', error.request);
            } else {
                console.log('Unexpected Error:', error.message);
            }
        } finally {
            setIsUploading(false); // Termina la carga de la imagen
        }
    };

    return (
        
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Agregar nuevos productos</h2>
      
            <div className={styles.formGroup}>
              <label htmlFor="nombre">Nombre del Producto</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del producto"
                required
                className={styles.input}
              />
            </div>
      
            <div className={styles.formGroup}>
              <label htmlFor="precio">Precio del Producto</label>
              <input
                type="number"
                id="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Precio del producto"
                required
                className={styles.input}
              />
            </div>
      
            <div className={styles.formGroup}>
              <label htmlFor="descripcion">Descripción del Producto</label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción del producto"
                rows="3"
                className={styles.textarea}
              />
            </div>
      
            <div className={styles.formGroup}>
              <label htmlFor="stock">Stock del Producto</label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock del producto"
                className={styles.input}
              />
            </div>
      
            <div className={styles.formGroup}>
              <label htmlFor="categoria">Categoría del Producto</label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
                className={styles.select}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>
      
            <div className={styles.formGroup}>
              <label htmlFor="imagen">Imagen del Producto</label>
              <input
                type="file"
                id="imagen"
                accept="image/*"
                required
                ref={fileInputRef}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  handleImageUpload(e);
                }}
                className={styles.input}
              />
            </div>
      
            {ur_imagen && (
              <div className={styles.imagePreview}>
                <img src={ur_imagen} alt="Imagen cargada" className={styles.img} />
                <button className={`${styles.btnDelete}`} onClick={handleImageDelete}>
                  Eliminar imagen
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            )}
      
            <button type="submit" className={styles.btnSubmit}>Agregar Producto</button>
          </form>
        </div>
      );
};

export default FormProductos;
