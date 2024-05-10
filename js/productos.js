// Archivo JavaScript para la página de productos

// INICIALIZACIÓN DE PRODUCTOS

let productos = []; // Array que almacena los productos

async function inicializarProductos() { // Función que carga los productos al inicio del programa
    const data = await cargarProductos();
    if (data) {
        productos = Object.values(data);
        Inicio(); // Se inicia el programa después de cargar los productos
    }
}

async function cargarProductos() { // Función que carga los productos del archivo JSON
    try {
        const response = await fetch('./../json/productos.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        return null;
    }
}

// CARRITO DE COMPRAS

let carrito = []; // Array que almacena los productos seleccionados por el usuario (Tambien se almacena en e local storage)
let cantCarrito = 0; // Variable que almacena la cantidad de productos en el carrito

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito')); // Se obtiene el carrito del local storage
    carrito.forEach(producto => {
        cantCarrito += producto.cantidad;
    });
    console.log('Carrito cargado del local storage');
}

document.getElementById('cantCarrito').innerText = cantCarrito;

// FUNCIONES

function Inicio() { // Función que se ejecuta al inicio del programa
    console.log('Inicio del programa');
    mostrarProductos();
    console.log('Programa iniciado con exito');
}

function mostrarProductos() { // Función que muestra los productos en la página
    console.log('Mostrando productos');

    const productosDOM = document.getElementById('productos'); // Se obtiene el elemento con el id productos
    productosDOM.innerHTML = ''; // Se limpia el HTML de los productos

    productos.forEach(seccion => { // Se recorren las secciones de productos
        seccion.forEach(producto => { // Se recorren los productos de cada sección
            const nuevoProd = document.createElement('div');
            nuevoProd.classList.add('col', 'mb-5');

            nuevoProd.innerHTML = `<div class="card h-100">
                                        <img class="card-img-top" src="${producto.img}" alt="${producto.nombre}" />
                                        <div class="card-body p-4">
                                            <div class="text-center">
                                                <h5 class="fw-bolder">${producto.nombre}</h5>
                                                $${producto.precio}
                                            </div>
                                        </div>
                                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div class="text-center">
                                                <input id="cantidad${producto.id}" class="form-control" type="number" value="1" min="1" max="${producto.stock}">
                                                <br>
                                                <button class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                                            </div>
                                        </div>
                                    </div>`;

            productosDOM.appendChild(nuevoProd); // Se agregan los productos al HTML
        });
    });

    console.log('Productos mostrados');
}

function buscar() { // Funcion que utiliza el input de busqueda para filtrar los productos y mostrarlos en la pagina
    console.log('Buscando producto');

    const busqueda = document.getElementById('busqueda').value;
    const productosFiltrados = productos.flat().filter(producto => producto.nombre.toLowerCase().includes(busqueda.toLowerCase())); // Flat() aplana el array de productos para poder filtrarlos por nombre

    const productosDOM = document.getElementById('productos');
    productosDOM.innerHTML = ''; // Se limpia el HTML de los productos

    productosFiltrados.forEach(producto => {
        const nuevoProd = document.createElement('div');
        nuevoProd.classList.add('col', 'mb-5');

        nuevoProd.innerHTML = `<div class="card h-100">
                                    <img class="card-img-top" src="${producto.img}" alt="${producto.nombre}" />
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            <h5 class="fw-bolder">${producto.nombre}</h5>
                                            $${producto.precio}
                                        </div>
                                    </div>
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center">
                                            <input id="cantidad${producto.id}" class="form-control" type="number" value="1" min="1" max="${producto.stock}">
                                            <br>
                                            <button class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                                        </div>
                                    </div>
                                </div>`;

        productosDOM.appendChild(nuevoProd);
    });

    console.log('Productos filtrados y mostrados');
}

function agregarAlCarrito(id) { // Funcion que agrega un producto al carrito
    console.log('Agregando al carrito');

    const cantidad = parseInt(document.getElementById(`cantidad${id}`).value); // Se obtiene la cantidad del producto
    const producto = productos.flat().find(prod => prod.id === id);

    if (cantidad > producto.stock) { // Se verifica que la cantidad no supere el stock
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay suficiente stock'
        })
        return;
    }

    if (cantidad <= 0) { // Se verifica que la cantidad sea mayor a 0
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La cantidad debe ser mayor a 0'
        });
        return;
    }

    const productoCarrito = carrito.find(prod => prod.id === id); // Se busca el producto en el carrito

    if (productoCarrito) {
        productoCarrito.cantidad += cantidad; // Si el producto está en el carrito, se suma la cantidad
    } else {
        carrito.push({ id, cantidad }); // Si no está en el carrito, se agrega el producto
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); // Se guarda el carrito en el local storage

    cantCarrito += cantidad;
    document.getElementById('cantCarrito').innerText = cantCarrito; // Se actualiza la cantidad en el carrito

    console.log('Producto agregado al carrito');

    const productoNombre = productos.flat().find(prod => prod.id === id).nombre;

    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `Se agrego ${productoNombre} al carrito`
    });

    mostrarProductos();
}

function verCarrito() { // Funcion para mostrar el carrito en un modal
    console.log('Cargando carrito');

    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'modal';

    modal.innerHTML = `<div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Carrito de compras</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                                </div>
                                <div class="modal-body">
                                    <ul class="list-group
                                        list-group-flush">
                                        ${carrito.map(producto => `
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                ${productos.flat().find(prod => prod.id === producto.id).nombre}
                                                <span>${producto.cantidad}</span>
                                                <button class="btn btn-outline-danger" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                                            </li>`).join('')}
                                    </ul>
                                </div>
                                <div class="modal-footer">
                                    <h5>Total: $${carrito.reduce((acc, producto) => acc + productos.flat().find(prod => prod.id === producto.id).precio * producto.cantidad, 0)}</h5>
                                    <button type="button" class="btn btn-primary" onclick="finalizar()">Finalizar compra</button>
                                </div>

                            </div>
                        </div>`;

    // map() recorre el array de productos en el carrito y devuelve un string con el HTML de cada producto
    // join('') convierte el array de strings en un solo string

    document.body.appendChild(modal);

    const modalBootstrap = new bootstrap.Modal(modal); // IMPORTANTE: Se usa el constructor del js de Bootstrap para crear el modal
    modalBootstrap.show(); // Se muestra el modal

    console.log('Carrito mostrado');

}

function eliminarDelCarrito(id) { // Funcion para eliminar un producto del carrito
    console.log('Eliminando del carrito');

    const producto = carrito.find(prod => prod.id === id);
    const cantidad = producto.cantidad;

    carrito = carrito.filter(prod => prod.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Se actualiza el carrito en el local storage

    cantCarrito -= cantidad;
    document.getElementById('cantCarrito').innerText = cantCarrito;

    location.reload(); // Se recarga la página para evitar errores en el modal de Bootstrap (En un futuro se va a redirigir a la pagina del carrito)
}

function finalizar() { // Funcion que redirije a una pagina de pago y pasa el local storage
    console.log('Finalizando compra');

    if (carrito.length === 0) { // Se verifica si hay productos en el carrito
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay productos en el carrito'
        });
    } else {
        window.location.href = 'checkout.html';
    }
}

// EVENTOS

document.getElementById('carrito').addEventListener('click', (e) => {
    e.preventDefault();
    verCarrito();
});

document.getElementById('buscar').addEventListener('submit', (e) => {
    e.preventDefault();
    buscar();
});

// INICIO DEL PROGRAMA

inicializarProductos(); // Se inicia el programa cargando los productos