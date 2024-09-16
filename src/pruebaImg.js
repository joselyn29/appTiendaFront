// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// function PruebaImg() {
//     const [ur_imagen, setUrl_imagen] = useState("");

//     const changeUploadImage = async (e) => {
//         try {
//             const file = e.target.files[0];
//             console.log(e)
//             const data = new FormData();
//             data.append("file", file);
//             data.append("upload_preset", "imagen_productos");

//             if (!file) {
//                 console.log('No file selected');
//                 return;
//             }
    
    
//             const response = await axios.post("https://api.cloudinary.com/v1_1/dwsoxf7zi/image/upload", data);
//             console.log(response.data);
//             setUrl_imagen(response.data.secure_url);
//         } catch (error) {
//             if (error.response) {
//                 console.log('Error:', error.response.data); // Mensaje de error devuelto por Cloudinary
//                 console.log('Status:', error.response.status);
//             } else if (error.request) {
//                 console.log('Request Error:', error.request); // Solicitud realizada sin respuesta
//             } else {
//                 console.log('Unexpected Error:', error.message); // Cualquier otro error
//             }
//         }
//     };
    
//     return (
//         <>
//             <h1>Seleccionar imagen</h1>
//             <div>
//                 <input type='file' accept='image/*' onChange={changeUploadImage} />
//                 {ur_imagen && (
//                     <div>
//                         <img src={ur_imagen} alt='uploaded'></img>
//                         <button>Eliminar imagen</button>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }
// export default PruebaImg;