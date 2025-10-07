// Importa el módulo 'fs' para trabajar con el sistema de archivos
import fs from 'fs';

// Importa 'node-fetch' para realizar solicitudes HTTP
import fetch from 'node-fetch';

// URL de la API desde donde se obtendrán los datos
const url = 'https://fakestoreapi.com/users';

// Realiza una solicitud a la URL especificada
fetch(url)
  .then((response) => {
    // Verifica si la respuesta es exitosa 
    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error con el mensaje correspondiente
      throw new Error(`Error al obtener los datos: ${response.statusText}`);
    }
    // Convierte la respuesta en formato JSON para su procesamiento
    return response.json();
  })
  .then((data) => {
    // Escribe los datos obtenidos en un archivo llamado 'users.json'
    // JSON.stringify(data, null, 2) convierte el objeto en una cadena JSON formateada
    fs.writeFileSync('users.json', JSON.stringify(data, null, 2), 'utf-8');
    
    console.log('Archivo users.json generado con éxito.');
  })
  .catch((error) => {
    
    console.error('Error al generar el archivo JSON:', error.message);
  });


