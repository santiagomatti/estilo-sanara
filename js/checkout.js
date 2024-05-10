// Archivo JavaScript para la página de checkout

// INICIALIZACIÓN DE PRODUCTOS

let productos = [];

async function inicializarProductos() { // Función que carga los productos al inicio del programa
    const data = await cargarProductos();
    if (data) {
        productos = Object.values(data);
        Inicio(); // Se inicia el programa después de cargar los productos
    }
}

async function cargarProductos() { // Función que carga los productos desde un archivo JSON
    try {
        const response = await fetch('https://santiagomatti.github.io/estilo-sanara/json/productos.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        return null;
    }
}

// CARRITO DE COMPRAS

let carrito = [];
let cantCarrito = 0;
let total = 0;

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito')); // Se obtiene el carrito del local storage
    carrito.forEach(producto => {
        cantCarrito += producto.cantidad;
    });
    console.log('Carrito cargado del local storage');
} else {
    window.location.href = 'index.html';
}

document.getElementById('cantCarrito').innerText = cantCarrito;

function Inicio() { // Función que se ejecuta al inicio del programa

    const carritoDOM = document.getElementById('carrito');

    carritoDOM.innerHTML = '';

    carrito.forEach(producto => { // Se recorre el carrito para mostrar los productos en el carrito
        const prod = productos.flat().find(prod => prod.id === producto.id);
        const precio = prod.precio * producto.cantidad;

        total += precio;

        const nuevoProd = document.createElement('li');
        nuevoProd.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

        nuevoProd.innerHTML = `<div>
                                <h6 class="my-0">${prod.nombre}</h6>
                                <small class="text-body-secondary">Cantidad: ${producto.cantidad}</small>
                            </div>
                            <span class="text-body-secondary">$${precio}</span>`;

        carritoDOM.appendChild(nuevoProd); // Se agrega el producto al carrito
    });

    const totalDOM = document.createElement('li');
    totalDOM.classList.add('list-group-item', 'd-flex', 'justify-content-between');

    totalDOM.innerHTML = `<span>Total</span>
                        <strong>$${total}</strong>`;
    carritoDOM.appendChild(totalDOM); // Se agrega el total al carrito

    document.querySelector('form').addEventListener('submit', (e) => { // Validación de los datos del formulario
        e.preventDefault();

        const nombre = document.getElementById('firstName').value;
        const apellido = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const direccion = document.getElementById('address').value;
        const pago = document.querySelector('input[name="paymentMethod"]:checked');

        if (!/^[A-Za-z\s]+$/.test(nombre)) { // Se valida que el nombre sean solo letras
            Swal.fire({
                icon: 'error',
                title: 'Nombre invalido',
                text: 'Ingrese un nombre valido'
            });
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(apellido)) { // Se valida que el apellido sean solo letras
            Swal.fire({
                icon: 'error',
                title: 'Apellido invalido',
                text: 'Ingrese un apellido valido'
            });
            return;
        }

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) { // Se valida el email
            Swal.fire({
                icon: 'error',
                title: 'Email invalido',
                text: 'Ingrese un email valido'
            });
            return;
        }

        if (direccion === '') { // Se valida que la dirección no este vacia
            Swal.fire({
                icon: 'error',
                title: 'Dirección invalida',
                text: 'Ingrese una dirección valida'
            });
            return;
        }

        if (!pago) { // Se valida que se haya seleccionado un método de pago
            Swal.fire({
                icon: 'error',
                title: 'Pago invalido',
                text: 'Seleccione una opción de pago'
            });
            return;
        }

        // Aca se deberia enviar la informacion a un servidor para procesar la compra

        localStorage.clear();
        window.location.href = 'compra-finalizada.html';
    });
}

// Inicializar el programa

inicializarProductos();
console.log('Programa iniciado con exito');