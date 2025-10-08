    
    /**
     * Carga y muestra los productos del carrito desde localStorage.
     */
    function cargarCarrito() {
        
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const carritoContainer = document.getElementById('carrito-container');
        const totalElement = document.getElementById('carrito-total');
      
        carritoContainer.innerHTML = '';
      
        let total = 0;
        
          carrito.forEach(producto => {
            const carritoElement = document.createElement('div');
            carritoElement.classList.add('carrito-item');
        
            carritoElement.innerHTML = `
              <img src="${producto.image}" alt="${producto.title}" class="carrito-image">
              <div class="carrito-info">
                <h4>${producto.title}</h4>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio: $${(producto.price * producto.cantidad).toFixed(2)}</p>
              </div>
              <button onclick="eliminarDelCarrito('${producto.id}')"><i class="fa-regular fa-trash-can"></i></button>
            `;
        
            carritoContainer.appendChild(carritoElement);
            total += producto.price * producto.cantidad;
          });
        
          totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  
    /**
     * Elimina un producto del carrito por su ID.
     * @param {number|string} productId - ID del producto a eliminar.
     */
    function eliminarDelCarrito(productId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(producto => producto.id != productId);

        // Guarda el objeto 'carrito' en localStorage convirtiéndolo a formato JSON para que pueda ser almacenado como texto.
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
        }
      
        document.getElementById('vaciar-carrito').addEventListener('click', () => {
        localStorage.removeItem('carrito');
        cargarCarrito();
    });

    /**
     * Realiza el pedido con los productos del carrito.
     */
  function realizarPedido() {  
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
      if (carrito.length === 0) {
        alert('El carrito está vacío. No se puede realizar el pedido.');
        return;
      }
    
      let mensajePedido = 'Pedido realizado con éxito. Productos:\n\n';
      carrito.forEach(producto => {
        mensajePedido += `- ${producto.title} (Cantidad: ${producto.cantidad}, Precio: $${(producto.price * producto.cantidad).toFixed(2)})\n`;
      });
    
      alert(mensajePedido);
    
      // Vaciar el carrito después de realizar el pedido
      localStorage.removeItem('carrito');
      cargarCarrito();
  }
  
  document.getElementById('realizar-pedido').addEventListener('click', realizarPedido);
  document.addEventListener('DOMContentLoaded', cargarCarrito);
  