const productos = [
    { id: 1, nombre: "Teclado mecánico", precio: 120000, categoria: "Perifericos", stock: 5 },
    { id: 2, nombre: "Mouse gamer", precio: 75000, categoria: "Perifericos", stock: 8 },
    { id: 3, nombre: "Mousepad RGB", precio: 45000, categoria: "Perifericos", stock: 6 },
    { id: 4, nombre: "Audífonos gamer", precio: 150000, categoria: "Audio", stock: 4 },
    { id: 5, nombre: "Parlante Bluetooth", precio: 95000, categoria: "Audio", stock: 7 },
    { id: 6, nombre: "Monitor 24 pulgadas", precio: 550000, categoria: "Monitores", stock: 3 },
    { id: 7, nombre: "Monitor 27 pulgadas", precio: 750000, categoria: "Monitores", stock: 2 },
    { id: 8, nombre: "Soporte para portátil", precio: 65000, categoria: "Accesorios", stock: 5 },
    { id: 9, nombre: "Webcam HD", precio: 110000, categoria: "Accesorios", stock: 4 }
];

let carrito = [];
let categoriaSeleccionada = "Todas";

const catalogo = document.getElementById("catalogo");
const filtros = document.getElementById("filtros");
const listaCarrito = document.getElementById("lista-carrito");
const contadorProductos = document.getElementById("contador-productos");
const totalArticulos = document.getElementById("total-articulos");
const subtotalElemento = document.getElementById("subtotal");
const descuentoElemento = document.getElementById("descuento");
const totalElemento = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar-carrito");

const formatoPrecio = (valor) => {
    return "$" + valor.toLocaleString("es-CO");
};

function mostrarFiltros() {
    const categorias = ["Todas", ...new Set(productos.map(producto => producto.categoria))];

    filtros.innerHTML = "";

    categorias.forEach(categoria => {
        const boton = document.createElement("button");

        boton.textContent = categoria;
        boton.classList.add("boton-filtro");

        if (categoria === categoriaSeleccionada) {
            boton.classList.add("activo");
        }

        boton.addEventListener("click", () => {
            categoriaSeleccionada = categoria;
            mostrarFiltros();
            mostrarProductos();
        });

        filtros.appendChild(boton);
    });
}

function mostrarProductos() {
    catalogo.innerHTML = "";

    const productosFiltrados = productos.filter(producto => {
        return categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;
    });

    contadorProductos.textContent = `Mostrando ${productosFiltrados.length} productos`;

    productosFiltrados.forEach(producto => {
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;
        const stockDisponible = producto.stock - cantidadEnCarrito;

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("producto-card");

        tarjeta.innerHTML = `
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.categoria}</p>
                <h4>${formatoPrecio(producto.precio)}</h4>
                <p>Stock disponible: ${stockDisponible}</p>
                ${stockDisponible === 0 ? "<p>Agotado</p>" : ""}
                <button class="boton-agregar" data-id="${producto.id}" ${stockDisponible === 0 ? "disabled" : ""}>
                    ${stockDisponible === 0 ? "Agotado" : "Agregar al carrito"}
                </button>
            </div>
        `;

        catalogo.appendChild(tarjeta);
    });

    document.querySelectorAll(".boton-agregar").forEach(boton => {
        boton.addEventListener("click", () => {
            agregarAlCarrito(Number(boton.dataset.id));
        });
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(item => item.id === id);
    const productoEnCarrito = carrito.find(item => item.id === id);

    const cantidadActual = productoEnCarrito ? productoEnCarrito.cantidad : 0;

    if (cantidadActual < producto.stock) {
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({
                id: producto.id,
                cantidad: 1
            });
        }
    }

    mostrarProductos();
    mostrarCarrito();
}

function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
    }

    carrito.forEach(item => {
        const producto = productos.find(producto => producto.id === item.id);

        const elemento = document.createElement("div");
        elemento.classList.add("producto-carrito");

        elemento.innerHTML = `
            <div>
                <h4>${producto.nombre}</h4>
                <p>Precio: ${formatoPrecio(producto.precio)}</p>
                <p>Subtotal: ${formatoPrecio(producto.precio * item.cantidad)}</p>
            </div>

            <div>
                <button class="boton-restar" data-id="${item.id}">-</button>
                <span>${item.cantidad}</span>
                <button class="boton-sumar" data-id="${item.id}" ${item.cantidad >= producto.stock ? "disabled" : ""}>+</button>
                <button class="boton-eliminar" data-id="${item.id}">Eliminar</button>
            </div>
        `;

        listaCarrito.appendChild(elemento);
    });

    document.querySelectorAll(".boton-sumar").forEach(boton => {
        boton.addEventListener("click", () => {
            cambiarCantidad(Number(boton.dataset.id), 1);
        });
    });

    document.querySelectorAll(".boton-restar").forEach(boton => {
        boton.addEventListener("click", () => {
            cambiarCantidad(Number(boton.dataset.id), -1);
        });
    });

    document.querySelectorAll(".boton-eliminar").forEach(boton => {
        boton.addEventListener("click", () => {
            eliminarDelCarrito(Number(boton.dataset.id));
        });
    });

    actualizarResumen();
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(producto => producto.id === id);
    const producto = productos.find(producto => producto.id === id);

    if (!item) return;

    const nuevaCantidad = item.cantidad + cambio;

    if (nuevaCantidad > producto.stock) return;

    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    item.cantidad = nuevaCantidad;

    mostrarCarrito();
    mostrarProductos();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);

    mostrarCarrito();
    mostrarProductos();
}

