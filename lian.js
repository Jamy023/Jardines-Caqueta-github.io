// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    const contador = document.querySelector('.contador-carrito');
    
    if (contador) {
        const totalItems = Object.values(carrito).reduce((total, item) => total + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}

// Función para añadir un item al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    // Obtener el carrito actual del localStorage o crear uno nuevo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    
    if (carrito[nombre]) {
        carrito[nombre].cantidad++;
    } else {
        carrito[nombre] = {
            precio: precio,
            cantidad: 1,
            imagen: imagen
        };
    }
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar el contador
    actualizarContadorCarrito();
}

// Agregar event listeners cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el contador al cargar la página
    actualizarContadorCarrito();
    
    const botonesComprar = document.querySelectorAll('.comprar-btn');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', function() {
            const card = this.closest('.planta-card');
            const nombre = card.querySelector('h3').textContent;
            const precio = parseFloat(card.querySelector('.precio').textContent.replace('$', '').replace('.', ''));
            const imagen = card.querySelector('img').src;
            
            agregarAlCarrito(nombre, precio, imagen);
        });
    });
});