const firebaseConfig = {
    apiKey: "AIzaSyCb_WD4ZnxaI1NuO37rAHCbR8fTF1LiA9w",
    authDomain: "proyectocacao-a258b.firebaseapp.com",
    projectId: "proyectocacao-a258b",
    storageBucket: "proyectocacao-a258b.firebasestorage.app",
    messagingSenderId: "926750057177",
    appId: "1:926750057177:web:ee2066f3b7c105d3c514c8"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 0;
        this.element = document.getElementById(id);

        if (!this.element) {
            console.warn(`Elemento con ID ${id} no encontrado`);
            return;
        }

        this.contadorElement = this.element.querySelector('.contador-valor');
        this.btnMas = this.element.querySelector('.btn-mas');
        this.btnMenos = this.element.querySelector('.btn-menos');
        this.btnAgregar = this.element.querySelector('.btn-agregar');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.btnMas?.addEventListener('click', () => this.cambiarCantidad(1));
        this.btnMenos?.addEventListener('click', () => this.cambiarCantidad(-1));
        this.btnAgregar?.addEventListener('click', () => this.agregarAlCarrito());
    }

    cambiarCantidad(delta) {
        this.cantidad = Math.max(0, this.cantidad + delta);
        this.actualizarContador();
    }

    actualizarContador() {
        if (this.contadorElement) {
            this.contadorElement.textContent = this.cantidad;
        }
    }

    async agregarAlCarrito() {
        if (this.cantidad <= 0) {
            alert("Por favor selecciona al menos 1 cantidad");
            return;
        }

        try {
            await db.collection("carrito").add({
                nombre: this.nombre,
                precio: this.precio,
                cantidad: this.cantidad,
                total: this.precio * this.cantidad,
                fecha: new Date()
            });

            this.cantidad = 0;
            this.actualizarContador();
            await cargarCarrito();
            alert(`${this.nombre} agregado al carrito!`);
        } catch (error) {
            console.error("Error al agregar el producto", error);
            alert("Error al agregar el producto");
        }
    }
}

// Función para cargar el carrito
const cargarCarrito = async () => {
    const lista = document.getElementById('carrito');
    const mensajeVacio = document.getElementById('mensaje-vacio');
    const totalCompra = document.getElementById('totalCompra');
    let total = 0;

    // Limpiar el carrito (excepto el mensaje inicial)
    Array.from(lista.children).forEach(child => {
        if (child.id !== 'mensaje-vacio') {
            lista.removeChild(child);
        }
    });

    try {
        const productos = await db.collection("carrito").orderBy("fecha", "desc").get();

        // Mostrar mensaje si no hay productos y resetear total
        if (productos.empty) {
            mensajeVacio.style.display = 'block';
            totalCompra.textContent = 'Total: $0.00'; // Asegurar que el total sea 0
            return;
        }

        mensajeVacio.style.display = 'none';

        productos.forEach(doc => {
            const item = doc.data();
            total += item.total;

            const li = document.createElement("li");
            li.className = "carrito-item";

            // Contenedor de información
            const infoDiv = document.createElement("div");
            infoDiv.className = "carrito-item-info";

            const nameSpan = document.createElement("span");
            nameSpan.className = "carrito-item-name";
            nameSpan.textContent = item.nombre;

            const detailsSpan = document.createElement("span");
            detailsSpan.className = "carrito-item-details";
            detailsSpan.textContent = `${item.cantidad} x $${item.precio.toFixed(2)}`;

            infoDiv.appendChild(nameSpan);
            infoDiv.appendChild(detailsSpan);

            // Precio total del item
            const priceSpan = document.createElement("span");
            priceSpan.className = "carrito-item-price";
            priceSpan.textContent = `$${item.total.toFixed(2)}`;

            // Botón eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.className = "carrito-item-remove";
            btnEliminar.textContent = "Eliminar";

            btnEliminar.addEventListener('click', async () => {
                if (confirm(`¿Eliminar ${item.nombre} del carrito?`)) {
                    try {
                        await db.collection("carrito").doc(doc.id).delete();
                        await cargarCarrito();
                    } catch (error) {
                        console.error("Error eliminando producto:", error);
                        alert("No se pudo eliminar el producto");
                    }
                }
            });

            // Ensamblar todo
            li.appendChild(infoDiv);
            li.appendChild(priceSpan);
            li.appendChild(btnEliminar);
            lista.appendChild(li);
        });

        // Actualizar total
        totalCompra.textContent = `Total: $${total.toFixed(2)}`;

    } catch (error) {
        console.error("Error cargando carrito:", error);
        mensajeVacio.textContent = "Error cargando el carrito";
        mensajeVacio.style.display = 'block';
        totalCompra.textContent = 'Total: $0.00';
    }
};

// Inicialización de TODOS los productos (1-8)
const productos = [
    new Producto("producto1", "Manteca de Cacao Orgánica (200g)", 14.90),
    new Producto("producto2", "Chocolate con Leche y Almendras (80g barra)", 5.99),
    new Producto("producto3", "Cacao en Polvo 100% Puro (250g)", 8.50),
    new Producto("producto4", "Barra de Chocolate Negro 70% (100g)", 6.25),
    new Producto("producto5", "Té de Cáscara de Cacao (20 bolsitas)", 7.40),
    new Producto("producto6", "Kit de Chocolate para Derretir (500g + moldes)", 22.00),
    new Producto("producto7", "Tableta de Chocolate Blanco con Trozos de Cacao (90g)", 7.20),
    new Producto("producto8", "Crema Untable de Avellana y Cacao (280g)", 10.90)
];

// Cargar carrito al iniciar
window.onload = () => {
    cargarCarrito();
}