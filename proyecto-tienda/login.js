
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');
    const loginBoton = document.getElementById('loginBoton');

    let intentosFallidos = 0; // Contador de intentos fallidos
    const maxIntentos = 3; // Número máximo de intentos permitidos
    let tiempoBloqueo = 0; // Tiempo de bloqueo en segundos (tiempo en que el usuario no puede volver a intentar)

    // Función que maneja el evento de envío del formulario
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita que el formulario recargue la página

      const usuario = document.getElementById('username').value;
      const contrasena = document.getElementById('password').value;

      
      // Si ya se ha alcanzado el máximo de intentos fallidos, no permitir más intentos
      if (intentosFallidos >= maxIntentos) {
        const tiempoActual = Date.now();
        if (tiempoActual < tiempoBloqueo) {
          // Mostrar el tiempo restante de bloqueo
          const tiempoRestante = ((tiempoBloqueo - tiempoActual) / 1000).toFixed(0);
          messageElement.textContent = `Demasiados intentos fallidos. Intenta de nuevo en ${tiempoRestante} segundos.`;
          return;
        } else {
          // Restablecer el contador de intentos fallidos y el tiempo de bloqueo
          intentosFallidos = 0;
          tiempoBloqueo = 0;
        }
      }

      // Realizar la solicitud para obtener los usuarios desde el archivo JSON
      fetch('users.json')
        .then(res => res.json())
        .then(usuarios => {
          // Buscar al usuario con las credenciales correctas
          const usuarioEncontrado = usuarios.find(u => u.username === usuario && u.password === contrasena);

          if (usuarioEncontrado) {
            // Generar token JWT y guardarlo en localStorage
            const token = generarToken(usuario);
            localStorage.setItem('token', token);

            // Redirigir a la tienda
            window.location.href = 'tiendaonline/tiendaonline.html';
          } else {
            // Si las credenciales no coinciden, aumentar los intentos fallidos
            intentosFallidos++;
            if (intentosFallidos >= maxIntentos) {
              // Bloquear la cuenta por 1 minuto (60 segundos) después de 3 intentos fallidos
              tiempoBloqueo = Date.now() + 60000; // Bloqueo de 1 minuto
              messageElement.textContent = 'Demasiados intentos fallidos. Intenta de nuevo en 1 minuto.';
            } else {
              messageElement.textContent = 'Usuario o contraseña incorrectos.';
            }
          }
        })
        .catch(error => {
          console.error('Error al procesar el login:', error);
          messageElement.textContent = 'Ocurrió un error. Inténtalo más tarde.';
          messageElement.style.color = 'red';
        });
    });

    // Función para generar un token JWT simulado
    function generarToken(usuario) {
  // Genera un token único combinando información del usuario, la marca de tiempo actual y una cadena aleatoria
  const token = usuario + '-' + 
    Date.now() // Marca de tiempo en milisegundos desde el 1 de enero de 1970
    + '-' + 
    Math.random() // Genera un número aleatorio entre 0 y 1
    .toString(36) // Convierte el número a una cadena en base 36 (usa dígitos y letras a-z)
    .substr(2, 9); // Extrae una subcadena de 9 caracteres, omitiendo los dos primeros ("0.")

  return token;
}


