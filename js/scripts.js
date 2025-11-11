

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
