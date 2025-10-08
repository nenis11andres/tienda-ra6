let productos = []; // Todos los productos disponibles
let productosMostrados = 0; // Cuántos productos se han mostrado hasta ahora
let productosFiltrados = []; // Productos después de aplicar filtros
const cantidadPorPagina = 8; // Número de productos a cargar por página

  /**
   * Obtiene los productos desde la API y los guarda en localStorage.
   */
  function obtenerProductos() {
        const url = 'https://fakestoreapi.com/products';
        
        fetch(url)
          .then(function(respuesta) {
            return respuesta.json();
          })
          .then(function(data) {
            
            productos = data;
            productosFiltrados = [...productos];

            // Guardar todos los productos en localStorage
            localStorage.setItem('productos', JSON.stringify(productos));

            mostrarProductos();
            agregarScrollListener();
          })
          .catch(function(error) {
            console.error('Error al obtener productos:', error);
          });
  }

  /**
   * Muestra los productos filtrados y ordenados en la página.
   */
  function mostrarProductos() {
        const container = document.getElementById('productos-container');
        const loadingMessage = document.getElementById('loading-message');

        // Mostrar mensaje de carga si estamos cargando productos
        if (productosMostrados > 0) {
          loadingMessage.style.display = 'block';
        }

        // Determinar cuántos productos mostrar
        const productosParaMostrar = productosFiltrados.slice(productosMostrados, productosMostrados + cantidadPorPagina);

        productosParaMostrar.forEach(function(producto) {
          const productoElement = document.createElement('div');
          productoElement.classList.add('producto');

          productoElement.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h5>${producto.title}</h5>
            <p><strong>$${producto.price}</strong></p>
            <a href="./informacion_producto/informacion.html?id=${producto.id}" class="ver-detalles">Ver detalles</a>
            <button onclick="agregarAlCarrito('${producto.id}')">Añadir al carrito</button>
            `;

          container.appendChild(productoElement);
        });

        // Actualizar cuántos productos hemos mostrado
        productosMostrados += productosParaMostrar.length;

        // Ocultar el mensaje de carga después de agregar los productos
        loadingMessage.style.display = 'none';
  }




  
// Función para detectar cuando el usuario hace scroll al final de la página
  function agregarScrollListener() {
        window.addEventListener('scroll', function() {
          // Comprobar si estamos cerca del final de la página
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            // Si hay más productos para cargar
            if (productosMostrados < productosFiltrados.length) {
              mostrarProductos();
            }
          }
        });
  }

  // Aplicar filtros y ordenar productos
  document.getElementById('aplicar-filtros').addEventListener('click', function() {
    const categoriaSeleccionada = document.getElementById('mostrar_categoria').value;
    const ordenarSeleccionado = document.getElementById('ordenar').value;
    
    // Filtrar productos por categoría
    if (categoriaSeleccionada !== 'todos') {
      productosFiltrados = productos.filter(producto => producto.category === categoriaSeleccionada);
    } else {
      productosFiltrados = [...productos]; // Si "Todos", mostramos todos los productos
    }

    // Ordenar productos por precio
    if (ordenarSeleccionado === 'ascendente') {
      productosFiltrados.sort((a, b) => a.price - b.price); // Orden ascendente
    } else if (ordenarSeleccionado === 'descendente') {
      productosFiltrados.sort((a, b) => b.price - a.price); // Orden descendente
    }

    // Restablecemos la cantidad de productos mostrados
    productosMostrados = 0;
    document.getElementById('productos-container').innerHTML = ''; // Limpiar los productos mostrados
    mostrarProductos(); // Mostrar los productos filtrados y ordenados
  });


  /**
   * Añade un producto al carrito.
   * @param {number|string} productId - ID del producto a añadir.
   */
  function agregarAlCarrito(productId) {
        const productoSeleccionado = productos.find(producto => producto.id == productId);
        if (!productoSeleccionado) return;

        // Obtener carrito actual desde localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id === productoSeleccionado.id);

        if (productoEnCarrito) {
          productoEnCarrito.cantidad++;
        } else {
          carrito.push({ ...productoSeleccionado, cantidad: 1 });
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto añadido al carrito');
  }
// Llamar a la función para obtener los productos al cargar la página
document.addEventListener('DOMContentLoaded', obtenerProductos);





const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let contador=0;

  for (let i=0; i<carrito.length; i++){
    ++contador; 
  }

document.querySelector(".contador-carrito").innerHTML=contador;
