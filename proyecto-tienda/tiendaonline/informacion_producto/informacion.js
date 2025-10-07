// Define una función llamada 'obtenerParametroURL' que recibe un parámetro 'nombre'.
  function obtenerParametroURL(nombre) {
        // Crea un objeto URLSearchParams a partir de la parte de parámetros de la URL actual (lo que está después del '?').
        const params = new URLSearchParams(window.location.search);
        // Retorna el valor del parámetro que coincide con el nombre proporcionado.
        // Si no existe, devuelve 'null'.
        return params.get(nombre);
  }

  
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

  