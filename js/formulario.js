const botonAñadir = document.querySelector(".AñadirBoton");
const seccionFormulario = document.querySelector("#seccion");
const formulario = document.querySelector("#pelicula");
const listaPeliculas = document.querySelector("#peliculas");
const botonCancelar = document.querySelector("#cancelar");

// Mostrar el formulario al pulsar "Añadir Película"
botonAñadir.addEventListener("click", () => {
  seccionFormulario.hidden = false;
});

// Ocultar formulario y limpiar al pulsar "Cancelar"
botonCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  formulario.reset();
  seccionFormulario.hidden = true;
});

// Cargar películas guardadas al iniciar la página
document.addEventListener("DOMContentLoaded", cargarPeliculas);

// Guardar nueva película
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
  mostrarPelicula(pelicula);

  formulario.reset();
  seccionFormulario.hidden = true;
});

// Guardar película en localStorage
function guardarPelicula(pelicula) {
  let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  peliculas.push(pelicula);
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
}

// Cargar películas guardadas
function cargarPeliculas() {
  let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
  peliculas.forEach(mostrarPelicula);
}

// Mostrar una película en la lista
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
