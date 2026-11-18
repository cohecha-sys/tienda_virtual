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