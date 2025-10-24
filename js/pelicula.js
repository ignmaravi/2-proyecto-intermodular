const botonAñadir = document.querySelector(".AñadirBoton");
const seccionFormulario = document.querySelector("#seccion");
const formulario = document.querySelector("#pelicula");
const listaPeliculas = document.querySelector("#peliculas");
const botonCancelar = document.querySelector("#cancelar");

botonAñadir.addEventListener("click", () => {
    seccionFormulario.hidden = false;
});

botonCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    formulario.reset();
    seccionFormulario.hidden = true;
});

document.addEventListener("DOMContentLoaded", cargarPeliculas);

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

    const pelicula = {
        titulo,
        año,
        poster,
        synopsis
    };

    guardarPelicula(pelicula);
    mostrarPelicula(pelicula);

    formulario.reset();
    seccionFormulario.hidden = true;
});

function guardarPelicula(pelicula) {
    let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
    peliculas.push(pelicula);
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
}

function cargarPeliculas() {
    let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
    peliculas.forEach(mostrarPelicula);
}

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
