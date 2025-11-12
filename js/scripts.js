
document.addEventListener("DOMContentLoaded", function () {
    // --- 🔹 Referencias a las secciones ---
    const secciones = {
      inicio: document.getElementById("seccion-inicio"),
      menu: document.getElementById("seccion-menu"),
      promo: document.getElementById("seccion-promocion"),
      delivery: document.getElementById("seccion-delivery"),
      reserva: document.getElementById("seccion-reserva"),
      tienda: document.getElementById("seccion-tienda")
    };
  
    // --- 🔹 Mostrar / ocultar secciones ---
    function mostrarSeccion(id) {
      for (const key in secciones) {
        if (secciones[key]) secciones[key].style.display = "none";
      }
      if (secciones[id]) secciones[id].style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
    // Mostrar INICIO al cargar
    mostrarSeccion("inicio");
  
    // --- 🔹 Navegación principal ---
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const destino = btn.getAttribute("data-section");
        mostrarSeccion(destino);
      });
    });
  
    // --- 🔹 DELIVERY (link directo) ---
    const btnDelivery = document.getElementById("btn-delivery");
    if (btnDelivery) {
      btnDelivery.addEventListener("click", e => {
        e.preventDefault();
        mostrarSeccion("delivery");
      });
    }
  
    // --- 🔹 FORMULARIO DE RESERVA ---
    const pasos = [
      document.getElementById("reserva-paso1"),
      document.getElementById("reserva-paso2"),
      document.getElementById("reserva-paso3"),
      document.getElementById("reserva-paso4")
    ];
  
    function mostrarPaso(n) {
      pasos.forEach((p, i) => (p.style.display = i === n ? "block" : "none"));
    }
  
    // Mostrar primer paso
    mostrarPaso(0);
  
    // Flujo entre pasos
    document.getElementById("btnPaso1").onclick = () => mostrarPaso(1);
    document.getElementById("volver1").onclick = () => mostrarPaso(0);
    document.getElementById("btnPaso2").onclick = () => mostrarPaso(2);
    document.getElementById("volver2").onclick = () => mostrarPaso(1);
    document.getElementById("btnPaso3").onclick = () => mostrarPaso(3);
  
    // Volver al inicio desde el paso final
    document.getElementById("volverInicio").onclick = () => mostrarSeccion("inicio");
  
    // --- 🔹 MENÚ (pasa páginas) ---
    let paginaActual = 1;
    const totalPaginas = 6;
    const pag1 = document.getElementById("menu-pag1");
    const pag2 = document.getElementById("menu-pag2");
  
    function actualizarPaginas() {
      pag1.src = `img/menu${paginaActual}.png`;
      pag2.src = `img/menu${paginaActual + 1}.png`;
    }
  
    document.getElementById("menu-next").addEventListener("click", () => {
      if (paginaActual < totalPaginas - 1) {
        paginaActual += 2;
      } else {
        paginaActual = 1;
      }
      actualizarPaginas();
    });
  
    document.getElementById("menu-prev").addEventListener("click", () => {
      if (paginaActual > 1) {
        paginaActual -= 2;
      } else {
        paginaActual = totalPaginas - 1;
      }
      actualizarPaginas();
    });
  
    // --- 🔹 TIENDA (carrusel) ---
    const track = document.getElementById("tienda-track");
    const prevBtn = document.getElementById("tienda-prev");
    const nextBtn = document.getElementById("tienda-next");
  
    const totalProductos = 12;
  
    // Cargar productos dinámicamente
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
  
    function productosVisibles() {
      return window.innerWidth <= 768 ? 2 : 4;
    }
  
    function actualizarCarrusel() {
      const desplazamiento = posicion * (track.children[0].offsetWidth + 15);
      track.style.transform = `translateX(-${desplazamiento}px)`;
      track.style.transition = "transform 0.4s ease";
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
  