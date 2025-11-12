document.addEventListener("DOMContentLoaded", function () {
    // --- 🔹 SECCIONES ---
    const secciones = {
        inicio: document.getElementById("seccion-inicio"),
        menu: document.getElementById("seccion-menu"),
        promo: document.getElementById("seccion-promocion"),
        delivery: document.getElementById("seccion-delivery"),
        reserva: document.getElementById("seccion-reserva"),
        tienda: document.getElementById("seccion-tienda"),
        cv: document.getElementById("seccion-cv")
    };

    function mostrarSeccion(id) {
        for (const key in secciones) {
            if (secciones[key]) secciones[key].style.display = "none";
        }
        if (secciones[id]) secciones[id].style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Inicializar carrusel si es la tienda
        if (id === "tienda") inicializarCarrusel();
    }

    // Mostrar inicio por defecto
    mostrarSeccion("inicio");

    // --- 🔹 NAV BOTONES ---
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const destino = btn.getAttribute("data-section");
            mostrarSeccion(destino);
        });
    });

    // Botón específico para CV
    const btnCV = document.getElementById("btn-cv");
    if (btnCV) {
        btnCV.addEventListener("click", e => {
            e.preventDefault();
            mostrarSeccion("cv");
        });
    }

    // --- 🔹 FORMULARIO CARGA CV ---
    const formCV = document.getElementById("form-cv");
    const mensajeCV = document.getElementById("mensaje-cv");
    const archivoInput = document.getElementById("archivo");
    const btnUpload = document.querySelector("#form-cv .btn-upload span");

    archivoInput.addEventListener("change", function () {
        btnUpload.textContent = archivoInput.files.length > 0 
            ? archivoInput.files[0].name 
            : "Cargar Archivo";
    });

    formCV.addEventListener("submit", function (e) {
        e.preventDefault();
        mensajeCV.style.display = "block";
        formCV.reset();
        btnUpload.textContent = "Cargar Archivo";
        setTimeout(() => { mensajeCV.style.display = "none"; }, 4000);
    });

    // --- 🔹 CARRUSEL TIENDA ---
    const track = document.getElementById("tienda-track");
    const prevBtn = document.getElementById("tienda-prev");
    const nextBtn = document.getElementById("tienda-next");
    const totalProductos = 12;
    let posicion = 0;

    function productosVisibles() {
        return window.innerWidth <= 768 ? 2 : 4;
    }

    function actualizarCarrusel() {
        const desplazamiento = posicion * (track.children[0].offsetWidth + 15);
        track.style.transform = `translateX(-${desplazamiento}px)`;
        track.style.transition = "transform 0.4s ease";
    }

    function inicializarCarrusel() {
        // Generar productos solo si no existen
        if (track.children.length === 0) {
            for (let i = 1; i <= totalProductos; i++) {
                const div = document.createElement("div");
                div.classList.add("tienda-producto");
                div.innerHTML = `
                    <img src="img/producto${i}.jpg" alt="Producto ${i}">
                    <p class="fw-bold">Producto ${i}</p>
                    <p>$1000</p>
                `;
                track.appendChild(div);
            }
        }
        posicion = 0;
        actualizarCarrusel();
    }

    nextBtn.addEventListener("click", () => {
        const visible = productosVisibles();
        const maxPos = totalProductos - visible;
        posicion = posicion < maxPos ? posicion + 1 : 0;
        actualizarCarrusel();
    });

    prevBtn.addEventListener("click", () => {
        const visible = productosVisibles();
        const maxPos = totalProductos - visible;
        posicion = posicion > 0 ? posicion - 1 : maxPos;
        actualizarCarrusel();
    });

    window.addEventListener("resize", () => {
        posicion = 0;
        actualizarCarrusel();
    });
});

// --- CARRUSEL TIENDA ---
const track = document.getElementById("tienda-track");
const prevBtn = document.getElementById("tienda-prev");
const nextBtn = document.getElementById("tienda-next");
const totalProductos = 12;

// Generar productos dinámicamente
for (let i = 1; i <= totalProductos; i++) {
    const div = document.createElement("div");
    div.classList.add("tienda-producto");
    div.innerHTML = `
        <img src="img/producto${i}.jpg" alt="Producto ${i}">
        <p class="fw-bold">Producto ${i}</p>
        <p>$1000</p>
    `;
    track.appendChild(div);
}

let posicion = 0;

// Determina cuántos productos se ven según la pantalla
function productosVisibles() {
    return window.innerWidth <= 768 ? 2 : 4;
}

// Actualiza la posición del carrusel
function actualizarCarrusel() {
    if(track.children.length === 0) return;
    const visible = productosVisibles();
    const anchoProducto = track.children[0].offsetWidth + 15; // 15 = gap
    const maxPos = track.children.length - visible;
    const desplazamiento = posicion * anchoProducto;
    track.style.transform = `translateX(-${desplazamiento}px)`;
    track.style.transition = "transform 0.4s ease";
}

// Botón siguiente
nextBtn.addEventListener("click", () => {
    const visible = productosVisibles();
    const maxPos = track.children.length - visible;
    posicion = posicion < maxPos ? posicion + 1 : 0;
    actualizarCarrusel();
});

// Botón anterior
prevBtn.addEventListener("click", () => {
    const visible = productosVisibles();
    const maxPos = track.children.length - visible;
    posicion = posicion > 0 ? posicion - 1 : maxPos;
    actualizarCarrusel();
});

// Ajusta el carrusel al cambiar el tamaño de pantalla
window.addEventListener("resize", () => {
    posicion = 0;
    actualizarCarrusel();
});

// Inicializa
actualizarCarrusel();
