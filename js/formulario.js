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
  const director = document.querySelector("#director").value.trim();
  const año = document.querySelector("#año").value.trim();
  const genero = document.querySelector("#genero").value.trim();
  const valoracion = document.querySelector("#valoracion").value;

  if (!titulo) {
    alert("Por favor, introduce un título.");
    return;
  }

  const pelicula = {
    titulo,
    director,
    año,
    genero,
    valoracion
  };

  guardarPelicula(pelicula);
  document.dispatchEvent(new CustomEvent("peliculaActualizada"));

  formulario.reset();
  seccionFormulario.hidden = true;
});

function guardarPelicula(pelicula) {
  let peliculas = JSON.parse(localStorage.getItem("catalogoPeliculas")) || [];
  peliculas.push(pelicula);
  localStorage.setItem("catalogoPeliculas", JSON.stringify(peliculas));
  document.dispatchEvent(new CustomEvent("peliculaActualizada"));
}

function cargarPeliculas() {
  let peliculas = JSON.parse(localStorage.getItem("catalogoPeliculas")) || [];
  peliculas.forEach(mostrarPelicula);
}

function mostrarPelicula(pelicula) {
  const li = document.createElement("li");
  li.innerHTML = `
    <h3>${pelicula.titulo} (${pelicula.año || "Año desconocido"})</h3>
    <p><strong>Director:</strong> ${pelicula.director}</p>
    <p><strong>Género:</strong> ${pelicula.genero}</p>
    <p><strong>Valoración:</strong> ${"⭐".repeat(pelicula.valoracion)}</p>
    <hr>
  `;
  listaPeliculas.appendChild(li);
}
