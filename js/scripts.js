
    document.addEventListener("DOMContentLoaded", function () {
    
        const inicioSection = document.getElementById("seccion-inicio");
        const tiendaSection = document.getElementById("seccion-tienda");
        const menuSection = document.getElementById("seccion-menu");
    

        function ocultarTodo() {
            inicioSection.style.display = "none";
            menuSection.style.display = "none";
        
            // ✅ La tienda SIEMPRE visible
            tiendaSection.style.display = "block";
        }
        

        function mostrarInicio() {
            ocultarTodo();
            inicioSection.style.display = "block";
        }
    
        function mostrarMenu() {
            ocultarTodo();
            menuSection.style.display = "block";
        }
    
        // ✅ Inicio del nav
        document.querySelector('a[href="#inicio"]').addEventListener("click", function(e){
            e.preventDefault();
            mostrarInicio();
        });
    
        // ✅ Logo (tenedor)
        document.querySelector(".tenedor-header").addEventListener("click", mostrarInicio);
    
        // ✅ Menú del nav
        document.querySelector('a[href="#menu"]').addEventListener("click", function(e){
            e.preventDefault();
            mostrarMenu();
        });
    
        // ✅ Menú del footer
        document.querySelectorAll(".footer-links a").forEach(link => {
            if(link.innerText.trim() === "Menú"){
                link.addEventListener("click", function(e){
                    e.preventDefault();
                    mostrarMenu();
                });
            }
        });
    
    });
    
/*SCRIPT DE PASA-PÁGINAS (SEPARADO)*/

    document.addEventListener("DOMContentLoaded", function () {
    
        let paginaActual = 1;
        const totalPaginas = 6;
    
        const pag1 = document.getElementById("menu-pag1");
        const pag2 = document.getElementById("menu-pag2");
    
        function actualizarPaginas() {
            pag1.src = `img/menu${paginaActual}.png`;
            pag2.src = `img/menu${paginaActual + 1}.png`;
        }
    
        document.getElementById("menu-next").addEventListener("click", function () {
            if (paginaActual < totalPaginas - 1) {
                paginaActual += 2; 
            } else {
                paginaActual = 1; 
            }
        actualizarPaginas();
        });


        document.getElementById("menu-prev").addEventListener("click", function () {
            if (paginaActual > 1) {
                paginaActual -= 2; 
            } else {
                paginaActual = totalPaginas - 1; 
            }
            actualizarPaginas();
        });
    
    });

let paginaActual = 1;
const totalPaginas = 6;

/* TIENDA – CARRUSEL DINÁMICO RESPONSIVE */

document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("tienda-track");
    const prevBtn = document.getElementById("tienda-prev");
    const nextBtn = document.getElementById("tienda-next");

    const totalProductos = 12;

    /*Cargar productos dinámicamente*/
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
        return window.innerWidth <= 768 ? 2 : 4;   // ✅ 2 en móvil — 4 en desktop
    }

    function actualizarCarrusel() {
        const visible = productosVisibles();
        const desplazamiento = posicion * (track.children[0].offsetWidth + 15);
        track.style.transform = `translateX(-${desplazamiento}px)`;
        track.style.transition = "transform 0.4s ease";
    }

    nextBtn.addEventListener("click", function () {
        const visible = productosVisibles();
        const maxPos = totalProductos - visible;

        posicion = (posicion < maxPos) ? posicion + 1 : 0;
        actualizarCarrusel();
    });

    prevBtn.addEventListener("click", function () {
        const visible = productosVisibles();
        const maxPos = totalProductos - visible;

        posicion = (posicion > 0) ? posicion - 1 : maxPos;
        actualizarCarrusel();
    });

    /*Recalcular al cambiar tamaño de ventana*/
    window.addEventListener("resize", function () {
        posicion = 0;
        actualizarCarrusel();
    });

});

/* FORMULARIO RESERVAS */
document.addEventListener("DOMContentLoaded", function () {

    /*NAVEGACIÓN PRINCIPAL*/
    const seccionInicio = document.getElementById("seccion-inicio");
    const seccionMenu = document.getElementById("seccion-menu");
    const seccionReserva = document.getElementById("seccion-reserva");
    const secciones = [seccionInicio, seccionMenu, seccionReserva];
  
    function mostrarSeccion(id) {
      secciones.forEach(sec => sec.style.display = "none");
      document.getElementById(id).style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const destino = btn.getAttribute("data-section");
        if (destino === "inicio") mostrarSeccion("seccion-inicio");
        if (destino === "menu") mostrarSeccion("seccion-menu");
        if (destino === "reserva") mostrarSeccion("seccion-reserva");
      });
    });
  
    /*Mostrar solo INICIO al cargar*/
    mostrarSeccion("seccion-inicio");
  

    const pasos = [
      document.getElementById("reserva-paso1"),
      document.getElementById("reserva-paso2"),
      document.getElementById("reserva-paso3"),
      document.getElementById("reserva-paso4")
    ];
  
    function mostrarPaso(n) {
      pasos.forEach((p, i) => p.style.display = (i === n) ? "block" : "none");
    }
  
    // Paso 1 → Paso 2
    document.getElementById("btnPaso1").addEventListener("click", () => mostrarPaso(1));
    document.getElementById("volver1").addEventListener("click", () => mostrarPaso(0));
  
    // Paso 2 → Paso 3
    document.getElementById("btnPaso2").addEventListener("click", () => mostrarPaso(2));
    document.getElementById("volver2").addEventListener("click", () => mostrarPaso(1));
  
    // Paso 3 → Confirmación (Paso 4)
    document.getElementById("btnPaso3").addEventListener("click", () => mostrarPaso(3));
    document.getElementById("volver3").addEventListener("click", () => mostrarPaso(2));
  
    // Mostrar el primer paso al cargar
    mostrarPaso(0);
  });

  // Botón "Volver al Inicio" en el Paso 4
document.getElementById("volverInicio").addEventListener("click", function() {
    // Oculta la sección de reserva
    document.getElementById("seccion-reserva").style.display = "none";
  
    // Muestra la sección de inicio
    document.getElementById("seccion-inicio").style.display = "block";
  
    // Hace scroll hacia arriba para que se vea el inicio
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
  