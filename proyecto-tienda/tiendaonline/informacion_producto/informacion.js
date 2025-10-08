
/**
 * Obtiene el valor de un parámetro de la URL.
 * @param {string} nombre - El nombre del parámetro a obtener.
 * @returns {string|null} El valor del parámetro o null si no existe.
 */
function obtenerParametroURL(nombre) {
        // Crea un objeto URLSearchParams a partir de la parte de parámetros de la URL actual (lo que está después del '?').
        const params = new URLSearchParams(window.location.search);
        // Retorna el valor del parámetro que coincide con el nombre proporcionado.
        // Si no existe, devuelve 'null'.
        return params.get(nombre);
  }

  /**
   * Busca y muestra los detalles de un producto por su ID.
   * @param {number|string} idProducto - El ID del producto a buscar.
   */ 
  function obtenerDetallesProducto(idProducto) {
        // Obtener todos los productos del localStorage
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
      
        // Buscar el producto por ID
        const producto = productos.find(p => p.id == idProducto);
      
        if (producto) {
          mostrarDetallesProducto(producto);
        } else {
          document.getElementById('detalles-producto').innerHTML = 'Producto no encontrado.';
        }
  }
  
    /**
   * Muestra los detalles de un producto en el DOM.
   * @param {Object} producto - El objeto producto a mostrar.
   */
  function mostrarDetallesProducto(producto) {
        const contenedor = document.getElementById('detalles-producto');
        contenedor.innerHTML = `
          <h2>${producto.title}</h2>
          <img src="${producto.image}" alt="${producto.title}">
          <p><strong>Precio:</strong> $${producto.price}</p>
          <p><strong>Categoría:</strong> ${producto.category}</p>
          <p><strong>Descripción:</strong> ${producto.description}</p>
          
        `;
  }
  
  // Espera a que todo el DOM haya sido completamente cargado y esté listo para ser manipulado.
  document.addEventListener('DOMContentLoaded', () => { 
    // Obtiene el valor del parámetro 'id' de la URL (se asume que la función obtenerParametroURL está definida).
    const idProducto = obtenerParametroURL('id');
    // Llama a la función obtenerDetallesProducto para obtener y mostrar información sobre el producto correspondiente al 'id'.
    obtenerDetallesProducto(idProducto);
  });

  