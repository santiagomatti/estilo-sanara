// CLASE PRODUCTO

class Producto {
    constructor(id, nombre, precio, stock, img) { // Constructor de la clase Producto
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
    }
}

// INICIALIZACIÓN DE PRODUCTOS

const productos = [ // Array que engloba a todos los productos
    [ // Array de velas
        new Producto(1, 'Vela de canela', 6500, 55, 'assets/img/vela-de-canela.jpg'),
        new Producto(2, 'Vela de jazmin', 5000, 25, 'assets/img/vela-de-jazmin.jpg'),
        new Producto(3, 'Vela de lavanda', 5500, 30, 'assets/img/vela-de-lavanda.jpg'),
        new Producto(4, 'Vela de vainilla', 7000, 40, 'assets/img/vela-de-vainilla.jpg')
    ],
    [ // Array de aromatizadores
        new Producto(5, 'Aromatizador de eucalipto', 8500, 45, 'assets/img/aromatizador-de-eucalipto.jpg'),
        new Producto(6, 'Aromatizador de hierbas', 9000, 20, 'assets/img/aromatizador-de-hierbas.jpg'),
        new Producto(7, 'Aromatizador de limon', 7500, 55, 'assets/img/aromatizador-de-limon.jpg'),
        new Producto(8, 'Aromatizador de rosas', 8000, 35, 'assets/img/aromatizador-de-rosas.jpg')
    ],
    [ // Array de inciensos
        new Producto(9, 'Incienso de coco', 15000, 40, 'assets/img/incienso-de-coco.jpg'),
        new Producto(10, 'Incienso de manzanilla', 12500, 50, 'assets/img/incienso-de-manzanilla.jpg'),
        new Producto(11, 'Incienso de naranja', 13500, 35, 'assets/img/incienso-de-naranja.jpg'),
        new Producto(12, 'Incienso de palo santo', 14000, 45, 'assets/img/incienso-de-palo-santo.jpg')
    ]
];

// Cargar los productos del local storage

let carrito = []; // Array que almacena los productos seleccionados por el usuario (Tambien se almacena en e local storage)
let cantCarrito = 0; // Variable que almacena la cantidad de productos en el carrito
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

// Limpiar y mostrar los productos en el carrito

const carritoDOM = document.getElementById('carrito');

carritoDOM.innerHTML = '';

carrito.forEach(producto => {
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

    carritoDOM.appendChild(nuevoProd);
});

const totalDOM = document.createElement('li');
totalDOM.classList.add('list-group-item', 'd-flex', 'justify-content-between');

totalDOM.innerHTML = `<span>Total</span>
                        <strong>$${total}</strong>`;
carritoDOM.appendChild(totalDOM);
    
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('firstName').value;
    const apellido = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('address').value;
    const pago = document.querySelector('input[name="paymentMethod"]:checked');

    if (!/^[A-Za-z\s]+$/.test(nombre)) {
        Swal.fire({
            icon: 'error',
            title: 'Nombre invalido',
            text: 'Ingrese un nombre valido'
        });
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(apellido)) {
        Swal.fire({
            icon: 'error',
            title: 'Apellido invalido',
            text: 'Ingrese un apellido valido'
        });
        return;
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Email invalido',
            text: 'Ingrese un email valido'
        });
        return;
    }

    if (direccion === '') {
        Swal.fire({
            icon: 'error',
            title: 'Dirección invalida',
            text: 'Ingrese una dirección valida'
        });
        return;
    }

    if (!pago) {
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

// Inicializar el programa

console.log('Programa iniciado con exito');