// Seleccionamos los elementos del DOM
const botonAñadir = document.querySelector(".AñadirBoton");
const seccionFormulario = document.querySelector("#seccion");
const formulario = document.querySelector("#pelicula");
const listaPeliculas = document.querySelector("#peliculas");
const botonCancelar = document.querySelector("#cancelar");

// Mostrar el formulario al hacer clic en "Añadir Película"
botonAñadir.addEventListener("click", () => {
    seccionFormulario.hidden = false;
});

// Ocultar el formulario al cancelar
botonCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    formulario.reset();
    seccionFormulario.hidden = true;
});

// Cargar películas guardadas al iniciar
document.addEventListener("DOMContentLoaded", cargarPeliculas);

// Manejar el envío del formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.querySelector("#titulo").value.trim();
    const año = document.querySelector("#año").value.trim();
    const poster = document.querySelector("#poster").value.trim();
    const synopsis = document.querySelector("#synopsis").value.trim();

    if (!titulo) {
        alert("Por favor, introduce un título.");
        return;
    }

    // Crear objeto película
    const pelicula = {
        titulo,
        año,
        poster,
        synopsis
    };

    // Guardar y mostrar la película
    guardarPelicula(pelicula);
    mostrarPelicula(pelicula);

    // Limpiar formulario
    formulario.reset();
    seccionFormulario.hidden = true;
});

// Guardar películas en localStorage
function guardarPelicula(pelicula) {
    let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
    peliculas.push(pelicula);
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
}

// Mostrar todas las películas guardadas
function cargarPeliculas() {
    let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
    peliculas.forEach(mostrarPelicula);
}

// Mostrar una película en el DOM
function mostrarPelicula(pelicula) {
    const li = document.createElement("li");
    li.innerHTML = `
        <h3>${pelicula.titulo} (${pelicula.año || "Año desconocido"})</h3>
        ${pelicula.poster ? `<img src="${pelicula.poster}" alt="${pelicula.titulo}" width="150">` : ""}
        <p>${pelicula.synopsis || "Sin sinopsis"}</p>
        <hr>
    `;
    listaPeliculas.appendChild(li);
}
